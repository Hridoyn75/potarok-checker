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

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   setErr(null);
    //    axios.post('http://localhost:5000/login', 
    //   {"email": email, "password": password},
    //   {withCredentials: true})
    //   .then((res)=>{
    //     console.log(res.data.data)
    //     localStorage.setItem('currentUser', JSON.stringify(res.data.data))
    //     push("/")
    //   })
    //   .catch((err)=>{
    //     setErr(err.response.data.error)
    //   })

    // };


  return (
    <div className=' relative w-[500px] flex justify-center items-center max-w-[90%] min-h-[300px] bg-white p-5 border-2 border-blue-950 border-r-8 border-b-8 rounded-lg'>
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

            
        </div>    
  )
}

export default LoginForm