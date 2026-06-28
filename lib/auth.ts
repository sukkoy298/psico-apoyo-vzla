import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import { connectDB } from "./mongodb";
import { UsuarioModel, type UserRole } from "./models/usuario";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      rol: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    rol: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rol: UserRole;
  }
}

export type { JWT };

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const email =
          typeof raw?.email === "string" ? raw.email.toLowerCase().trim() : "";
        const password =
          typeof raw?.password === "string" ? raw.password : "";

        if (!EMAIL_RE.test(email) || password.length === 0) return null;

        await connectDB();
        const usuario = await UsuarioModel.findOne({ email });
        if (!usuario) return null;

        const ok = await bcrypt.compare(password, usuario.passwordHash);
        if (!ok) return null;

        return {
          id: usuario._id.toString(),
          email: usuario.email,
          name: usuario.nombre,
          rol: usuario.rol,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.rol = user.rol;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.rol = token.rol;
      }
      return session;
    },
  },
});
