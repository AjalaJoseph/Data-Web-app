import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
export async function POST(request) {
    try{
        const session =await getServerSession(authOption)
        const body=await request.json()
        const {newname, newemail, newPhone}=body
        if(!newname || !newemail || !newPhone){
            return NextResponse.json({message: "Ensure you filled are field"}, {status:400})
        }
        if(!newemail.includes("@") || !newemail.includes(".com")){
            return NextResponse.json({message:"invalid email address "}, {status:400})
        }
        
       const userdata= await prisma.user.findUnique({
            where:{id:session.user.id}
        })
         const existEmail= await prisma.user.findFirst({
            where:{email:newemail}
        })
        if(existEmail){
            return NextResponse.json({message:"Email already exist"},{status:400})
        }
        await prisma.user.update({
            where:{id :userdata.id},
            data:{
                name:newname,
                email:newemail,
                phoneNumber:newPhone,
            }
        })
        return NextResponse.json({message: "user profile update successfull"},{status:201})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error: "internal server error"},{status:500})
    }
}