import { NextResponse } from "next/server";
export async function POST(request) {
    try{
        const body=await request.json()
        const {iuc,providerValue}=body
        if(!iuc ){
            return NextResponse.json({message: "Smartcard / IUC number is required"})
        }
        const res =await fetch("https://iacafe.com.ng/devapi/v1/verify-customer",{
        method: "POST",
        headers: { "Content-Type": "application/json",
         Authorization: `Bearer ${process.env.iA_CAFE_KEY}`,
          },
        body: JSON.stringify({
            customer_id: iuc,
            service_id:providerValue,
        })
        })
        const data=await res.json()
        console.log(data)
        return NextResponse.json({data})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"},{status:500})
    }
}