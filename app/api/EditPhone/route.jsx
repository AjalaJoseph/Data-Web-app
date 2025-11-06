import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
export async function POST(request) {
    try{
        const session=await getServerSession(authOption)
        const body=await request.json()
        const {phone}=body
        if(!phone){
            return NextResponse.json({message: "Field is empty"}, {status:400})
        }
        const user=await prisma.user.findUnique({
            where:{id:session.user.id}
        })
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        await prisma.user.update({
            where:{id:user.id},
            data:{phoneNumber:phone}
        })
        return NextResponse.json({message: "Phone number update successfull"},{status:200})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"},{status:500})
    }
}