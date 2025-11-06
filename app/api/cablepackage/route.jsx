import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
export async function GET(request) {
    const {searchParams}= new URL(request.url)
    const pack= searchParams.get("package")
   
    try{
        const plan=await prisma.cableplan.findMany({
            where:{provider:String(pack)}
        })
        return NextResponse.json({plan})
    }catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"}, {status: 500})
    }
}