'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// create authcontext
export const AuthContext = React.createContext();

// create a provider for that context
export const AuthProvider = ({children})=>{

     const { push } = useRouter();
    
    const [ currentUser, setCurrentUser] = useState( null);
    useEffect(()=>{
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    },[])
    



    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
    // Handle user login
    const handleLogin = async (email, password) => {

      try {
        const response = await axios.post(baseURL + '/login', 
        {"email": email, "password": password},
        {withCredentials: true});
        setCurrentUser(response.data.data)
        return { "success": true, "message": response.data.message }
      } catch (error) {
        return { "success": false, "message": error.response.data.error }
      }
    }

    // Handle user logout
    const handleLogout = () => {
      axios.post(baseURL + '/logout',{},{
        withCredentials: true
      })
      .then(() =>{
        alert("Logged out successfully")
        setCurrentUser(null);
      })
    }
    // Handle Profile Update
    const handleUserUpdate = async (inputs) =>{
      try {
        const response = await axios.post(baseURL + '/user/update',
        inputs, {
         withCredentials:true
       });
       setCurrentUser(response.data.data);
       return { "success": true, "message": response.data.message }
      } catch (err) {
        return { "success": false, "message": err.response.data.error }
      }
    };


    useEffect(()=>{
      localStorage.setItem("currentUser",JSON.stringify(currentUser));
    }, [currentUser])

    return(<AuthContext.Provider value= {{ currentUser, handleLogin, handleLogout, handleUserUpdate}} >
            {children}
           </AuthContext.Provider>);

}
