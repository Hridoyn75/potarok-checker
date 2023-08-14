"use client"
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import Link from "next/link"
import { useContext } from "react"
import { TbLogout } from 'react-icons/tb';
import Button from "./button";
import Image from "next/image";





const Navbar = () => {
    
    const { currentUser, handleLogout } = useContext(AuthContext);




  return (
    <nav className=" absolute top-4 right-10 flex gap-3 items-center">
        <Button text="All Reports" url="/report/all" />
        <Button text="Create Report " url="/report/create" />
        <Button text="About us" url="/about" />
        {
            currentUser ?
            <>
            <Link className=" flex items-center gap-1" href='/dashboard'>
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
  )
}

export default Navbar