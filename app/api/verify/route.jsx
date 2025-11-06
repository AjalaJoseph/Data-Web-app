import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
export async function POST(request) {
    try{
         const { reference } = await request.json();
         const paymentVerify = await fetch(`https://api.paystack.co/transaction/verify/${reference}`,
         { headers: {Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,},});
            const data=await paymentVerify.json()
            if (!data.status || data.data.status !== "success") {
      return NextResponse.json({status: "failed",  message: "Transaction not verified or failed.",});
    }
         const email = data.data.customer.email;
        const amount = data.data.amount / 100;
        const userdata=await prisma.user.findUnique({
            where:{email:email}
        })
        if(!userdata){
            return NextResponse.json({message: "user not found "}, {status:404})
        }
        await prisma.wallet.update({
            where:{userId:userdata.id},
            data:{balance:{increment:amount-5} , reference:reference}
        })
        await prisma.transaction.create({
            data:{
                type:" funding",
                amount: amount,
                status:data.data.status,
                reference:reference,
                userId: userdata.id,
            }
        })
        return NextResponse.json({message:"wallet funding sucessfull"}, {status:201})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error: "internal server error "}, {status:500})
    }
}