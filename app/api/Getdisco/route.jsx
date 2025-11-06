import { NextResponse } from "next/server";
export async function GET() {
    try{
        const res=await fetch("https://iacafe.com.ng/devapi/v1/providers",{
             headers: { Authorization: `Bearer ${process.env.iA_CAFE_KEY}`, "Content-Type": "application/json", },
        })
        // const res= await fetch("https://client.peyflex.com.ng/api/electricity/plans/?identifier=electricity");
        if(!res.ok){
            return NextResponse.json({message:"failed to get disco name"},{status :404})
        }
        const data=await res.json();
        if(data){
            return NextResponse.json({data})
        }
    }
    catch(error){
        console.error(error);
        return NextResponse.json({error: "internal server error"},{status:500})
    }
}