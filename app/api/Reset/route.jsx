import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
import bcrypt from "bcryptjs";
export async function POST(request) {
    try{
        const body=await request.json()
        const {Gmail,newPassword}=body
        if(!Gmail || !newPassword){
            return NextResponse.json({message: "All field are required "}, {status:400})
        }
        if(newPassword.length<8){
            return NextResponse.json({message: "password must be atleast 8 characters"},{status:400})
        }
        const userdata=await prisma.user.findUnique({
            where :{email:Gmail}
        })
        if (!userdata){
            return NextResponse.json({message: "user not found"}, {status:404})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where:{email:Gmail},
            data:{password:hashedPassword}
        })
        return NextResponse.json({message:"password reset successfull"}, {status:201})
    }
    catch(error){
        console.error(error)
    }
}