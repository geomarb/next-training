import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { NotFound } from "../../../helpers/http.error.helper";
import { getUserCollection } from "../../../models/user.model";

export default NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "e-mail" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials.email) {
          const userCollection = await getUserCollection();
          const user = await userCollection.findOne({
            email: credentials.email,
          });

          if (user) return user;
        }

        throw NotFound("User not found");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // first time jwt callback is run, user object is available
      if (user) {
        token.userRole = "admin";
        token.email = user.email;
        return token;
      }
    },
    session({ session, token }) {
      if (token) {
        session.email = token.email;
        session.userRole = token.userRole;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
