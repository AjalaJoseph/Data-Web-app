"use client"
import { useState,useEffect } from "react"
export default function AllUserpage() {
  const [Users, setUsers]=useState([])
  useEffect(()=>{
    const user=async () => {
      const res=await fetch("/api/admin")
      const data=await res.json()
      if(data){
        console.log(data)
        setUsers(data?.safeUser)
      }
    }
    user()
  }, [])
  const totaluser=Users.length
  return (
    <div className="container mx-auto p-6">
        <div>
          <h1 className="text-3xl font-sans mb-3">Users</h1>
          <div className="overflow-auto max-[500px]:w-sm max-[500px]:h-screen ">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-3 font-sans">Name</th>
                  <th className="px-3 font-sans">Email</th>
                  <th className="px-3 font-sans">PhoneNumber</th>
                  <th className="px-3 font-sans" >CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user)=>(
                <tr key={user.id} className="text-gray-500">
                  <td className="px-4 font-sans text-md">{user.name}</td>
                  <td className="px-4 font-sans text-md">{user.email}</td>
                  <td className="px-4 font-sans text-md">{user.phoneNumber}</td>
                  <td className="px-4 text-md font-sans">{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center my-4 text-xl font-sans">Total Number of user: {totaluser}</p>
          </div>
        </div>
    </div>
  )
}