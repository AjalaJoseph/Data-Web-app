import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
export async function GET() {
    try{
        const users =await prisma.user.findMany({
            include:{
                wallet:true,
                transactions:true,
                purchases:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
       const safeUser=users.map(({password, ...rest})=>rest)
        return NextResponse.json({safeUser})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"},{status:500})
    }
}