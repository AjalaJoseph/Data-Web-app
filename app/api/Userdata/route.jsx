
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth]/route"; // make sure path is correct

export async function GET(request) {
  try {
    
    const session = await getServerSession(authOption);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { wallet: true ,
         transactions:{
          orderBy: {
        createdAt: "desc", 
      },
         }, purchases:{
        orderBy: {
        createdAt: "desc", // 👈 newest first
      },
         }},
    });

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, ...safeUser } = data;
    return NextResponse.json({ safeUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
