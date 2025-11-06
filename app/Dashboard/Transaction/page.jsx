"use client"
import { useState, useEffect } from "react"
export default function allTransferpage() {
  const [transaction, settransaction]=useState([])
  const [selecttext,setselectText]=useState(null)
  useEffect(()=>{
    const getTransaction=async()=>{
      const res=await fetch("/api/Userdata")
      if(res){
        const data=await res.json()
        
        console.log(data.safeUser.transactions)
        settransaction(data.safeUser.transactions)
      }
    }
    getTransaction()
  }, [])
  return (
    <div className='container mx-auto p-4'>
        <div className='flex justify-center'>
          <img src="/Brand_logo.png" className='w-40' alt="" />
        </div>
        <h1 className="text-2xl font-sans">All transaction</h1>
        <div className="bg-white border rounded-lg border-white mt-3 mx-3 overflow-auto  max-[500px]:max-w-80 md:w-full lg:w-full    ">
       <div className="flex gap-3 px-5 font-sans font-semibold  border-gray-300 mt-3 w-lg  lg:w-full mb-3 text-md md:text-base">
             <div className="w-1/12">Id</div>
            <div className="w-3/12">Amount</div>
            <div className="w-2/12">Type</div>
            <div className="w-4/12">Reference</div>
             <div className="w-2/12 lg:w-1/12">Status</div>
              <div className="w-1/12"></div>
      </div>
          {transaction.length==0?
              <p className=" text-gray-400 text-2xl font-sans text-center my-3">No transaction history yet</p>:
              <div>
                 {transaction.map((trans)=>(
                <div key={trans.id} className="flex gap-3 my-2 px-5 w-lg lg:w-full ">
                  <div className="w-1/12 font-sans">{trans.id}</div>
                  <div className="w-3/12 font-sans">&#8358;{Number(trans.amount).toFixed(2)}</div>
                  <div className={`w-2/12 font-sans ${trans.type==="funding"?"text-purple-600": trans.type==="airtime"?"text-orange-600": trans.type==="data"?"text-sky-600":"text-gray-600"}`}>{trans.type}</div>
                  <div className={`w-4/12 font-sans  ${trans.reference==="null"?"text-gray-400":"text-blue-300"}`}>{trans.reference}</div>
                  <div className={`w-2/12 lg:w-1/12 text-center px-1 ${trans.status.toLowerCase()==="success" ?"bg-green-500 text-white border-0 rounded-2xl":trans.status==="fail"?"bg-red-500 text-white border-0 rounded-2xl" : "text-gray-500"}`}>{trans.status.toLowerCase()}</div>
                  <button onClick={()=>setselectText(trans)} className="w-1/12 border px-1 text-white bg-blue-500">view</button>
                </div>
              ))}
              </div>
              }
        </div>
         <div className="">
       {selecttext && (
        <div className="flex  justify-center fixed inset-0 items-center bg-[rgb(0,0,0,0.8)] z-50 bg-opacity-40">
          <div className="border p-6 bg-white w-[90%] lg:w-[50%] rounded-lg">
            <h1 className="text-center font-semibold font-serif text-gray-800 text-lg my-3">Transaction Details</h1>
            <div className="flex flex-row justify-between my-2">
              <p className="text-xl font-sans text-gray-800">TransactionId</p>
              <p className="text-gray-600">{selecttext.id}Ajfdata</p>
            </div>
            
            <div className="flex flex-row justify-between my-2">
              <p className="text-xl font-sans text-gray-800">Amount</p>
              <p className="text-gray-600">&#8358; {selecttext.amount}</p>
            </div>
            
            <div className="flex flex-row justify-between my-2">
              <p className="text-xl font-sans text-gray-800">Type</p>
              <p className="text-gray-600 font-serif">{selecttext.type}</p>
            </div>
            
            <div className="flex flex-row justify-between my-2">
              <p className="text-xl font-sans text-gray-800">Reference</p>
              <p className="text-gray-600 font-serif">{selecttext.reference}</p>
            </div>
            
            <div className="flex flex-row justify-between my-2">
              <p className="text-xl font-sans text-gray-800">Status</p>
              <p className={`${selecttext.status==="success"? "text-green-600":selecttext.status==="fail"? "text-red-500":"text-gray-600 font-serif"}`}>{selecttext.status}</p>
            </div>
            
            <div className="flex flex-row justify-between my-2">
              <p className="text-xl font-sans text-gray-800">Date</p>
              <p>{ new Date(selecttext.createdAt).toLocaleString()}</p>
            </div>
            <div className=" flex flex-row gap-3 justify-end">
                {/* <button onClick={()=>handleDownload(selecttext)} className="bg-green-500 border-2 border-green-500 text-white font-sans p-1">Download</button> */}
                 {/* <button  className="bg-gray-500 p-1 text-white border border-gray-500">Share</button> */}
                 <button onClick={()=>setselectText(null)} className="border bg-blue-500 text-white p-1">close</button>

            </div>
           
          </div>
          
        </div>
       )}
       </div>
    </div>
  )
}
