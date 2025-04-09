import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    rollNumber?: string | null;
    batch?: string | null;
    branch?: string | null;
    password?: string | null;
  }
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      rollNumber?: string | null;
      batch?: string | null;
      branch?: string | null;
    };
  }

  interface JWT {
    id?: string;
    rollNumber?: string | null;
    batch?: string | null;
    branch?: string | null;
  }
}
