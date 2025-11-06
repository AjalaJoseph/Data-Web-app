"use client"
import React from 'react'
import Link from 'next/link'
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react'
export default function page() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
 useEffect(()=>{
  if (reference) {
      fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
    }
 })
  return (
    <div className='container mx-auto p-6 flex w-full h-screen items-center justify-center'>
      <div className='border p-3 bg-white border-white rounded-lg'>
        <div className="flex justify-center">
           <CheckCircle className='text-green-500' size={50}/>
        </div>
          <h1 className='text-2xl font-mono mt-5 text-gray-500'>Wallet funding successfull</h1>
          <p className='text-black text-lg'>Reference: {reference}</p>
        <div className="text-center mt-2">
            <Link href="/Dashboard" className='text-center font-mono text-lg text-blue-400'>Go to Dashboard</Link>
        </div>
      </div>
       
       
    </div>
  )
}
