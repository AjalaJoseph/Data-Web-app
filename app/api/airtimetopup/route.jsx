import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
export async function POST(request) {
    try{  
        const body= await request.json()
        const session=await getServerSession(authOption)
        if(!session){
            return NextResponse.json({message: "unauthorize"})
        }
        const userdata=await prisma.user.findUnique({
            where:{id: session.user.id},
            include:{wallet:true}
        })
        if(!userdata){
            return NextResponse.json({message:"user not found"}, {status:404})
        }
        const {selectNetwork, amount, phoneNumber}=body
        console.log(selectNetwork)
        if(!selectNetwork || !amount || !phoneNumber){
            return NextResponse.json({message:"All fields are required"}, {status:400})
        }
         if(amount< 50){
            return NextResponse.json({message:"minimum amount is 50 naira"},{status:400})
        }
        if(userdata.wallet.balance < Number(amount)){
            return NextResponse.json({ status: "failed", message: "Insufficient  balance" }, { status: 400 });
        }
       const res = await fetch("https://client.peyflex.com.ng/api/airtime/topup/", {
         method: "POST",
        headers: { "Content-Type": "application/json",
         Authorization: `Token ${process.env.peyflex_key}`,
          },
        body: JSON.stringify({
         network: selectNetwork, // must be one of: mtn, glo, airtel, 9mobile
        mobile_number: phoneNumber, // e.g. "09130286805"
        amount: Number(amount), // must be a number, not string
  }),
});
       
    //     const res = await fetch("https://iacafe.com.ng/devapi/v1/airtime", {
    //      method: "POST",
    //     headers: { "Content-Type": "application/json",
    //      Authorization: `Bearer ${process.env.iA_CAFE_KEY}`,
    //       },
    //     body: JSON.stringify({
    //       request_id: `req_${Date.now()}`,
    //      phone: phoneNumber,
    //      service_id: selectNetwork,
    //      amount: amount, 
    //      }),
    // });
        const result=await res.json()
        console.log(result)
        if(result.status!=="SUCCESS"){
         return NextResponse.json({ status: result.status, message: "Airtime top-Up  failed" },{ status: 400 } );
        }
        const newBalance=userdata.wallet.balance - Number(amount)
        await prisma.wallet.update({
            where:{id:userdata.id},
            data:{balance: newBalance}
        })
         await prisma.transaction.create({
        data:{
            type:"airtime",
            amount: amount,
            status: result.status,
            reference:result.reference || "null",
            userId:userdata.id
        }
    })
    await prisma.purchase.create({
        data :{
            userId:userdata.id,
            category: "airtime",
            network: selectNetwork,
            plan:selectNetwork +"ajf",
            phoneOrMeter:phoneNumber,
            amount:amount,
            status:result.status,
            apiResponse:result.message || "null"
        }
    })
    return NextResponse.json({message:"Airtime top_up successfull"},{status:201})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error: "internal server error"},{status:500})
    }
}