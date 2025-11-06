import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma/client";
export async function POST(request) {
    try{
        const session= await getServerSession(authOption)
        if(!session){
            return NextResponse.json({message: "unauthourized"})
        }
        const body= await request.json()
        const userdata=await prisma.user.findUnique({
            where:{id:Number(session.user.id)},
            include:{wallet:true},
        })
        if (!userdata){
            return NextResponse.json({message:"user not found"}, {status:404})
        }
        const {custormer, identifier, meter,  disco, amount, type, phone}=body
        console.log(custormer)
        if( !meter || !disco || !amount || !type || !phone){
            return NextResponse.json({message:"All field are Required"}, {status:400})
        }
        if(!custormer){
            return NextResponse.json({message:"Ensure you verify your meter number before subscribe"},{status:400})
        }
        if(amount< 500){
       return NextResponse.json({message:"minimum amount is 1000 naira"},{status:400})
          }
        if(userdata.wallet.balance< Number(amount)){
            return NextResponse.json({message: "insufficient balance"}, {status:400})
        }
        const res= await fetch("https://client.peyflex.com.ng/api/electricity/subscribe/", {
             method : "POST",
             headers: { "Content-Type": "application/json",
             Authorization: `Token ${process.env.peyflex_key}`},
             body: JSON.stringify({identifier: identifier,meter: meter, plan: disco,amount :amount,  type: type,   phone :phone })
        })
        const data= await res.json()
        console.log(data)
        if( data.status!=="SUCCESS"){
            return NextResponse.json({status: data.status, message: "Bill payment failed "}, {status:400})
        }
         const newBalance=userdata.wallet.balance - Number(amount)
        await prisma.wallet.update({
            where:{id:userdata.id},
            data:{balance: newBalance}
        })
         await prisma.transaction.create({
        data:{
            type:"electricity Bill",
            amount: amount,
            status: result.status,
            reference:result.ident || "null",
            userId:userdata.id
        }
    })
    await prisma.purchase.create({
        data :{
            userId:userdata.id,
            category: "elctricity Bill",
            network: "electricitry",
            plan: "null",
            phoneOrMeter:meter,
            amount:Number(amount),
            status:result.status,
            apiResponse:result.response || "null"
        }
    })
    return NextResponse.json({message:"Electricity bils subscribtion successful"},{status:201})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error: "internal server error"}, {status :500})
    }
}