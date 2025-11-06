import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

export async function POST(request) {
    try{
        const session=await getServerSession(authOption)
        if(!session){
            return NextResponse.json({message:"unauthorized"},{status:401})
        }
        const body=await request.json()
        const { amount}=body
        if(! amount){
            return NextResponse.json({message: "All fields is required"})
        }
         if(amount< 100){
        return NextResponse.json({message:"minimum amount is 100 naira"},{status:400})
        }
        const user=await prisma.user.findUnique({
            where:{id:session.user.id}
        })
        const res = await fetch("https://api.paystack.co/transaction/initialize", {
             method: "POST",
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json", },
            body: JSON.stringify({
                email : user.email,
                name: user.name,
                phone:user.phoneNumber,
                amount: amount * 100, 
                channels: ["bank_transfer"],
                callback_url: "http://localhost:3000/Dashboard/paymentsuccess",
      }),
    });
    const data= await res.json()
     return NextResponse.json(data);
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"}, {status:500})
    }
}