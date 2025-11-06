
"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { UserCircle2, HandshakeIcon } from "lucide-react"
export default function dasboardpage() {
 const [userData, setUSerData] = useState({})
 const [userwallet, setuserwallet]=useState({})
 const [transaction, settransaction]=useState([])
 const [selecttext, setselectText]=useState(null)
  const {data:session}=useSession()
  const role=session?.user?.role;
  console.log(role)
 useEffect(()=>{
  const getuserdata=async()=>{
    const res = await fetch("/api/Userdata");
      const data=await res.json()
      // console.log(data)
  if(data){
    setUSerData(data.safeUser)
    setuserwallet(data.safeUser.wallet)
    settransaction(data.safeUser.transactions)
  }
     }
   getuserdata()
 },[]) 
 const balance= Number(userwallet.balance) || 0
  return (
    <div className="">
      <div>
       <div className=" flex flex-row bg-blue-300 justify-between pt-3 ">
        <div className="pl-10 lg:pl-8 md:pl-8">
          <h1 className="font-sans text-lg font-semibold text-gray-900">Good day!</h1>
           <div className=" flex flex-row gap-3">
             <p className="font-serif text-md">{userData.name}</p>
            <HandshakeIcon className="text-yellow-400"/>
           </div>
        </div>
        <div className=" pr-10 ">
          <Link href="/Dashboard/Account"> <UserCircle2 className="" size={40}/></Link>
        </div>
       </div>
       <div className="p-8">
        <h1 className="text-2xl font-sans text-gray-800">Dashboard</h1>
        <div className=" border-2 bg-white border-white rounded-2xl p-4 mt-2">
          <p className="font-serif text-3xl">Wallet ballance</p>
          <div className="">
              <p className="mt-2 ms-3 text-2xl text-gray-500"><span>&#8358; {balance.toLocaleString()}.00</span></p>
            <div className=" flex justify-end pe-10">
              <Link href="/Dashboard/Fundwallet" className="border-2  bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-2xl border-blue-800">Fund Wallet</Link>
            </div>
          </div>
          
           
          <div className="flex flex-row gap-3 lg:gap-6 mt-3">
          <Link href="/Dashboard/Buyairtime" className=" leading-2"> 
              <img src="/airtime.png" alt="" className="w-15" />
              <p className="ms-3 font-sans text-md">airtime</p>
          </Link>
          <Link href="/Dashboard/Buydata" className=" leading-4"> 
              <img src="/data.png" alt="" className="w-25" />
              <p className="ms-7  font-sans text-md">Data</p>
          </Link>
          <Link href="/Dashboard/Examchecker" className=" leading-2"> 
              <img src="/exam2.png" alt="" className="w-15" />
              <p className="ms-2 mt-2 font-sans text-md">Exam-pin</p>
          </Link>
          </div>
        </div>
       </div>
       <div className="flex flex-row px-5 lg:px-8 md:ps-8 gap-7 lg:gap-20">
        <Link href="/Dashboard/Transaction" className="border-2 bg-white p-1 lg:p-2 text-md font-sans border-white rounded-xl">Transaction</Link>
         <Link href="/Dashboard/Purchase" className="border-2 bg-white p-1 lg:p-2 text-md font-sans border-white rounded-xl">Purchase</Link>
          <Link href="/Dashboard/Wallet" className="border-2 bg-white p-1 lg:p-2 text-md font-sans border-white rounded-xl">Wallet</Link>
       </div>
       {role==="admin"&&
       <div className="flex flex-row px-5 lg:px-8  md:ps-8 my-4 gap-7 lg:gap-20">
          <button onClick={async ()=>{
           const res= await fetch("/api/Datasource",{
              method:"GET"
            })
            if(res.ok){
               alert("dataplan updated successfully")
            }
            else{
              alert("Data plan updated failed")
            }
           
          }} className="border p-1 rounded-xl font-sans bg-blue-700 border-blue-700 text-center text-white text-md">Update Data</button>
          <button  onClick={async ()=>{
            const res=await fetch("/api/cablepan",{
              method:"GET"
            })
            if(res.ok){
              alert("cableplan updated successfully")
            }
            else{
              alert("cable plan updated failed")
            }
            
          }} 
          className="border p-1 rounded-xl font-sans bg-blue-700 border-blue-700 text-center text-white text-md">Update Cable</button>
          <Link href="/Dashboard/ViewUser" className="border-2 bg-white p-0 lg:p-2 text-center text-md  font-sans border-white rounded-xl">View Users</Link>
       </div>
       }
       <div className="mt-4 py-6 px-3 lg:px-8">
        <h1 className="font-serif text-2xl text-gray-800 mt-3">Transaction history</h1>
        <div className="bg-white border rounded-lg border-white mt-3 mx-3 overflow-auto  max-[500px]:max-w-sm md:w-full lg:w-full h-40  ">
           
            <div className="flex gap-3 px-5 font-sans font-semibold  border-gray-300 mt-3 w-lg  lg:w-full mb-3 text-md md:text-base">
             {/* <div className="w-1/12">Id</div> */}
            <div className="w-3/12">Amount</div>
        <div className="w-2/12">Type</div>
        <div className="w-4/12">Reference</div>
        <div className="w-2/12 lg:w-1/12">Status</div>
        <div className="w-1/12"></div>
      </div>
              {transaction.length==0?
              <p className=" text-gray-400 text-2xl font-sans text-center">No transaction history yet</p>:
              <div>
                 {transaction.map((trans)=>(
                <div key={trans.id} className="flex gap-3 my-2 px-5 w-lg lg:w-full ">
                  {/* <div className="w-1/12 font-sans">{trans.id}</div> */}
                  <div className="w-3/12 font-sans">&#8358;{Number(trans.amount).toFixed(2)}</div>
                  <div className={`w-2/12 font-sans ${trans.type==="funding"?"text-purple-600": trans.type==="airtime"?"text-orange-600": trans.type==="data"?"text-sky-600":"text-gray-600"}`}>{trans.type}</div>
                  <div className={`w-4/12 font-sans  ${trans.reference==="null"?"text-gray-400":"text-blue-300"}`}>{trans.reference}</div>
                  <div className={`w-2/12 lg:w-1/12 text-center px-1 ${trans.status.toLocaleLowerCase()==="success" ?"bg-green-500 text-white border-0 rounded-2xl":trans.status==="fail"?"bg-red-500 text-white border-0 rounded-2xl" : "text-gray-500"}`}>{String(trans.status).toLocaleLowerCase()}</div>
                  <button onClick={()=>setselectText(trans)} className="w-1/12 border px-1 text-white bg-blue-500 ml-5">view</button>
                </div>
              ))}
              </div>
              }
            </div>
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
              <p>{new Date(selecttext.createdAt).toLocaleString()}</p>
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
    </div>
  )
}
