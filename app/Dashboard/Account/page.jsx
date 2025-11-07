"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, LockIcon } from "lucide-react"
export default function page() {
  const [biodata, setBiodata]=useState({})
  const [wallet, setwallet]=useState({})
  const [close, setclose]=useState(false)
  const [displayEditName, setDisplayEditName]=useState(false)
  const [displayEditEmail, setDisplayEditEmail]=useState(false)
  const [displayEditPhone, setDisplayEditPhone]=useState(false)
  const [newname, setNewName]=useState("")
  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [phone, setPhone]=useState("")
  const [newemail, setNewEmail]=useState("")
  const [newPhone, setNewphone]=useState("")
  useEffect(()=>{
    const bio=async ()=>{
      const res=await fetch("/api/Userdata")
      const data =await res.json()
      setBiodata(data.safeUser)
      setwallet(data.safeUser.wallet)
      // console.log(biodata)
    }
    bio()
  }, [])
  const balance=Number(wallet.balance)
  const update=async(e)=>{
    e.preventDefault()
    const res=await fetch("/api/update",{
       method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newname,newemail, newPhone
        })
    })
    const data =await res.json()
    alert(data.message)
    if(data.message==="user profile update successfull"){
      setclose(false)
    }
  }
  const editName=async () => {
    const res=await fetch("/api/EditName",{
       method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name})
    })
    const data=await res.json()
    alert(data.message)
    if(data.message==="Name update successfull"){
      setDisplayEditName(false)
    }
  }
  // const editEmail=async () => {
  //   const res=await fetch("/api/EditEmail",{
  //      method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({email})
  //   })
  //   const data=await res.json()
  //   alert(data.message)
  //   if(data.message==="Email update successfull"){
  //     setDisplayEditEmail(false)
  //   }
  // }
  const editPhone=async () => {
    const res=await fetch("/api/EditPhone",{
       method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({phone})
    })
    const data=await res.json()
    alert(data.message)
    if(data.message==="Phone number update successfull"){
      setDisplayEditPhone(false)
    }
  }
  return (
    <div className=" container mx-auto p-6"> 
      <div className="flex justify-center ">
        <img src="/Brand_logo.png" className="w-40" alt="" />
      </div>
          <h1 className="text-3xl font-sans text-black font-semibold">Profile</h1>
         <div className="px-3 lg:px-10 ">
           <div className="mt-2">
             <div className=" flex flex-row gap-2">
               <p className="mb-3 text-xl font-sans text-gray-800 ">FullName: <span className="text-gray-500 ml-8">{biodata.name}</span></p>
             <Edit className="text-white" cursor="Pointer" onClick={()=>setDisplayEditName(true)} />
             </div>
            {displayEditName && 
             <div className="item-center flex flex-row gap-3">
              <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter your new name" className="border bg-white border-white outline-0 p-1 " />
              <button onClick={editName} className="border bg-blue-500 rounded-xl p-1 text-white border-blue-500">Submit</button>
             </div>
            }
             <div className="items-center flex flex-row gap-2">
                 <p className="text-xl my-3 text-gray-800 font-sans">Email:</p>
                 <p className="text-gray-500  text-md lg:text-lg md:text-lg my-3">{biodata.email}</p>
                  <LockIcon className="text-black my-3 w-2 h-4"  cursor="Pointer"  />
             </div>
             {/* {displayEditEmail&& 
              <div className="flex flex-row gap-3">
              <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your new email" className="border bg-white border-white outline-0 p-1 " />
              <button onClick={editEmail} className="border bg-blue-500 rounded-xl p-1 text-white border-blue-500">Submit</button>
             </div>
             } */}
             <div className="items-center flex flex-row gap-2">
                <p className="text-xl my-3 text-gray-800 font-sans">Phone Num:</p>
               <p className="text-gray-500 ml-5">{biodata.phoneNumber}</p>
                  <Edit className="text-white my-3" cursor="Pointer" onClick={()=>setDisplayEditPhone(true)} />
             </div>
             {displayEditPhone&&
              <div className="items-center flex flex-row gap-3">
              <input type="text" maxLength={11} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your new phone number" className="border bg-white border-white outline-0 p-1 " />
              <button onClick={editPhone} className="border bg-blue-500 rounded-xl p-1 text-white border-blue-500">Submit</button>
             </div>
             }
              
          </div>
           <div className="flex flex-row gap-1 lg:gap-3 md:gap-3 items-center">
               <p className="text-xl my-3 text-gray-800 font-sans">Wallet Balance:</p>
             <p className="text-gray-500 ">&#8358;{Number(balance).toFixed(2)}</p>
              <Link href="/Dashboard/Fundwallet" className="border  bg-blue-800 hover:bg-blue-900 text-white px-2    font-sans  rounded-2xl border-blue-800">Fund Wallet</Link>
             </div>
             <button onClick={()=>setclose(true)} className="border-blue-500 border bg-blue-400 text-white font-sans p-1.5">Edit profile </button>
         </div>
         <div>
          {close&&(
          <div className="pl-10">
            <form >
              <div className="flex flex-col">
              <label className="my-2 font-sans text-lg">Name</label>
              <input type="text" onChange={(e)=>setNewName(e.target.value)} placeholder="Enter your new name" className="pl-5 border-2 rounded-md outline-0 p-1 bg-white max-w-xl border-white" />
              <label  className="my-2 font-sans text-lg">Email</label>
              <input type="text " onChange={(e)=>setNewEmail(e.target.value)} placeholder="Enter your new email" className="pl-5 border-2 rounded-md outline-0 p-1 bg-white max-w-xl border-white" />
              <label  className="my-2 font-sans text-lg">Phone Number</label>
              <input type="text" onChange={(e)=>setNewphone(e.target.value)} maxLength={11} placeholder="your new number" className="pl-5 border-2 rounded-md outline-0 p-1 bg-white max-w-xl border-white" />
            <div className="my-4">
               <button onClick={update} className="border bg-blue-700 border-blue-700 w-30 text-white font-serif ">Submit</button>
            </div>
             </div>
            </form>
          </div>
          )
          }
         </div>
         <div className="border p-2 bg-blue-500 border-blue-500 rounded-2xl mt-5 w-full lg:w-120">
          <h1 className="text-3xl text-white font-sans">
            Still can’t find what you need?
          </h1>
          <p className="text-2xl text-white my-3">Message me :</p>
          <Link href="https://wa.me/2349015017469?text=Hello%20JOSEPH!%20%20I%20saw%20yor%20website." target="_blank"className="font-sans border rounded-xl mt-5 mb-4 border-white text-white bg-blue-900 p-2">chat with Joseph on whatsapp</Link>
         </div>
    </div>
    
  )
}
