import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Only allow specific domain
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
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

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email as string;
      if (!isValidIIITDMJEmail(email)) {
        return false;
      }

      const rollDetails = extractRollDetails(email);

      if (rollDetails && account?.provider === "google") {
        await prisma.user.update({
          where: { email },
          data: {
            rollNumber: rollDetails.rollNumber,
            batch: rollDetails.batch,
            branch: rollDetails.branch,
          },
        });
      }

      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email as string },
        });

        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id,
            rollNumber: dbUser.rollNumber,
            batch: dbUser.batch,
            branch: dbUser.branch,
          };
        }
      }
      return session;
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
});

export { handler as GET, handler as POST };
