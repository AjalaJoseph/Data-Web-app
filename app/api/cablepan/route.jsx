import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
export async function GET() {
    try{
        const cableplan=[]
        const plans =await fetch("https://client.peyflex.com.ng/api/cable/providers/")
        const plansdata=await plans.json()
        if(plansdata){
            plansdata.providers.map((plan)=>cableplan.push(plan.identifier))
            console.log(cableplan)
        }
        for(const p of cableplan){
            const res=await fetch(`https://client.peyflex.com.ng/api/cable/plans/${p}/`)
             if (!res.ok) {
            console.error(`Failed to fetch plans for ${net}: ${res.statusText}`);
            continue;
            }

            const data = await res.json();
            console.log(p, "API response:", data);
            const provider=data.provider
            const allcableplan=data.plans || []
            if(allcableplan.length===0) continue
            await Promise.all(allcableplan.map(async(cable)=>{
                await prisma.cableplan.upsert({
                    where:{plancode:cable.plan_code},
                    update:{
                        provider:provider,
                        plancode:cable.plan_code,
                        price:parseFloat(cable.amount),
                        display:cable.display,
                        discription :cable.description,
                        sellingprice:parseFloat(cable.amount)+50,
                    },
                    create:{
                        provider:provider,
                        plancode:cable.plan_code,
                        price:parseFloat(cable.amount),
                        display:cable.display,
                        discription :cable.description,
                        sellingprice:parseFloat(cable.amount)+50,
                    }
                })
            }))
        }
       

        return NextResponse.json({message:"All cable plan upload successfull"})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error:"internal server error"}, {status:500})
    }
}