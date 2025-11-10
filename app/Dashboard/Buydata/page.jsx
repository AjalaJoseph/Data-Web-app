"use client"
import { Check } from "lucide-react"
import { useState, useEffect } from "react"
export default function Buydata() {
  const [networks, setnetwork]=useState([])
  const [selectnetwork, setSelectNetwork]=useState("")
  const [plans, setPlans]=useState([])
const [dataclick, setdataclicked]=useState(null)
const [plancode, setplancode]=useState(null)
const [number, setnumber]=useState("")
const [amount, setamount]=useState(null)
const [message, setMessage]=useState(null)
  useEffect(()=>{
    const getnetwork=async ()=>{
      const res=await fetch("/api/network")
      const data=await res.json()
      if(data){
        setnetwork(data.network)
        console.log(data)
      }
    }
    getnetwork()

  },[])
  const displayplan=async (selectnetwork)=>{
    setSelectNetwork(selectnetwork)
    const res=await fetch(`/api/plan?network=${selectnetwork}`)
    const data= await res.json()
    setPlans(data.plan)
  }
   const selldata=async()=>{
    setMessage("")
    const res=await fetch("/api/Datapurchase",{
     method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectnetwork,
        number,
        plancode,
        amount
      })
    })
    const data=await res.json()
    console.log(data)
    if(data.message==="Data purchase failed" || data.message==="Data purchase successful"){
      setPlans([])
    }
    setMessage(data.message)

   }
   

  return (
    <div className="px-8">
      <div className="flex justify-center">
        <img src="/Brand_logo.png" alt=""  className="w-30"/>
      </div>
     <div className="flex flex-col lg:flex-row gap-10 ">
       <div className="flex flex-col  ">
        <h1 className="text-center text-2xl text-gray-900 font-sans">Buy Data</h1>
        <p className="text-lg text-center  fixed right-5 lg:right-40 p-1 top-2 border rounded-lg bg-blue-400 text-white border-blue-400">{message}</p>
        <label className=" font-serif text-xl text-gray-700">network</label>
        <select value={selectnetwork}  onChange={(e)=>displayplan(e.target.value)} className="border-2 p-2  rounded-xl w-full lg:w-xl bg-white border-white my-2 text-gray-700 font-sans text-lg">
          <option>select network</option>
          {/* {networks.length===0? <option>load</option>:
          <div> */}
            {networks?.map((net,index)=>(
            <option key={index} value={net}  className="font-sans text-sm">{net}</option>
          ))}
            {/* </div>} */}
        </select>
         <label className=" font-serif text-xl text-gray-700">Plan</label>
         <div className="bg-white grid grid-cols-4 lg:grid-cols-6 gap-2 p-3 border-2 border-white rounded-2xl">
          {plans.map((me)=>(
            <button key={me.id} onClick={()=>{setdataclicked(me.id); setplancode(me.planId);setamount(me.sellingprice)}} className={ `${dataclick===me.id? "bg-blue-300 border rounded-md border-blue-300 text-white" :"border rounded-md text-gray-800 border-gray-800"}`}>
              <p className="font-sans">{me.name}</p>
              <p className="font-sans">{me.validity.match(/[\(\[]([^)\]]+)[\)\]]/)?.[1]}</p>
              <p className="font-sans"><span>&#8358;</span>{me.sellingprice}</p>
            </button>
          ))}
        </div>
        <label className=" font-serif text-xl text-gray-700">Phone number</label>
        <input type="text"maxLength={11} onChange={(e)=>setnumber(e.target.value)} className="border-2 p-2 rounded-xl w-full lg:w-xl md:w-lg bg-white border-white my-2 text-gray-900 font-sans text-lg outline-0" placeholder="09015017469"/>
       
        <div className="flex justify-center">
           <button onClick={selldata} className="border mt-3 bg-blue-800 text-white border-blue-800 rounded-2xl hover:bg-blue-900 font-sans p-2 w-50">{message===""? "processing...":"Buy data" }</button>
        </div>
      </div>
      <div className="flex justify-center">
        <img src="/data2.png" alt="" className="w-70 flex-1 " />
      </div>
     </div>
     {/* <div className="flex justify-center items-center z-50 bg w-full h-screen absolute inset-0">
          <Check size={80} className="text-green-600 "/>
     </div> */}
    </div>
  )
}
