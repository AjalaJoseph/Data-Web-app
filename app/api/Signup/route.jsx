import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try{
        const body=await request.json()
        const {name,email,phonenumber,password}=body
        if(!name || !email || !phonenumber ||!password){
            return NextResponse.json({error:"All field are required"}, {status:400})
        }
        let role="User"
        if(email==="ajalaoluwafikayomi27@gmail.com"){
            role="admin"
        }
        const exist= await prisma.user.findUnique({
            where: { email:email }
        })
        if(exist){
            return NextResponse.json({error:"User already exist"})
        }
         const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                    name:name,
                    email:email,
                    phoneNumber:phonenumber,
                    password: hashedPassword,
                    role: role,
                    wallet: {
                        create:{}
                    }
                 },
                 include:{wallet:true}
        })
    //      const response = await fetch("https://api.paystack.co/dedicated_account/assign", {
    //              method: "POST",
    //                 headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json",},
    //                  body: JSON.stringify({
    //                  customer: email,
    //                  first_name: name.split(" ")[0],
    //                 last_name: name.split(" ")[1] || "",
    //                  preferred_bank: "titan-paystack",
    //   }),
    // });
    // const data =await response.json()
    // console.log(data)
        return NextResponse.json({message:"Account created successfully"},{status:201})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({message:"internal server error"}, {status:500})
    }
}