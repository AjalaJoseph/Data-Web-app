import prisma from "@/app/lib/prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOption ={
    providers:[
         CredentialsProvider({
            name: "Credentials",
            credentials: {
          email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
       async authorize(credentials){
         const {email, password}=credentials;
         if(!email || !password){
           throw new Error("Email and password are required");
         }
         const user =await prisma.user.findUnique({
            where:{email:credentials.email},
            include:{wallet:true}
         })
         if(!user){
            throw new Error("user not found")
         }
         const confirmPassword=await bcrypt.compare(credentials.password, user.password)
         if(!confirmPassword){
            throw new Error("invalid email or password")
         }
         return{
            id:user.id,
            name:user.name,
            email:user.email,
            role: user.role,
            phonenumber:user.phoneNumber,
            wallet:user.wallet,
         }
         }
         })
    ],
     session: {strategy: "jwt",},
     pages:{signIn: "/Login"},
     callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id;
                token.role=user.role;
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user.id=token.id;
                session.user.role=token.role
            }
            return session;
        }
     }, secret: process.env.NEXTAUTH_SECRET,
     
};
const Login=NextAuth(authOption)
export { Login as GET , Login as POST}