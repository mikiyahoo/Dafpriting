import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Auth: Missing email or password");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            console.error(`Auth: No user found for email: ${credentials.email}`);
            return null;
          }

          // Check if account is active
          if (!user.isActive) {
            throw new Error("Account disabled");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordValid) {
            console.error(`Auth: Invalid password for: ${credentials.email}`);
            return null;
          }

          console.log(`Auth: Login successful for: ${credentials.email}`);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          try {
            const fs = require("fs");
            const path = require("path");
            const logPath = path.join(process.cwd(), "nextauth_error.log");
            const logMsg = `[${new Date().toISOString()}] Authorize Exception: ${error instanceof Error ? error.stack : error}\n`;
            fs.appendFileSync(logPath, logMsg);
          } catch (err) {}

          if (error instanceof Error && error.message === "Account disabled") {
            throw error;
          }
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id ?? "";
        token.role = (user as { role: string }).role ?? "STAFF";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as { id: string }).id = token.id as string;
        (session.user as unknown as { role: string }).role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  logger: {
    error(code, metadata) {
      try {
        const fs = require("fs");
        const path = require("path");
        const logPath = path.join(process.cwd(), "nextauth_error.log");
        const logMsg = `[${new Date().toISOString()}] NextAuth ERROR ${code}: ${JSON.stringify(metadata)}\n`;
        fs.appendFileSync(logPath, logMsg);
      } catch (err) {}
    },
    warn(code) {
      try {
        const fs = require("fs");
        const path = require("path");
        const logPath = path.join(process.cwd(), "nextauth_error.log");
        const logMsg = `[${new Date().toISOString()}] NextAuth WARN ${code}\n`;
        fs.appendFileSync(logPath, logMsg);
      } catch (err) {}
    }
  }
});
