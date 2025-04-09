import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import fetch from "node-fetch";

const prisma = new PrismaClient();

function extractRollDetails(email: string) {
  const regex = /^(\d{2})(b[a-z]{2})(\d+)@iiitdmj\.ac\.in$/;
  const match = email.match(regex);

  if (!match) return null;

  const [_, batch, branchCode, rollNumber] = match;
  const branchMap: Record<string, string> = {
    bcs: "Computer Science and Engineering",
    bec: "Electronics and Communication Engineering",
    bme: "Mechanical Engineering",
    bsm: "Smart Manufacturing",
  };

  return {
    batch,
    branch: branchCode,
    branchName: branchMap[branchCode] || branchCode,
    rollNumber,
  };
}

function isValidIIITDMJEmail(email: string) {
  return email.endsWith("@iiitdmj.ac.in");
}

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`Error downloading image: ${error}`);
    return null;
  }
}

const customAdapter = {
  ...PrismaAdapter(prisma),
  createUser: async (userData: any) => {
    const imageUrl = userData.image;
    const { image, ...userDataWithoutImage } = userData;

    const rollDetails =
      userData.email && isValidIIITDMJEmail(userData.email)
        ? extractRollDetails(userData.email)
        : null;

    const userDataToCreate = {
      ...userDataWithoutImage,
      ...(rollDetails && {
        rollNumber: rollDetails.rollNumber,
        batch: rollDetails.batch,
        branch: rollDetails.branch,
      }),
    };

    const user = await prisma.user.create({
      data: userDataToCreate,
    });

    if (imageUrl) {
      try {
        const imageBuffer = await downloadImage(imageUrl);
        if (imageBuffer) {
          await prisma.image.create({
            data: {
              userId: user.id,
              fileName: `profile-${user.id}.jpg`,
              fileType: "image/jpeg",
              data: imageBuffer,
            },
          });
        }
      } catch (imageError) {
        console.error("Failed to download or store profile image:", imageError);
      }
    }

    return user;
  },
};

export const authOptions: NextAuthOptions = {
  adapter: customAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          timeout: 10000,
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (!isValidIIITDMJEmail(credentials.email)) {
          throw new Error("Only IIITDMJ email addresses are allowed");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) {
          return null;
        }

        if (!user.rollNumber || !user.batch || !user.branch) {
          const rollDetails = extractRollDetails(credentials.email);
          if (rollDetails) {
            try {
              await prisma.user.update({
                where: { email: credentials.email },
                data: {
                  rollNumber: rollDetails.rollNumber,
                  batch: rollDetails.batch,
                  branch: rollDetails.branch,
                },
              });
            } catch (updateError) {
              console.error("Failed to update user roll details:", updateError);
            }
          }
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const email = user.email as string;

        if (!email || !isValidIIITDMJEmail(email)) {
          return false;
        }

        const rollDetails = extractRollDetails(email);

        if (rollDetails) {
          try {
            const existingUser = await prisma.user.findUnique({
              where: { email },
            });

            if (existingUser) {
              if (
                !existingUser.rollNumber ||
                !existingUser.batch ||
                !existingUser.branch
              ) {
                await prisma.user.update({
                  where: { email },
                  data: {
                    rollNumber: rollDetails.rollNumber,
                    batch: rollDetails.batch,
                    branch: rollDetails.branch,
                  },
                });
              }
            }
          } catch (error) {
            console.error("Error updating user with roll details:", error);
          }
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async session({ session, user, token }) {
      try {
        if (session.user && session.user.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
              id: true,
              rollNumber: true,
              batch: true,
              branch: true,
            },
          });

          if (dbUser) {
            session.user = {
              ...session.user,
              id: dbUser.id,
              rollNumber: dbUser.rollNumber || null,
              batch: dbUser.batch || null,
              branch: dbUser.branch || null,
            };
          }
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
