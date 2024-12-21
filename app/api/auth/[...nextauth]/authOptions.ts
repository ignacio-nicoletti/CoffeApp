import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db, { eq, user } from "../../../src/database/src";
import { compare } from "../../../src/utils/encrypt"; // Asegúrate de que la función 'compare' sea correcta

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@email.com",
        },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Buscar el usuario en la base de datos por email
        const userFound = await db.query.user.findFirst({
          where: eq(user.email, credentials.email),
        });

        // Si el usuario no existe o no tiene contraseña
        if (!userFound || !userFound.password) {
          throw new Error("Usuario no registrado.");
        }

        // Comparar las contraseñas
        const matchPassword = await compare(credentials.password, userFound.password);

        if (!matchPassword) {
          throw new Error("Correo electrónico o contraseña incorrectos.");
        }

        // Retornar el usuario si las credenciales son correctas
        return userFound;
      },
    }),
  ],
  pages: {
    signIn: "/", // Página de inicio de sesión personalizada
  },
  callbacks: {
    // Callback para generar el JWT
    jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastname = user.lastname;
        token.email = user.email;
        token.role = user.roleId; // Incluyendo el rol
        
      }
      return token;
    },

    // Callback para agregar el JWT al objeto session
    session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.lastname = token.lastname;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
};
