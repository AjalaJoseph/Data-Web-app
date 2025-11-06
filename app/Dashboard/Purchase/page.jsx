"use client"
import { useState, useEffect } from "react"
export default function purchasePage() {
  const [purchase, setPurchase]=useState([])
  useEffect(()=>{
    const getPurchase=async ()=>{
      const res=await fetch("/api/Userdata")
      if(res){
        const data= await res.json();
        // console.log(data.safeUser.purchases)
        setPurchase(data.safeUser.purchases)
      }
    }
    getPurchase()
  },[])
  return (
    <div className=" bg-blue-200 h-screen ">
    <div className="container mx-auto p-3 lg:p-6">
         <div className='flex justify-center'>
          <img src="/Brand_logo.png" className='w-40' alt="" />
        </div>
        <h1 className="text-2xl font-sans">All Purchases</h1>
        <div className="bg-white border rounded-lg border-white mt-3 mx-3 overflow-auto  max-[500px]:max-w-80 md:w-full lg:w-full    ">
        <div className="flex gap-15 px-5 font-sans justify-between font-semibold  border-gray-300 mt-3 w-full  mb-3 text-md md:text-base">
             {/* <div className="w-2/12">Id</div> */}
             <div className="w-2/12">Category</div>
            <div className="w-2/12">Amount</div>
            {/* <div className="w-4/12">Phone</div> */}
            <div className="w-4/12">Plan</div>
             <div className="w-4/12">network</div>
             <div className="w-4/12 me-0">Status</div>
      </div>
      {purchase.length==0? <p className=" text-gray-400 text-2xl font-sans text-center my-3">No Purchase history yet</p>:
        <div> 
            {purchase.map((purchases)=>(
               <div key={purchases.id} className="flex gap-13 justify-between my-2 px-5 w-full  font-sans">
                {/* <div className="w-2/12">{purchases.id}</div> */}
             <div className="w-2/12">{purchases.category}</div>
            <div className="w-2/12">&#8358;{Number(purchases.amount).toFixed(2)}</div>
           
            {/* <div className="w-4/12">{purchases.phoneOrMeter}</div> */}
             
            <div className="w-4/12">{purchases.plan}</div>
            <div className="w-4/12">{purchases.network}</div>
            {/* <div className="w-4/12">{purchases.apiResponse}</div> */}
             <div className="w-4/12 ">{String(purchases.status).toLowerCase()}</div>
             </div>
            ))}
        </div>
      }
       
      </div>
    </div>
    </div>
  )
}

 
