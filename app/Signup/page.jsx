"use client"
// import React from 'react'
import { Eye, EyeOff, Medal, CheckCircle} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function signup() {
  const [name, setName]=useState("")
  const [nameError, setNameError]=useState("")
  const [email, setEmail]=useState("")
  const[emailError, setEmailError]=useState("");
  const[phonenumber, setPhone]=useState("");
  const [phoneError, setPhoneerror]=useState("");
  const [password, setpassword]=useState("");
  const[passwordError, setPasswordError]=useState("");
  const [confirm, setConfirm]=useState("");
  const [confirmError, setConfirmError]=useState("")
  const [type,setType]=useState("password")
  const [message, setMessage]=useState(null)
  const [color, setcolor]=useState("text-red-400")
  const [exist, setExist]=useState(false)
  const router=useRouter()
  const handleName=()=>{
    if(name.trim()==0){
      setNameError("name is required")
    }
    
  }
  const handleEmail=()=>{
    if(email.length==0){
      setEmailError("Email is required")
    }
    else if(email.length>0){
      if(!email.includes("@") || !email.includes(".com")){
    setEmailError("please enter a valid email address ")
    }
    }
    else{
      return
    }
    
    
  }
  const handlepassword=()=>{
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, include letters, numbers, and at least one special character.")
    }
    }
    const handleconfirm=()=>{
      if(confirm.length==0){
        setConfirmError("This field is needed")
      }
      else if(!password.match(confirm)){
        setConfirmError("password is not match")
      }
    }
    const handlesubmit=async (e)=>{
      setMessage("")
      e.preventDefault()
      const res=await fetch("/api/Signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phonenumber, 
         password,
         }),})
         const data =await res.json()
         setMessage(data.message || data.error)
         if(data.message==="Account created successfully"){
          setcolor("text-green-500")
          router.push("/Login")
         }
         else{
          setcolor("text-red-400")
         }
         if(data.error==="User already exist" ){
          setExist(true)
         }

    }
  return (
    <div className=" flex flex-row ">
       <div className=" hidden lg:block md:block bg-gradient-to-t from-blue-800 via-blue-500 to-blue-200 basis-1/2">
            <img src="/datagirl.png" alt="" className="p-15 w-fit"/>
       </div>
       <div className="flex-1 px-7 lg:px-30 ">
        <form onSubmit={handlesubmit}>
            <div className="flex justify-center">
              <img src="/Brand_logo.png" alt="" className="w-30" />
            </div>
            <h1 className="text-center text-3xl text-blue-900 font-bold font-sans">Sign up</h1>
              <p className={ `${color}  text-center font-sans`}>{message}</p>
            <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold font-serif my-2 text-blue-400 text-lg">full Name</label>
                <input type="text" placeholder="Ajala joseph" onChange={(e)=>{
                  setName(e.target.value);
                  setNameError("")
                }} onBlur={handleName} className="border-2 rounded-lg border-blue-500 p-1  outline-0" />
                <p className="text-red-400">{nameError}</p>
                <label htmlFor="email" className="font-semibold font-serif my-2 text-blue-400 text-lg">Email</label>
                <input type="email" placeholder=" example@gmail.com " onChange={(e)=>{
                  setEmail(e.target.value)
                  setEmailError("")
                }}  onBlur={handleEmail} className="border-2 border-blue-500 p-1 outline-0 rounded-lg" />
                <p className="text-red-400">{emailError}</p>
                <label htmlFor="phone"className="font-semibold font-serif my-2 text-blue-400 text-lg">Phone number</label>
                <input type="text" placeholder="09015017469" onChange={(e)=>setPhone(e.target.value)} maxLength={11} className="border-2 border-blue-500 p-1 outline-0 rounded-lg" />
                <label htmlFor="password" className="font-semibold font-serif my-2 text-blue-400 text-lg">Password</label>
               <div className="relative">
                 <input type={type} onChange={(e)=>{
                  setpassword(e.target.value)
                  setPasswordError("")
                }} onBlur={handlepassword} placeholder="***********" className="border-2 border-blue-500 p-1 outline-0 rounded-lg w-full" />
               <Eye  className={`${type==="text"?"hidden":"block"} absolute right-4 top-2`} onClick={()=>setType("text")}/>
              <EyeOff  className={`${type==="password"?"hidden":"block"} absolute right-4 top-2`} onClick={()=>setType("password")}/>
                {/* <Eye />
                <EyeOff className="absolute hidden right-4 top-2"/> */}
               </div>
                <p className="text-red-400">{passwordError}</p>
                <label className="font-semibold font-serif my-2 text-blue-400 text-lg" >Comfirm password</label>
                <input type="password" onChange={(e)=>{
                  setConfirm(e.target.value)
                  setConfirmError("")
                }} onBlur={handleconfirm} placeholder="**********" className="border-2 border-blue-500 p-1 outline-0 rounded-lg " />
               <p className="text-red-400">{confirmError}</p>
               {exist &&(
                <p className="text-gray-400 mt-2 text-center">Already have an account <Link href="/Login" className="text-green-400">Login</Link></p>
               )}
                <div className="flex justify-center mt-4">
                 <button type="submit" className={`${message===""? "p-2 w-70 border-2 border-blue-800 rounded-xl  text-white  bg-blue-800 font-sans":"border-2 border-blue-800 rounded-xl w-50 text-white p-2 bg-blue-800 font-sans hover:bg-blue-900"}`}>{message===""? "Validating...": "Sign Up"}</button>
                </div>
            </div>
        </form>
       </div>
               {message==="Account created successfully" && (
                <div className="absolute flex justify-center items-center w-full h-screen bg-[rgb(0,0,0,0.8)] ">
                  <div>
                 <p className="text-3xl text-blue-600 flex flex-row justify-center gap-4">Congratulation! <Medal size={30} className="text-yellow-300"/></p>
                  <p className="text-gray-500 font-serif text-2xl text-center mt-3"> your account have been successfully created</p>
                   <div className="flex justify-center mt-3">
                    <CheckCircle className="text-green-600 " size={50} />
                   </div>
                </div>
                </div>
               )}
    </div>
  )
}
