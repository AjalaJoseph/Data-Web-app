"use client"
import { useState, useEffect } from "react"
export default function page() {
  const [provider, setprovider]=useState([])
  const [providerValue, setprovidervalue]=useState(null)
  const [pack, setpack]=useState([])
  const [planclick, setplanclicked]=useState(null)
  const [iuc, setIuc]=useState("")
  const [plan, setplan]=useState("")
  const [amount, setAmout]=useState("")
  const [phone, setPhone]=useState(null)
  const [validatemessage, setValidateMessage]=useState("")
  const [message, setMessage]=useState(null)
  useEffect(()=>{
    const providers=async () => {
      const res=await fetch("https://client.peyflex.com.ng/api/cable/providers/")
      const data=await res.json()
      if(data){
        setprovider(data.providers)
      }
    }
    providers()
  },[])
  const displayPackage= async (providerValue)=>{
    setprovidervalue(providerValue)
    const res=await fetch(`/api/cablepackage?package=${providerValue}`)
    const data=await res.json()
    setpack(data.plan)
  }
  const validatecard= async () => {
    setValidateMessage("loadig...")
      const res =await fetch("/api/validateIUC",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        iuc,providerValue
      })
      })
      const data=await res.json()
      if(data.data?.data){
      setValidateMessage(data.data?.data?.customer_name )
    }
    
    else{
      setValidateMessage("Invalid IUC number ")
    }
     
    }
    const cablesub=async () => {
      setMessage("")
      const res=await fetch("/api/cablesub",{
        method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       providerValue,
       plan,
        iuc,
        phone,
        amount
      })
      })
      const data=await res.json()
      setMessage(data.message)
    }
  return (
    <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <img src="/Brand_logo.png" className="w-35" alt="" />
        </div>
        <h1 className="text-2xl font-sans text-black">Cable subscription</h1>
        <p className={`fixed top-5 border rounded-lg font-sans text-xl ${message==="All fields are required"? "bg-red-500 border-red-500 text-white" : "text-white border-blue-600 bg-blue-600"}`}>{message}</p>
        <div className="px-6 my-4 flex flex-col gap-3">
          <label className='font-sans text-lg text-gray-700'>Select Providers</label>
          <select onChange={(e)=>displayPackage(e.target.value)} className="border-2 p-2  rounded-xl w-full  bg-white border-white  text-gray-700 font-sans text-lg">
            <option value="" className="font-sans">select provider</option>
            {provider.map((p)=>(
              <option key={p.name} >{p.identifier}</option>
            ))}
          </select>
           <label className=" font-serif text-xl text-gray-700">Plan</label>
         <div className="bg-white grid grid-cols-4 lg:grid-cols-6 gap-2 p-3 border-2 border-white rounded-2xl">
          {pack.map((me)=>(
            <button key={me.id} onClick={()=>{setplanclicked(me.id);setplan(me.plancode);setAmout(me.price)}} className={ `${planclick===me.id? "bg-blue-300 border rounded-md border-blue-300 text-white" :"border rounded-md "}`}>
              <p className="font-sans">{me.plancode}</p>
              <p className="font-sans">{me.discription.match(/[\(\[]([^)\]]+)[\)\]]/)?.[1]}</p>
              <p className="font-sans"><span>&#8358;</span>{me.sellingprice}</p>
            </button>
          ))}
        </div>
        <label className=" font-serif text-xl text-gray-700" >Smartcard / IUC</label>
        <input type="text" placeholder="Enter your IUC Numbers" onChange={(e)=>setIuc(e.target.value)}  className="border-2 p-1 rounded-xl  bg-white border-white  text-gray-700 font-sans text-lg outline-0" /> 
        <div className="flex flex-row items-center gap-3">
          <p className="text-md font-sans ">{validatemessage}</p>
          <button onClick={validatecard} className="border rounded-lg border-blue-500 p-1 bg-blue-500 text-white font-sans text-center">verify IUC Number</button>
        </div>
        <label className=" font-serif text-xl text-gray-700" >Costomer phone number</label>
        <input type="text" maxLength={11} placeholder="Enter your phone Number" onChange={(e)=>setPhone(e.target.value)} className="border-2 p-1 rounded-xl  bg-white border-white  text-gray-700 font-sans text-lg outline-0" />
          <div className="flex justify-center">
             <button onClick={cablesub} className='text-center bg-blue-800 my-3 border-2 rounded-2xl  p-2 border-blue-800 text-white font-sans w-50 lg:w-lg md:w-md'>{`${message===""? "Processing..." : "Subscribe"}`}</button>
          </div>
        </div>
    </div>
  )
}
