import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from '@/models/User';
import { NextResponse } from "next/server";



export const authOptions = {

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: 'Credentials',

      credentials: {
        email: { label: "email", type: "text", },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        await dbConnect()

        try {

          const user = await UserModel.findOne({ email: credentials.email })

          if (!user) {
            console.log(user)
            throw new Error("no user found with email")
          }
          else if (user.credential === 'google') {
            throw new Error("This email is already register with Google")
          }
          if (user.isVerified === false) {
            throw new Error("please verify your account for that sign up again")
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

          if (isPasswordCorrect) {

            return user

          }
          else {

            throw new Error("Incorrect Password")
          }
        } catch (error) {
          throw new Error(error?.message || "Something went wrong");
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ account, profile, user }) {


      if (account.provider === "google") {
        await dbConnect();
        try {
          let user = await UserModel.findOne({ email: profile?.email });

          if (!user) {
            user = await UserModel.create({
              name: profile.name,
              email: profile.email,
              isVerified: true,
              credential: "google",
            });
          }

          if (user.credential === "emailPassword") {
            return '/unexpected';
          }

          return true;

        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }


      if (account.provider === "credentials") {
        return true;
      }

      return false;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        // For Google provider
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: profile.email });
        if (existingUser) {
          token._id = existingUser._id.toString();
          token.isVerified = existingUser.isVerified;
          token.email = existingUser.email;
          token.credential = existingUser.credential;
        }
      }
      else if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.credential = user.credential;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session._id = token._id?.toString();
        session.isVerified = token.isVerified;
        session.email = token.email;
        session.credential = token.credential;
      }
      return session
    },
  },

  pages: {
    signIn: '/auth'
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}