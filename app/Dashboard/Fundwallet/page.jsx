"use client"
import { useState } from "react"
export default function page() {
  const [amount, setAmount]=useState(null)
  const fundwallet=async ()=>{
    const res=await fetch("/api/payment", {
       method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount})
    })
    const data=await res.json()
     console.log(data)
      if(data.message==="minimum amount is 100 naira"){
        alert("minimum amount is 100 naira")
    }
    else if (data.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    } 
    else {
      alert("Payment initialization failed");
    }
   
  }
  const bankTransfer=async ()=>{
    const res=await fetch("/api/BankTransfer", {
       method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount})
    })
    const data=await res.json()
    console.log(data)
     if(data.message==="minimum amount is 100 naira"){
        alert("minimum amount is 100 naira")
    }
    else if (data.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    } 
    else {
      alert("Payment initialization failed");
    }
    
  }
  const ussdPayment=async ()=>{
    const res=await fetch("/api/USSD", {
       method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount})
    })
    const data=await res.json()
    console.log(data)
    if(data.message==="minimum amount is 100 naira"){
        alert("minimum amount is 100 naira")
    }
    else if (data.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    } 
    else {
      alert("Payment initialization failed");
    }
  }
  return (
    <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <img src="/Brand_logo.png" className="w-35" alt="" />
        </div>
        <h1 className="mb-3 text-2xl font-serif">Fund wallet</h1>
        <div className="my-2">
         <div className="flex flex-row items-center gap-2">
           <p className="font-semibold font-sans text-2xl ">Note:</p>
           <p className="font-serif text-lg">&#8358;5 charges per transaction</p>
         </div>
            <div className="ps-16" >
              <p className="font-serif text-lg">Transfer exactly amount you enter to aviod error funding</p>
            </div>
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row gap-5 pl-5">
            <div className="flex flex-col gap-3  ">
          <label htmlFor="" className="font-serif text-lg text-gray-900">Amount</label>
          <input type="text" onChange={(e)=>setAmount(e.target.value)} placeholder="Enter any amount minimum of 100" className="border-2 bg-white border-white outline-0 rounded-lg p-2 w-full lg:w-90"/>
           <div className="flex justify-center mt-3">
              <button onClick={fundwallet} className="border-2 p-1 font-serif bg-blue-800 text-white text-lg rounded-2xl border-blue-700 w-50">Use Card</button>
            </div>
              <label htmlFor="" className="font-serif text-lg text-gray-900 ">Amount</label>
               <input type="text" onChange={(e)=>setAmount(e.target.value)} placeholder="Enter any amount minimum of 100" className="border-2 bg-white border-white outline-0 rounded-lg p-2 w-full lg:w-90"/>
            <div className="flex justify-center mt-3">
              <button onClick={bankTransfer} className="border-2 p-1 font-serif bg-blue-800 text-white text-lg rounded-2xl border-blue-700 w-50">Bank Transfer</button>
            </div>
              <label htmlFor="" className="font-serif text-lg text-gray-900 ">Amount</label>
               <input type="text" onChange={(e)=>setAmount(e.target.value)} placeholder="Enter any amount minimum of 100" className="border-2 bg-white border-white outline-0 rounded-lg p-2 w-full lg:w-90"/>
            <div className="flex justify-center mt-3">
              <button onClick={ussdPayment} className="border-2 p-1 font-serif bg-blue-800 text-white text-lg rounded-2xl border-blue-700 w-50">USSD CODE</button>
            </div>
            
        </div>
        <div className="hidden lg:block md:block">
          <img src="/datagirl.png" alt="" className="w-100" />
        </div>
        </div>
       
    </div>
  )
}
