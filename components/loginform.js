"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import {signInWithPopup,onAuthStateChanged  } from "firebase/auth";
import {auth, provider} from '@/firebase';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [ipAddress, setIpAddress] = useState('');
    const ipList = ["163.47.158.62"]
    const [notAllowed, setnotAllowed] = useState(false);
    const { push } = useRouter();

    useEffect(()=>{
      // check if user is already logged in or not, if logged in then push to homepage
      onAuthStateChanged(auth, (user) => {
        if (user) {
          push("/");
        }
      });
    },[])

    // get current ip address of user using ipify api service
    const getIP = async ()=>{
        await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          setIpAddress(data.ip)

        })
        .catch(error => {
          console.log(error);
        });
    }
    useEffect(() => {
        getIP()
      }, []);


      // if user not logged in then handle new login via google authentication
      const handleLogin = () =>{
        signInWithPopup(auth, provider)
        .then((result) => {
        }).catch((error) => {
          console.log(error.message);
        }); 
      }
  return (
    <div className=' w-[500px] flex justify-center items-center max-w-[90%] min-h-[300px] bg-white p-5 border-2 border-blue-950 border-r-8 border-b-8 rounded-lg'>
            <div className=' grid gap-4'>
            <h1 className=' text-3xl text-blue-950 font-bold  '>Welcome to</h1>
                <Image 
                src={"/assets/logo.png"}
                width={300}
                height={100}
                className=' mx-auto'
                alt='logo' />
                {
                    notAllowed ?
                    <h1 className=' text-red-700 text-3xl'>You are Not Allowed to use our Services</h1>
                    :
                    <button onClick={handleLogin} className=' bg-blue-500 px-5 py-3 hover:bg-slate-600 hover:text-white border-2 border-blue-950 rounded-lg'>
                        Login with Google
                    </button>  
                }
            </div>

            
        </div>    
  )
}

export default LoginForm