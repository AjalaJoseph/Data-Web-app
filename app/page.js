"use client"
import Link from "next/link"
import { useState,useEffect } from "react"
import { Menu ,X,Facebook, LinkedinIcon,InstagramIcon, MessageCircle} from "lucide-react"
export default function Home(){
  const [open, setopen]=useState(false)
 

  return(
    <div>
    <div className="bg-blue-200 ">
       
      <button className="absolute right-8 text-white top-8 lg:hidden cursor-pointer md:hidden" onClick={()=>setopen(!open)} >{
        !open?<Menu size={30}/> :<X size={30}/>
        }</button>
      <nav className="container mx-auto  px-6 flex flex-row">
        <div>
          <img src="/Brand_logo.png" className="w-30 cursor-pointer"/>
        </div>
          <div className="flex-row gap-8 mx-auto mt-8 text-white font-semibold font-sans hidden lg:flex md:flex ">
            <Link href="/" className="text-xl">Home</Link>
            <Link href="#about" className="text-xl">About</Link>
            <Link href="#service" className="text-xl">Services</Link>
            
          </div>
          <div className=" flex-row gap-4 my-8 hidden lg:flex md:flex ">
              <Link href="/Signup"className="border-2 rounded-lg h-10 p-1.5 bg-blue-800 border-blue-800  font-sans text-white">SignUp</Link>
              <Link href="/Login" className="font-sans font-semibold text-blue-800 text-xl">Login</Link>
           </div>
      </nav>
        {open && (
          <div className="flex justify-center lg:hidden md:hidden ">
           <div className="flex flex-col gap-3  text-black bg-white border-white rounded-lg w-70 border-2 p-2 font-sans ">
            <Link href="/" className="text-lg text-center lg:text-xl md:text-xl">Home</Link>
            <Link href="#about" className="text-lg text-center lg:text-xl md:text-xl">About</Link>
            <Link href="#service" className="text-lg text-center lg:text-xl md:text-xl">Services</Link>
            <Link href="/Signup"className="border-2 text-center rounded-lg h-10 p-1.5 bg-blue-800 border-blue-800  font-sans text-white">SignUp</Link>
             <Link href="/Login" className="font-sans text-center font-semibold text-blue-800 text-xl">Login</Link>
          </div>
          
        </div>
        )}
      </div>
      <div className=" bg-gradient-to-t from-blue-600 via-blue-500 to-blue-200 py-8">
          <div className="container mx-auto px-6 flex justify-center gap-x-20 flex-col lg:flex-row ">
            <div className="flex justify-center">
              <img src="/datagirl.png" className="w-full"/>
            </div>
           
            <section className=" text-white py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4"> Fast, Reliable & Affordable Data for All Networks </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300"> Buy data, airtime, and pay bills instantly — with secure transactions powered by AJF-Data.</p>
              <div className="flex  justify-center">
              <Link href="/Signup"className="border-2 p-3 font-semibold font-sans rounded-lg bg-white text-blue-500 border-white hover:bg-blue-800 hover:text-white hover:border-blue-800 ">Get Started</Link>
              </div>
          </section>
          </div>
      </div>
      <div className=" container mx-auto p-6" id="service">
          <h2 className=" text-2xl font-sans font-semibold text-center">our service</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 gap-y-5 mt-4">
            <div className=" rounded-2xl p-3 bg-white backdrop-blur-50 shadow-lg  ">
             <div className="flex justify-center">
               <img src="/airtime.png" className="w-20 " />
             </div>
             <p className="text-center font-serif font-semibold"> Airtime Top-up</p>
             <p className="text-center mt-2 font-sans text-gray-600">Recharge your line in seconds. Choose any network, any amount and get instant airtime delivery</p>
            </div>
            <div className=" rounded-2xl p-6 bg-white backdrop-blur-50 shadow-lg ">
             <div className="flex justify-center">
               <img src="/data.png" className="w-30 " />
             </div>
             <p className="text-center font-serif font-semibold"> Buy Data instantly</p>
             <p className="text-center mt-2 font-sans text-gray-600 text-md">Enjoy fast and Affordable data bundles across all nigerian Networks</p>
            </div>
            <div className=" rounded-2xl p-6 bg-white backdrop-blur-50 shadow-lg">
             <div className="flex justify-center">
               <img src="/exam2.png" className="w-20 " />
             </div>
             <p className="text-center font-serif font-semibold"> Purchase E-pins</p>
             <p className="text-center mt-2 font-sans text-gray-600 text-md">Buy WEAC, NECO, or JAMB e-pins easily from your dashbord</p>
            </div>
            <div className=" rounded-2xl p-6 bg-white backdrop-blur-50 shadow-lg">
             <div className="flex justify-center">
               <img src="/cable tv.png" className="w-20 " />
             </div>
             <p className="text-center font-serif font-semibold"> cable Tv</p>
             <p className="text-center mt-2 font-sans text-gray-600 text-md">Subscribe to any of your cable Tv(DSTV, GOTV, Startime) and more . </p>
            </div>
            <div className=" rounded-2xl p-6 bg-white  backdrop-blur-50 shadow-lg ">
             <div className="flex justify-center">
               <img src="/fund wallet.jpg" className="w-20 " />
             </div>
             <p className="text-center font-serif font-semibold"> Fund  wallet</p>
             <p className="text-center mt-2 font-sans text-gray-600 text-md">Fund your AJFdata wallet with either of the followings Debit card, credit card , transfer from your bank e.t.c</p>
            </div>
          </div>
          
      </div>
      <div className="container mx-auto p-6" id="about">
            <h2 className=" text-center font-bold text-2xl font-sans">About us</h2>
            <div className=" container mx-auto p-8">
              <div className="flex flex-col lg:flex-row md:flex-row gap-5">
                <div className="flex w-full items-center basis-1/2 ">
                  <p className="text-center font-serif text-2xl text-gray-400 leading-10">AJFdata is one of the most data and all subscription web app that offers instant deliveries of Airtime 
                , mobile data, all examination pin , cable tv e.t.c. At a very low price .
                </p>
                </div>
                <img src="/data2.png" className=" basis-1/2"/>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-5 mt-5">
             <div className=" rounded-2xl p-6 bg-white border-2 border-white  shadow-xl ">
             <div className="flex justify-center">
               <img src="/support.jpg" className="w-20 " />
             </div>
             <p className="text-center font-serif font-semibold"> Costomer support</p>
             <p className="text-center mt-2 font-serif text-gray-600 text-lg">Get help whenever you need it. AJFdata is always ready to guides you through any issue, big or small</p>
            </div>
             <div className="rounded-2xl p-6 bg-white border-2 border-white  shadow-xl ">
             <div className="flex justify-center">
               <img src="/available.jpg" className="w-20 " />
             </div>
             <p className="text-center font-serif font-semibold"> 24/7 Available</p>
             <p className="text-center mt-2 font-sans text-gray-600 text-md">Enjoy uninterrupted service day or night. you can buy data , aitime, or pay bills anytime anywhere.</p>
            </div>
             <div className=" rounded-2xl p-6 bg-white border-2 border-white  shadow-xl ">
             <div className="flex justify-center">
               <img src="/ef11f653593db496bafbd9b120ba3691.jpg" className="w-20 " />
             </div>
             <p className="text-center font-serif font-semibold"> Affordable</p>
             <p className="text-center mt-2 font-sans text-gray-600 text-md">Stay connected without overspending. we offer the lowest prices on data and airtime with 5% discount airtime bougth.</p>
            </div>
              </div>
            </div>
      </div>
      <div className="bg-gray-300">
        <div className="container mx-auto px-8 pt-8 pb-10">
          <div className="flex flex-col lg:flex-row gap-5">
          <div className="basis-2/5">
              <h1 className="font-semibold font-serif text-2xl text-blue-500">Resources</h1>
              <div className="flex flex-col ">
                <Link href="/" className="text-white text-lg font-serif ml-3">Home</Link>
              <Link href="#about" className="text-white text-lg font-serif ml-3">About us</Link>
              <Link href="#service" className="text-white text-lg font-serif ml-3">Our service</Link>
              <Link href="/Signup" className="text-white text-lg font-serif ml-3">Sign Up</Link>
              <Link href="/Login" className="text-white text-lg font-serif ml-3">Login</Link>
              </div>
          </div>
         <div className="basis-2/5">
              <h1 className="font-semibold font-serif text-2xl text-blue-500">Products</h1>
              <div className="flex flex-col ">
                <Link href="/Signup" className="text-white text-lg font-serif ml-3">Buy Data</Link>
              <Link href="/Signup" className="text-white text-lg font-serif ml-3">Buy Airtime</Link>
              <Link href="/Signup" className="text-white text-lg font-serif ml-3">Cable subscription.</Link>
              <Link href="/Signup" className="text-white text-lg font-serif ml-3">Bill Payment</Link>
              <Link href="/Signup" className="text-white text-lg font-serif ml-3">Exam pins</Link>
              </div>
          </div>
         <div className="basis-2/5">
              <h1 className="font-semibold font-serif text-2xl text-blue-500">Social Links</h1>
              <div className="flex flex-col ">
              <div className="flex flex-row  items-center">
                <Facebook size={20}/>
                <Link href="" className="text-white text-lg font-serif ml-3">Facebook(Ajala Joseph)</Link>
              </div>
              <div className="flex flex-row items-center">
                <LinkedinIcon size={20}/>
                <Link href="" className="text-white text-lg font-serif ml-3">LinkedIn(Ajala Josepjh)</Link>
              </div>
              <div className="flex flex-row items-center">
                <InstagramIcon size={20}/>
                <Link href="" className="text-white text-lg font-serif ml-3">Instangram(Ajala Joseph)</Link>
              </div>
               <div className="flex flex-row items-center">
                <MessageCircle size={20} className="text-green-500"/>
                 <Link href="https://wa.me/2349015017469?text=Hello%20JOSEPH!%20%20I%20saw%20yor%20website." target="_blank" className="text-white text-lg font-serif ml-3">Whatsapp(09015017469)</Link>
              </div>
            
             
              </div>
              
          </div>
          </div>
        </div> 
      </div>
    </div>
  )
}