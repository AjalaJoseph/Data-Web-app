import { NextResponse } from "next/server";
export async function GET() {
    try{
    const network = []
      const networkRes = await fetch("https://client.peyflex.com.ng/api/data/networks/");
      if(!networkRes){
        return NextResponse.json({error:"failed to fetch network"})
      }
      const networks = await networkRes.json();
      if(networks){
        networks.networks.map((e)=>(network.push(e.identifier)))
      }
      return NextResponse.json({network})
    }
    catch(error){
        console.error(error)
    }
}