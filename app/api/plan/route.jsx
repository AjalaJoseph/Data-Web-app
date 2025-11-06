import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
export async function GET(request) {
    const {searchParams}= new URL(request.url)
    const networks=searchParams.get("network")
    try{
        const plan=await prisma.Datasource.findMany({
            where:{network:String(networks)}
        })
        return NextResponse.json({plan})
    }catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"}, {status: 500})
    }
}