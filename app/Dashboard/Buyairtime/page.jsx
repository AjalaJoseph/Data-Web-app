"use client"
import { useState, useEffect } from "react"
export default function Buyairtime() {
  const [network, setNetwork]=useState([])
  const [selectNetwork,setSelectNetwork]=useState(null)
  const [amount, setAmount]=useState(null);
  const [phoneNumber, setNumber]=useState(null)
  const [message, setMessage]=useState(null)
  // const networks = [
  //   { id: "1", name: "MTN" },
  //   { id: "2", name: "GLO" },
  //   { id: "3", name: "AIRTEL" },
  //   { id: "4", name: "9MOBILE" },
  // ];
  
// console.log(selectNetwork)
  useEffect(()=>{
    const getnetwork=async ()=>{
      const res=await fetch("https://client.peyflex.com.ng/api/airtime/networks/")
      const data=await res.json()
      console.log(data)
      setNetwork(data.networks)
    }
    getnetwork()
   
  },[])
 
   const Buyairtime=async ()=>{
    setMessage("")
      const res=await fetch("/api/airtimetopup",{
         method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         selectNetwork,
          amount,
          phoneNumber
      })
      })
      const data=await res.json()
      // console.log(data.message|| data.error)
      setMessage(data.message || data.error)
    }
  return (
    <div className="px-8">
      <div className="flex justify-center">
        <img src="/Brand_logo.png" alt=""  className="w-30"/>
      </div>
     <div className="flex flex-col lg:flex-row gap-10 ">
       <div className="flex flex-col  ">
        <h1 className="text-center text-2xl text-gray-900 font-sans">Buy Airtime</h1>
        <p className={`${message==="All fields are required"? "text-xl text-center text-red-400 ":"text-xl text-center text-blue-400 "}`}>{message}</p>
       
        <label className=" font-serif text-xl text-gray-700">network</label>
         <select  onChange={(e)=>setSelectNetwork(e.target.value)} className="border-2 p-2  rounded-xl w-full lg:w-xl bg-white border-white my-2 text-gray-700 font-sans text-lg">
          <option>select network</option>
          {network.map((newnet)=>(
            <option key={newnet.id}  className="text-md font-sans">{newnet.name.toLowerCase()}</option>
          ))}
        </select> 
        {/* <div className="flex flex-row gap-2">
        {networks.map((netlist)=>(
          <button key={netlist.id} className="border rounded-md p-2" onClick={()=>setSelectNetwork(netlist.name)}>{netlist.name}</button>
        ))}
        </div> */}
         <label className=" font-serif text-xl text-gray-700">Amount</label>
          <input type="text"onChange={(e)=>setAmount(e.target.value)} placeholder="Amount" className="border-2 p-2 rounded-xl w-full lg:w-xl md:w-lg bg-white border-white my-2 text-gray-700 font-sans text-lg outline-0"  />
        <label className=" font-serif text-xl text-gray-700">Phone number</label>
        <input type="text" onChange={(e)=>setNumber(e.target.value)} maxLength={11} className="border-2 p-2 rounded-xl w-full lg:w-xl md:w-lg bg-white border-white my-2 text-gray-700 font-sans text-lg outline-0" placeholder="09015017469"/>
        <div className="flex justify-center">
           <button onClick={Buyairtime} className="border mt-3 bg-blue-800 text-white border-blue-800 rounded-2xl hover:bg-blue-900 font-sans p-2 w-50">{message===""?"Processsing..." : "Buy airtime"}</button>
        </div>
      </div>
      <div className="flex justify-center">
        <img src="/data2.png" alt="" className="w-70 flex-1 " />
      </div>
     </div>
    </div>
  )
}