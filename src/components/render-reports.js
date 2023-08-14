"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RenderReports = ({type}) => {
    const [reports, setReports] = useState(null);


    useEffect(()=>{
        const FetechData = async ()=>{
            await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/report/' + type, {
                withCredentials: true
            })
            .then(res => setReports(res.data))
            .catch(err => console.error(err))
        };
        FetechData()
    },[type]);
  return (
    <>
        {reports ? 
        <>
        { (reports.length < 1) && 
        <p className=" p-10">
            Sorry, no posts found!
        </p>
        }
        <div className=" w-full max-w-full flex sm:flex-wrap flex-col sm:flex-row">
            {reports.map(report => {
                const photos = JSON.parse(report.photos);
                return (
                 <div className=" w-full sm:w-1/2 lg:w-1/3 p-2" key={report.id} > 
                <div href={"/report/" + report.id} className=" text-center bg-slate-500 p-3 rounded">
                    <Link href='/'>
                    <div className=" relative mx-auto w-full aspect-video">
                        <Image priority alt="thumbnail" src={photos[0]} fill objectFit="cover" />
                    </div>
                    </Link>
                    <Link href='/'>
                        <p className=" line-clamp-2 min-h-8  text-white my-3">{report.title}</p>
                    </Link>
                    <p className=" text-slate-900 mb-2 line-clamp-2 overflow-hidden">{report.description}</p>
                    <p className=" mb-3 py-1 text-white bg-red-700 rounded-md border border-black">{report.company}</p>
                </div>
                </div>  
                )
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