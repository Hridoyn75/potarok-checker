'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// create authcontext
export const ReportContext = React.createContext();

// create a provider for that context
export const ReportProvider = ({children})=>{
    
    const DeleteReport = (id)=>{
        axios.delete("http://localhost:5000/report/delete/"+ id, {
            withCredentials: true
        })
        .then(res =>  console.log(res))
        .catch(err => console.log(err));
    }


    return(<ReportContext.Provider value= {{DeleteReport}} >
            {children}
           </ReportContext.Provider>);

}
