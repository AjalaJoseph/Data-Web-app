import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
export async function GET() {
    try{
        const plans=await prisma.Datasource.findMany({
            orderBy:{
                createdAt:"asc"
            }
        })
        return NextResponse.json({plans})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"}, {status:500})
    }
}