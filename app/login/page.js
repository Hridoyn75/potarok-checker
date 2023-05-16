"use client"
import LoginForm from "@/components/loginform"
import { useRouter } from 'next/navigation';
const LoginPage = () => {

  const { push } = useRouter()

  if (true) {
    push("/");
  }

  return (
    <>
    <div className=' flex justify-center items-center h-screen w-full text-center'>
      <LoginForm />
    </div>   
    </>
  )
}

export default LoginPage