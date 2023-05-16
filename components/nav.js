"use client"
import { auth } from "@/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Link from "next/link"
import { useState } from "react"
import { TbLogout } from 'react-icons/tb';





const Navbar = () => {
    const [ user, setUser] = useState(null)

    onAuthStateChanged(auth,(user)=>{
        setUser(user)
    })

    const handleSignOut = () => {
        signOut(auth).then(()=> alert("Successfully signed out"))
        .catch(err => console.log(err))
    }

  return (
    <nav className=" absolute top-4 right-10 flex gap-3 items-center">
        <Link href="/about" className=" text-[#172554] px-3 py-1 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg">
          About us
        </Link>
        <Link href="/new-report" className=" text-[#172554] px-3 py-1 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg">
          Report 
        </Link>
        {
            user ?
            <Link href='/dashboard'>
             <img src={user.photoURL} className=" w-11 h-11 rounded-full border-2 border-blue-950"/>
            </Link>

            :
            <Link href="/login" className=" text-[#172554] px-3 py-1 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg">
              Login
            </Link>
        }
        {
            user &&
            <div onClick={handleSignOut} className=" cursor-pointer text-[#172554] px-3 py-1 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg">
             <TbLogout /> 
            </div>
        }

    </nav>
  )
}

export default Navbar