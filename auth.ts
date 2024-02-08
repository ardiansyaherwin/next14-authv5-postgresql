import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { DEFAULT_LOGIN_URL } from "@/routes";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: DEFAULT_LOGIN_URL,
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.type !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check

      return true;
    },
    async jwt({ token }) {
      // token.sub equals to user_id in DB
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // set role property in this callback so middleware can access it
      token.role = existingUser.role;
      return token;
    },
    // @ts-ignore // ignore token types in session
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub as string;
        if (token.role) session.user.role = token.role;
      }

      return session;
    },
  },
  ...authConfig,
});
