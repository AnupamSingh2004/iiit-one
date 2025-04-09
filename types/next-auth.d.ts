import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string;
      rollNumber?: string | null;
      batch?: string | null;
      branch?: string | null;
    } & DefaultSession["user"];
  }

  /**
   * If you're using the JWT callback, extend the JWT type too
   */
  interface JWT {
    id?: string;
    rollNumber?: string | null;
    batch?: string | null;
    branch?: string | null;
  }
}
