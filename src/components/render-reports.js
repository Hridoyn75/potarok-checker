"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RenderReports = ({type}) => {
    const [reports, setReports] = useState(null);

    const FetechData = async ()=>{
        await axios.get('http://localhost:5000/report/' + type, {
            withCredentials: true
        })
        .then(res => setReports(res.data))
        .catch(err => console.error(err))
    }
    useEffect(()=>{
        FetechData()
    },[]);
  return (
    <>
        {reports ? 
        <>
        { (reports.length < 1) && 
        <p className=" p-10">
            Sorry, no posts found!
        </p>
        }
        <div className=" min-w-[500px] max-w-full flex md:flex-wrap flex-col md:flex-row">
            {reports.map(report => {
                const photos = JSON.parse(report.photos);
                return (
                <Link href={"/report/" + report.id} key={report.id} className=" text-center w-full max-w-[298px] bg-slate-500 p-3 rounded m-3">
                        <div className=" relative mx-auto  h-[150px] w-[266.7px]">
                            <Image priority alt="thumbnail" src={photos[0]} fill objectFit="cover" />
                        </div>

   
                    <h3 className=" text-white pt-2 mb-2 h-[50px] min-h-[50px] overflow-hidden">{report.title}</h3>
                    <p className=" text-slate-900 mb-2 h-[50px] min-h-[50px] overflow-hidden">{report.description}</p>
                    <p className=" mb-3 text-white bg-red-700 rounded-md border border-black">{report.company}</p>
                </Link>)
            })}
        </div>
        </>
        :
        <h1>Loading...</h1>
        }
    </>
  )
}

export default RenderReports