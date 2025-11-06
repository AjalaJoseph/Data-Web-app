import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma/client";
export async function POST(request) {
    try{
        const session= await getServerSession(authOption)
        if(!session){
            return NextResponse.json({message: "Unauthorized"}, {status:401})
        }
        const body=await request.json()
        const { providerValue, plan,iuc, phone, amount}=body
        if(!providerValue || !plan || !iuc || !phone || !amount){
            return NextResponse.json({message: "All fields are required"}, {status:400})
        }
        const userdata=await prisma.user.findUnique({
            where:{id:session.user.id},
            include:{wallet:true}
        })
        if(!userdata){
            return NextResponse.json({message:"User not found"}, {status:404})
        }
        if(userdata.wallet.balance < Number(amount)){
            return NextResponse.json({message: "Insufficient balance"}, {status:400})
        }
        const res =await fetch("https://client.peyflex.com.ng/api/cable/subscribe/",{
             method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Token ${process.env.peyflex_key}`, },
             body: JSON.stringify({
                identifier: providerValue,
                plan:plan,
                iuc: iuc,
                phone:phone,
                amount: amount,
        })
        })
        const data=await res.json()
        console.log(data)
        if(data.status==="FAILED"){
            return NextResponse.json({message:"Cable subscription failed"},{status:400})
        }
        const newBalance= userdata.wallet.balance-Number(amount)
        await prisma.wallet.update({
            where:{id: userdata.id},
            data:{balance:parseFloat(newBalance)}
        })
        await prisma.transaction.create({
                data:{
                    type:"cablesub",
                    amount: Number(amount),
                    status: data.status,
                    reference:data.reference || "null",
                    userId:userdata.id
                }
            })
            await prisma.purchase.create({
                data :{
                    userId:userdata.id,
                    category: "cable",
                    network: providerValue,
                    plan:plan,
                    phoneOrMeter:iuc,
                    amount:Number(amount),
                    status:data.status,
                    apiResponse:data.message || "null"
                }
            })
        return NextResponse.json({message:"Cable subscription successfull"},{status:200})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error: "internal server error"}, {status:500})
    }
}