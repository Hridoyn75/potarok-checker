"use client"
import React, { useState, useContext } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import BackButton from './back-button';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const { handleLogin } = useContext(AuthContext);

    const { push } = useRouter();


    const Login = async (e)=>{
      e.preventDefault();

      const res = await handleLogin(email, password);
      console.log(res);
      if(res.success){
        alert(res.message);
        push("/")
      }else{
        setErr(res.message);
      }
    }

    const handleGoogleLogin =  ()=>{
      window.location.href = 'http://localhost:5000/auth/google';
    }
    const handleGitHubLogin =  ()=>{
      window.location.href = 'http://localhost:5000/auth/github';
    }


  return (
    <div className=' relative w-[400px] max-w-[90%] bg-white p-5 border-2 border-blue-950 border-r-8 border-b-8 rounded-lg'>
            <BackButton />
            <form onSubmit={Login} className=' grid gap-4'>
            <h1 className=' text-3xl text-blue-950 font-bold  '>Welcome to</h1>
                <Image 
                src={"/assets/logo.png"}
                width={300}
                height={100}
                className=' mx-auto'
                alt='logo' />
                
                <input required type="email" placeholder='email' name='email'
                  onChange={(e)=>{setEmail(e.target.value)}}
                 className=' p-3 border border-gray-500 rounded focus:border-green-500 outline-none' />
                <input required type="password" placeholder='password' name='password'
                 onChange={(e)=>{ setPassword(e.target.value);}}
                 className=' p-3 border border-gray-500 rounded focus:border-green-500 outline-none' />
                <button 
                type='submit'
                className=' my-3 bg-blue-500 px-5 py-3 hover:bg-slate-600 hover:text-white border-2 border-blue-950 rounded-lg'>
                    Login
                </button>
                { err && <p className=' text-red-700 font-bold'>{err}!</p>} 
                <p>Don't have any account? <Link href='/auth/signup' className=' text-blue-700'>Signup</Link></p>


            </form>
                            {/* Social Logins */}
                 <p className=' mt-3 text-xl  text-left'>otherwise</p>
                <button 
                onClick={handleGoogleLogin}
                className=' flex justify-center gap-5 items-center mt-2 w-full px-5 py-3 hover:bg-slate-600 hover:text-white border-2 border-blue-950 rounded-lg'>
                    <Image 
                     src='/assets/google.png'
                     width={25}
                     height={25}
                     alt='google logo' />
                    <p className=' text-xl'> Continue with Google</p>
                </button>
                <button 
                onClick={handleGitHubLogin}
                className=' flex justify-center gap-5 items-center mt-2 w-full px-5 py-3 hover:bg-slate-600 hover:text-white border-2 border-blue-950 rounded-lg'>
                    <Image 
                     src='/assets/github.png'
                     width={25}
                     height={25}
                     alt='google logo' />
                    <p className=' text-xl'> Continue with GitHub</p>
                </button>
        </div>    
  )
}

export default LoginForm