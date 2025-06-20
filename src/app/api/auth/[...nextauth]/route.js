import NextAuth from "next-auth";
import { authOptions } from "./options";


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}















// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials"
// import dbConnect from "@/lib/dbConnect";
// import UserModel from '@/models/User';
// import jwt from 'jsonwebtoken';
// import { NextResponse } from "next/server";


// const handler = NextAuth({
//   providers: [

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
   
//     // When user signs in
//     async signIn({ user, account, profile }) {
//       await dbConnect();

//       const existingUser = await UserModel.findOne({ email: user.email });

//        console.log(existingUser)
//       if (!existingUser) {
//         await UserModel.create({  
//       name: user.name,
//       email: user.email,
//       isVerified: true,
//       credential: "google"
//     });
//     console.log("User created");
//       }
//       else if(existingUser.credential == 'emailPassword'){
//         return NextResponse.json({ message: "Please Login with email and password." }, { status: 401 });
//       }

//       return true; // Allow sign-in
//     },

//     // Called whenever a JWT is created or updated
//     async jwt({ token, user }) {
//       if (user) {
//         token.name = user.name;
//         token.email = user.email;
       
//       }
//       return token;
//     },

//     // Makes token available in `session` callback
//     async session({ session, token }) {
//       session.user.name = token.name;
//       session.user.email = token.email;
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/auth', // Optional: custom login page
//   },
// });

// export { handler as GET, handler as POST };
