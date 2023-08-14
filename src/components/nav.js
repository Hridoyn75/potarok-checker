"use client"
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import Link from "next/link"
import { useContext, useState } from "react"
import { TbLogout } from 'react-icons/tb';
import Button from "./button";
import Image from "next/image";





const Navbar = () => {
    
    const { currentUser, handleLogout } = useContext(AuthContext);
    const [mobileNav, setMobileNav] = useState(false);




  return (
    <>
    <div className=" w-full left-0 px-4 absolute top-3 flex justify-between items-center md:hidden">
      <Button text="Menu" whenclick={()=> setMobileNav(!mobileNav)} />
      { currentUser &&
      <Link className=" flex items-center gap-1" href='/dashboard'>
            <p>{currentUser.name || currentUser.username}</p>
             <Image 
             src={currentUser.photo || "/assets/profile.png"} 
             width={45}
             height={45}
             alt="profile image"
             className=" aspect-square object-cover hover:opacity-80 transition-all ease duration-500 rounded-full border-2 border-blue-950"/>
      </Link>
      }
    </div>
    <nav className={` absolute top-4 right-20
      ${mobileNav? "flex" : "hidden"} md:flex flex-col
       md:flex-row bg-purple-100 md:bg-transparent
      border-2 md:border-none border-black  rounded 
       md:rounded-none p-3 md:p-0 gap-3 items-end md:items-center`}>

        <Button text="All Reports" url="/report/all" />
        <Button text="About us" url="/about" />
        {
            currentUser ?
            <>
            <Button text="Create Report " url="/report/create" />
            <Link className=" hidden md:flex items-center gap-1" href='/dashboard'>
            <p>{currentUser.name || currentUser.username}</p>
             <Image 
             src={currentUser.photo || "/assets/profile.png"} 
             width={45}
             height={45}
             alt="profile image"
             className=" aspect-square object-cover hover:opacity-80 transition-all ease duration-500 rounded-full border-2 border-blue-950"/>
            </Link>
            </>

            :
            <Button text="Login" url="/auth/login" />
        }
        {
          currentUser &&
            <div className=" cursor-pointer  hover:bg-slate-400 transition-all ease duration-500 text-[#172554] px-3 py-1 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg">
             <TbLogout onClick={handleLogout} /> 
            </div>
        }

    </nav>
    </>
  )
}

export default Navbar