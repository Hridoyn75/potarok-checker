"use client"
import LoginForm from "@/components/loginform"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
const LoginPage = () => {

  const { push } = useRouter()

  useEffect(() =>{
      push("/");
  },[])

  return (
    <>
    <div className=' flex justify-center items-center h-screen w-full text-center'>
      <LoginForm />
    </div>   
    </>
  )
}

export default LoginPage