"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Eye,EyeOff } from "lucide-react"
export default function login(){
    const [type, setType]=useState("password")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [message, setMessage]=useState(null)
    const [color, setcolor]=useState("text-red-500")
    const [display, setDisplay]=useState(false)
    const [newPassword, setNewPassword]=useState("")
    const [Gmail, setGmail]=useState("")
    const router=useRouter()
    const handLogin=async (e)=>{
        e.preventDefault()
        setMessage("")
        const res = await signIn("credentials", {
             email,
            password,
            redirect: false,
          });
          if(res.ok){
            setMessage("Login successfull")
            router.push("/Dashboard")
            // console.log(res.name)
          }
          else{
            setMessage(res.error || "login fail")
          }
          if(message==="Login successfull"){
            setcolor("text-green-500")
          }
         
    }
     const resetPassword=async ()=>{
            const res=await fetch("/api/Reset", {
              method: "POST",
               headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
              Gmail,
              newPassword
             })
            })
            const data=await res.json()
            alert(data.message)
            if(data.message==="password reset successfull"){
              setDisplay(false)
            }
          }
    return(
        <div className="relative">
          <p className={`${message==="Login successfull"?"bg-green-500 text-white border-green-500 text-center rounded-lg border text-md":"text-center font-mono text-md text-white rounded-lg border  bg-red-300 border-red-300"} absolute right-5 font-sans  top-4`}>{message}</p>
            <div className="flex justify-center items-center w-full h-screen">
                <div>
                     <div className="flex justify-center">
                     <img src="/Brand_logo.png" alt="" className="w-35" />
                    </div>
                     <h1 className="text-center text-3xl text-blue-900 font-bold font-sans">Login</h1>
                        
                    <div className="flex flex-col border-2 p-2 border-blue-500 rounded-2xl mt-2">
                        <label htmlFor="email"className="font-semibold font-serif my-2 text-blue-400 text-lg">Email</label>
                        <input type="text" placeholder="example@gmail.com" onChange={(e)=>setEmail(e.target.value)} className="border-2 border-blue-500 p-1 outline-0 rounded-lg"  />
                         <label htmlFor="password"className="font-semibold font-serif my-2 text-blue-400 text-lg">password</label>
                        <div className="relative">
                          <div>
                             <input type={type} placeholder="********" onChange={(e)=>setPassword(e.target.value)}  className="border-2 border-blue-500 p-1 outline-0 rounded-lg"  />
                        <Eye  className={`${type==="text"?"hidden":"block"} absolute right-4 top-2`} onClick={()=>setType("text")}/>
                        <EyeOff  className={`${type==="password"?"hidden":"block"} absolute right-4 top-2`} onClick={()=>setType("password")}/>
                         </div>
                         <button onClick={()=>setDisplay(true)} className="ml-20 mt-2 text-md text-blue-400 font-serif">Forgot Password</button>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button onClick={handLogin} className="border-2 border-blue-800 rounded-xl w-50 text-white p-2 bg-blue-800 font-sans hover:bg-blue-900">{message===""?"Authenticating...":"Login"}</button>
                      </div>
                    </div>
                    
                </div>
                <div className={`${display===true ? "absolute  bg-[rgb(0,0,0,0.8)] w-full h-screen" : null}`}> 
              {display&&(
                <div className="flex justify-center items-center w-full h-screen ">
                  <div className="flex flex-col bg-white p-2 rounded-lg">
                    <X className="ml-40" onClick={()=>setDisplay(false)} size={30}/>
                    <label className="text-xl font-serif text-blue-600 ">Your Register Email</label>
                    <input type="text" onChange={(e)=>setGmail(e.target.value)} placeholder="Enter your account gmail" className="border-2 mt-3 text-black border-blue-400 p-1 outline-0 rounded-lg"  />
                    <label  className="text-xl font-serif text-blue-600 my-2">Create new password </label>
                    <div className="relative">
                      <input type={type} placeholder="********" onChange={(e)=>setNewPassword(e.target.value)}  className="border-2 p-1 outline-0 border-blue-400 rounded-lg"  />
                        <Eye  className={`${type==="text"?"hidden":"block"} absolute right-4 top-2`} onClick={()=>setType("text")}/>
                        <EyeOff  className={`${type==="password"?"hidden":"block"} absolute right-4 top-2`} onClick={()=>setType("password")}/>
                     </div>
                     {/* <label  className="text-xl mt-2 font-serif text-blue-600 ">Confirm </label>
                     <input type="Password" className="border-2 mt-2 text-black p-1 outline-0 border-blue-400 rounded-lg"  placeholder="confirm your password" /> */}
                     <div>
                      <button onClick={resetPassword} className="text-white font-serif border w-full my-2 rounded-lg text-center py-1 bg-blue-600">Submit</button>
                     </div>
                  </div>
                </div>
              )}
              </div>
            </div>
            
        </div>
    )
}