"use client"
import React from 'react'
import { useState, useEffect } from 'react'
export default function Billpayment() {
  const [disco, setdisco]=useState(null)
  const [meter, setmeter]=useState("")
  const[type, setType]=useState("");
  const [amount, setAmount]=useState(null)
  const [phone, setPhone]=useState(null)
  const [plans, setPlans]=useState([])
  const [identifier, setidentifier]=useState("")
  const [custormer,setCustormer]=useState("")
  const [message, setMessage]=useState(null)
  const [valid, setValid]=useState(null)
  useEffect( ()=>{
    const getplans= async ()=>{
      const res=await fetch("/api/Getdisco")
    if(res){
      const data= await res.json();
      console.log(data.data?.data?.electricity)
      // setidentifier(data.data.identifier)
      // setPlans(data.data.plans)
      setPlans(data.data?.data?.electricity)
      console.log(plans)
    }
    
    }
    getplans()
  }, [])
  const validate= async()=>{
    setValid("")
    const response= await fetch("/api/verifyBill",{
       method:"POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           meter,
           disco,
           type,
         })
    })
    const data=await response.json()
    // console.log(data.data)
    if(data.data?.data){
      setValid(data.data?.data?.customer_name )
      setCustormer(data.data.data?.customer_name)
      console.log(custormer)
    }
    
    else{
      setValid("Invalid meter number ")
    }
    
   }
   const electricityBill=async ()=>{
    setMessage("")
    const res=await fetch("/api/BillPayment",{
       method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier:"electricity",
        custormer,
        meter,
        disco,
        amount,
        type,
        phone
      })
    })
    const data= await res.json()
    setMessage(data.message || data.error)
   }
   
  return (
    <div className='px-8'>
      <div className='flex justify-center'>
        <img src="/Brand_logo.png" className='w-30' alt="" />
      </div>
      <div className="flex flex-col">
        <h1 className='text-center font-sans text-2xl font-semibold text-gray-700'>Electricity Bill Payment</h1>
        <p className=' text-center text-lg text-blue-500'>{message}</p>
        <label className='font-sans text-lg text-gray-800'>Disco name*</label>
        <select name="" onChange={(e)=>setdisco(e.target.value)} className="border-2 p-2 rounded-xl w-full lg:w-xl bg-white border-white my-2 text-gray-700 font-sans text-lg">
          <option value="">select disco name</option>
          {/* {plans.map((plan)=>(
            <option key={plan.plan_code}>{plan.plan_code}</option>
          ))} */}
          {plans.map((plan,index)=>(
            <option key={index}>{plan}</option>
          ))}
        </select>
         <label className='font-sans text-lg text-gray-800 '>Meter type</label>
        <select name="" onChange={(e)=>setType(e.target.value)} className="border-2 p-2 rounded-xl w-full mt-2 lg:w-xl bg-white border-white  text-gray-700 font-sans text-lg">
          <option value="">select type</option>
          <option value="prepaid">prepaid</option>
          <option value="postpaid">postpaid</option>
         </select>
         <label className='font-sans text-lg text-gray-800'>Meter number</label>
         <input type="text" onChange={(e)=>{setmeter(e.target.value)}}   placeholder='Enter your meter number' className='border bg-white p-2 rounded-xl w-full lg:w-xl border-white outline-0' />
          <div className='flex flex-row mt-2 gap-5'>
            <p>{valid===""?"loading..." : valid}</p>
            <button className='border bg-blue-600 text-white font-sans p-1 border-blue-600  rounded-xl' onClick={validate}>verify meter</button>
          </div>
         <label className='font-sans text-lg text-gray-800'>Amount</label>
          <input type="text" onChange={(e)=>setAmount(e.target.value)} placeholder='Enter amount minimum of 500' className='border bg-white p-2 rounded-xl w-full lg:w-xl border-white outline-0' />
           <label className='font-sans text-lg text-gray-800'>Costomer phone number</label>
          <input type="text" onChange={(e)=>setPhone(e.target.value)} placeholder='09015017469' className='border bg-white p-2 rounded-xl w-full lg:w-xl border-white outline-0' />
          <button onClick={electricityBill} className='text-center bg-blue-800 my-3 border-2 rounded-2xl w-full lg:w-xl p-2 border-blue-800 text-white font-sans'>{message===""? "Processing..." : "Subscribe"}</button>
      </div>
    </div>
  )
}
