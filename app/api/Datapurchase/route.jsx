import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma/client";
export async function POST(request) {
    try{
        const session=await getServerSession(authOption)
        console.log(session)
        if(!session){
            return NextResponse.redirect(new URL("/Login", request.url))
            // return NextResponse.json({message:"unauthorize"})
        }
        
        const userdata = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { wallet: true },
        })
        
         const body= await request.json()
        const {selectnetwork, number, plancode, amount}= body
        if(!selectnetwork || !number || !plancode || !amount){
            return NextResponse.json({message:"All field is required"}, {status:400})
        }
        if(userdata.wallet.balance < Number(amount)){
            return NextResponse.json({ status: "failed", message: "Insufficient  balance" }, { status: 400 });
      }
      const res = await fetch("https://client.peyflex.com.ng/api/data/purchase/",{
        method : "POST",
         headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.peyflex_key}`,},
        body: JSON.stringify({
         network: selectnetwork,
        mobile_number: number,
        plan_code:plancode,
      }),
    });
    const result =await res.json();
    console.log(result)
    if(result.status !== "SUCCESS"){
         return NextResponse.json({ status: "failed", message: result.message || "Data purchase failed" },{ status: 400 } );
    }
    const newbalance=userdata.wallet.balance - Number(amount)
    await prisma.wallet.update({
        where: {id:userdata.wallet.id},
        data:{balance:newbalance}
    });
    const status=result.status.toLowerCase()
    await prisma.transaction.create({
        data:{
            type:"data",
            amount: Number(amount),
            status: status,
            reference:result.reference || "null",
            userId:userdata.id
        }
    })
    await prisma.purchase.create({
        data :{
            userId:userdata.id,
            category: "data",
            network: selectnetwork,
            plan:plancode,
            phoneOrMeter:number,
            amount:Number(amount),
            status:status,
            apiResponse:result.message
        }
    })
     return NextResponse.json({
      status: "success",
      message: "Data purchase successful",
      newbalance,
      result,
    });
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error: "internal servar error"}, {status: 500})
    }
}