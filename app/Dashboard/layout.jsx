"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
// import { getServerSession } from "next-auth"
// import { authOption } from "../api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import { UserCircle,CreditCard, HomeIcon, Phone, Signal, ClipboardCheck, Menu , X, ChevronDown, Zap, Wallet, DollarSign, HelpCircle, User, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [userData, setUserData] = useState({})
  const [userWallet, setUserWallet] = useState({})
    const session = useSession()
    if (!session){
        return <p className=" flex justify-center items-center w-full h-screen "> unauthorize you need to login orb register with us</p>
    }

  const display = () => setOpen(prev => !prev)
  useEffect(()=>{
    const getuserdata=async()=>{
        const res = await fetch("/api/Userdata");
        const data=await res.json()
        if(data){
             setUserData(data.safeUser)
             setUserWallet(data.safeUser.wallet)
        }
    }
    getuserdata()
  }, [])
  const balance=Number(userWallet.balance) ||0
    return(
        
        <div className="flex flex-row  bg-blue-200  ">
            <div className={`${!menu? "hidden" :"block"} bg-blue-900 max-[500px]:h-screen lg:block md:block max-[500px]:absolute max-[500px]:z-50` }>
                {/* <div className="flex justify-center">
                    <img src="/Brand_logo.png" alt="brand logo image" className="w-20 shadow-2xl shadow-white" />
                </div> */}
                <aside className="ps-5 w-70  ">
                    <X className={`block lg:hidden md:hidden text-white absolute top-2 ms-50`} onClick={()=>setMenu(false)}  size={30}/>
                    <div className="flex flex-row gap-2 mt-10 mb-3 ">
                         <UserCircle className=" text-yellow-200 " size={50}/>
                         <div className="text-white">
                            <p className="font-sans text-md">{userData.name}</p>
                            <p className="font-sans text-md flex flex-row ">balance: <span>&#8358; {balance.toLocaleString()}.00 </span></p>
                         </div>
                    </div>
                   <hr className="text-gray-400" />
                    <div className="flex flex-row gap-2 my-3">
                        <HomeIcon size={30} className="text-gray-400"/>
                        <Link href="/Dashboard" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Dashboard</Link>
                    </div>
                    <div className="flex flex-row gap-2 my-3">
                        <Signal size={25} className="text-gray-400"/>
                        <Link href="/Dashboard/Buydata" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Buydata"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Buy data</Link>
                    </div>
                    <div className="flex flex-row gap-2 my-3">
                        <Phone size={30} className="text-gray-400"/>
                        <Link href="/Dashboard/Buyairtime" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Buyairtime"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Buy airtime</Link>
                    </div>
                    <div className="flex flex-row gap-2 my-3">
                        <ClipboardCheck size={30} className="text-gray-400"/>
                        <Link href="/Dashboard/Examchecker" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Examchecker"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Exam Checker</Link>
                    </div>
                    <div className="flex flex-row gap-2 my-3">
                        <Zap size={30} className="text-gray-400"/>
                        <button className="text-gray-300 font-sans text-lg flex flex-row pe-5" onClick={display}>Utilities Payment <ChevronDown/></button>
                        
                    </div>
                    {open &&(
                            <div className=" flex flex-col gap-2">
                                <Link href="/Dashboard/Billpayment" onClick={()=>setMenu(false)} className="ps-12 text-md text-gray-400 ">Bill Payment</Link>
                                 <Link href="/Dashboard/Cable" onClick={()=>setMenu(false)} className="ps-12 text-md text-gray-400 ">Cable Subscription</Link>
                            </div>
                        )}
                        <div className="flex flex-row gap-2 my-3">
                        <Wallet size={30} className="text-gray-400"/>
                        <Link href="/Dashboard/Fundwallet" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Fundwallet"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Fund wallet</Link>
                    </div>
                        {/* <div className="flex flex-row gap-2 my-3">
                        <DollarSign size={30} className="text-gray-400"/>
                        <Link href="/Dashboard/Pricing" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Pricing"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Pricing</Link>
                    </div> */}
                    <div className="flex flex-row gap-2 my-3">
                        <CreditCard size={30} className="text-gray-400"/>
                        <Link href="/Dashboard/Recharge" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Recharge"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Recharge Pin</Link>
                    </div>
                    <div className="flex flex-row gap-2 my-3">
                        <User size={30} className="text-gray-400"/>
                        <Link href="/Dashboard/Account" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Account"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Account</Link>
                    </div>
                    <div className="flex flex-row gap-2 my-3">
                        <Settings size={30} className="text-gray-400"/>
                        <Link href="/Dashboard/Set" onClick={()=>setMenu(false)} className={pathname ==="/Dashboard/Set"? "bg-white px-3 font-sans text-lg border-2 border-white rounded-lg text-gray-800":"text-gray-300 font-sans text-lg"}>Settings</Link>
                    </div>
                    <div className="flex flex-row gap-2 my-8">
                        <LogOut size={30} className="text-gray-400"/>
                        <button onClick={()=>signOut({ callbackUrl: "/Login" })}  className="text-gray-300 font-sans text-lg cursor-pointer">Logout</button>
                    </div>
                </aside>
            </div>
            
            <main className=" flex-1">
                <Menu className={`${!menu?"flex":"hidden"} lg:hidden absolute top-5 text-white left-3`} onClick={()=>setMenu(true)} size={30}/>
                {children}
            </main>
            <div className="max-[500px]:hidden bg-blue-50 basis-1/12">
                {/* <p className="writing-mode-[vertical-lr] text-orientation-[mixed]">bvjhfhfjfjh</p> */}
                <p className="rotate-90"></p>
            </div>
        </div>
        
    )
}
