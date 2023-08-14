"use client"
import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BackButton from './back-button';

const LoginForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);

    const { push } = useRouter();
    


    const handleSubmit = async (e) => {
      e.preventDefault();
      setErr(null);

      await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/signup', 
      {"name": name,
      "username": username,
      "email": email,
      "password": password
      })
      .then((res)=>{
        console.log(res.data.data)
        push("/auth/login")
      })
      .catch((err)=>{
        setErr(err.response.data.error)
      })

    };


  return (
    <div className=' relative w-[500px] flex justify-center items-center max-w-[90%] min-h-[300px] bg-white p-5 border-2 border-blue-950 border-r-8 border-b-8 rounded-lg'>
            <BackButton href='/auth/login' />
            <form onSubmit={handleSubmit} className=' grid gap-4'>
            <h1 className=' text-3xl text-blue-950 font-bold  '>Welcome to</h1>
                <Image 
                src={"/assets/logo.png"}
                width={300}
                height={100}
                className=' mx-auto'
                alt='logo' />
                <input required type="text" placeholder='name' name='name'
                 onChange={(e)=>{ setName(e.target.value);}}
                 className=' p-3 border border-gray-500 rounded focus:border-green-500 outline-none' />
                <input required type="text" placeholder='Create username' name='username'
                 onChange={(e)=>{ setUsername(e.target.value);}}
                 className=' p-3 border border-gray-500 rounded focus:border-green-500 outline-none' />
                <input required type="email" placeholder='email' name='email'
                  onChange={(e)=>{setEmail(e.target.value)}}
                 className=' p-3 border border-gray-500 rounded focus:border-green-500 outline-none' />
                <input required type="password" placeholder='Create password' name='password'
                 onChange={(e)=>{ setPassword(e.target.value);}}
                 className=' p-3 border border-gray-500 rounded focus:border-green-500 outline-none' />
                <button 
                type='submit'
                className=' my-3 bg-blue-500 px-5 py-3 hover:bg-slate-600 hover:text-white border-2 border-blue-950 rounded-lg'>
                    Signup
                </button>
                { err && <p className=' text-red-700 font-bold'>{err}!</p>} 
                <p>Already have a account? <Link href='/auth/login' className=' text-blue-700'>Login</Link></p>

            </form>

            
        </div>    
  )
}

export default LoginForm