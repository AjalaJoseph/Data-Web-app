import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
export async function GET() {
 try {
  const network = []
      // const networks = ["mtn_gifting_data", "mtn_data_share", "airtel_data", "glo_data","9mobile_data","9mobile_gifting",];
      const networkRes = await fetch("https://client.peyflex.com.ng/api/data/networks/");
      const networks = await networkRes.json();
      if(networks){
        networks.networks.map((e)=>(network.push(e.identifier)))
      }

    for (const net of network) {
      const res = await fetch(`https://client.peyflex.com.ng/api/data/plans/?network=${net}`, {
  headers: {
    Authorization: `Bearer ${process.env.peyflex_key}`,
    "Content-Type": "application/json"
  }
});

if (!res.ok) {
  console.error(`Failed to fetch plans for ${net}: ${res.statusText}`);
  continue;
}

const data = await res.json();
console.log(net, "API response:", data);

const allplan=data.plans || []
if(allplan.length===0) continue
await Promise.all(allplan.map(async(plan)=>{
  const sellingprice=plan.amount+50
  // const cleanLabel = plan.label.replace(/=\s*₦?\d+/, "").trim();
  const Label = plan.label;
  const cleanLabel=Label.split(" ")
  const first=cleanLabel[0]
  
//   const match = Label.match(/\([^)]+\)/);
// const validity = match ? match[0] : "";

  await prisma.Datasource.upsert({
          where: { planId: String(plan.plan_code) },
          update: {
            name: String(first),
            price: parseFloat(plan.amount),
            sellingprice:sellingprice,
            network: net,
            validity: plan.label
          },
          create: {
            planId: plan.plan_code,
            name: String(first),
            price: parseFloat(plan.amount),
            sellingprice:sellingprice,
            network: net,
            type: "data",
            validity: plan.label
          }
        });
}))
     
    }

    return NextResponse.json({ message: "All Peyflex plans synced successfully!" });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}