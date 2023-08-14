'use client'
import BackButton from '@/components/back-button';
import Button from '@/components/button';
import LoadNow from '@/components/loadnow';
import { AuthContext } from '@/context/authContext';
import { ReportContext } from '@/context/reportContext';
import axios from 'axios'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const SingleReport = ({params}) => {
    const [report, setReport] = useState(null)
    const [comments, setComments] = useState(null)
    const [commentField, setCommentField] = useState(null)
    const [photos, setPhotos] = useState(null)
    const [featuredIMG, setFeaturedIMG] = useState(null);
    const [err, setErr] = useState(null)
    const { currentUser } = useContext(AuthContext);
    const { DeleteReport } = useContext(ReportContext);
    const { push } = useRouter();
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleDelete = ()=>{
        const result = window.confirm("Are you sure you want to delete this report?");
        if (result) {
            DeleteReport(report.id);
            push('/dashboard')
        }
    }

    const handleComment = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.
            post(baseURL + "/report/comment/create", {
                text: commentField,
                parentPostID: report.id
            }, {withCredentials: true});

            setComments([ {...currentUser,
                text: commentField, parent: report.id },...comments])

            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

    
    const FetchSingleReport = (reportID) => {
         axios.get(baseURL + '/report/' + reportID)
        .then(res => {
            setReport(res.data.report[0])
            setComments(res.data.comments)
            setPhotos(JSON.parse(res.data.report[0].photos))
    })
    .catch(err => setErr(err.response.data.error))
    }
    useEffect(()=> {
        FetchSingleReport(params.id)
    }, []);
    console.log(commentField);

  return (
    <>
    { err &&
     <div className=' w-full py-5 px-2 bg-[#FFDFCD] flex justify-center items-center'> 
        <div className=" relative bg-white max-w-[1000px] p-3 min-h-[70%] block border-2 border-blue-950 border-r-8 border-b-8 rounded-lg gap-5">
            <p>{err}</p>
        </div>
     </div>  
    }
    {
        report ?
        <div className=' w-full py-5 md:py-8 bg-[#FFDFCD] flex justify-center items-center'> 
        <div className=" flex p-2 flex-col md:flex-row relative bg-white max-w-[1000px] md:p-8 min-h-[70%] border-2 border-blue-950 border-r-8 border-b-8 rounded-lg gap-5">
            <BackButton href='/report/all' />
            <div className=' flex-1'>
                <div className=' relative mt-12 md:mt-6 min-w-[410px] max-w-full aspect-video '>
                    <Image 
                    priority 
                    className=' object-contain rounded-md border-2 border-black' 
                    alt='Feature Image' 
                    src={featuredIMG || photos[0] || "/assets/profile.png"} 
                    fill={true}
                    
                     />
                </div>

                { photos && 
                <div className=' flex flex-wrap rounded-lg border-2 border-black mt-5'>
                
                    {
                        photos.map(( photo,index ) =>{
                            return(
                            <div key={index} className=' relative cursor-pointer w-[117px] h-[65.812px] m-2 object-contain max-h-24 rounded-md'>
                                <Image 
                                priority
                                onClick={()=> setFeaturedIMG(photo)}
                                src={photo || "/assets/profile.png"}
                                fill={true}
                                className=' object-cover  rounded'
                                alt='report image'
                                />
                                <p className=' absolute bottom-1 left-1 bg-white w-5 h-5 text-sm text-center rounded-full'>{index + 1} </p>
                            </div>
                            )
                        })
                    }
                </div>
                }
            </div>
            <div className=' relative flex-1 px-5 md:min-w-[500px]'>

             { ( currentUser && report.userID === currentUser.id) &&
                <div className=' absolute right-16 top-16 flex gap-2'>
                    <Button text='Edit' whenclick={() => alert("clicked")} />
                    <Button text='Delete' whenclick={handleDelete} bg='red' />
                </div>
            }   
                <h1 className=' text-3xl'>{ report.title }</h1>
                <h3 className=' bg-red-600 py-1 px-4 text-white rounded my-3 border border-black max-w-max'>
                    Scammer: { report.company }
                </h3>
                <p> Scam Amount: { report.amount  + " ৳" || "N/A "}</p>
                <p className=' mt-3'>
                <span className=' text-xl text-blue-800'>Scam Details:</span> 
                <br />
                { report.description }
                </p>

                {/* Comment Box */}
                <div className=' bg-blue-500 p-5 rounded mt-20'>
                    <p className=' pb-2 text-white'>Comments➘</p>
                    <div className='max-h-[300px] overflow-y-scroll'>
                    {
                        comments.map((comment, index) =>{
                            return (
                        <div key={index} className=' bg-slate-400 rounded p-2 mb-2 flex justify-start items-start gap-2'>
                            <Image 
                            src={comment.photo || '/assets/profile.png'}
                            width={30}
                            height={30}
                            alt='Commenter Image'
                            className=' rounded-full object-cover aspect-square' />
                            <div>
                                <p className=' text-blue-950'>@{comment.username}</p>
                                <p className=' text-white'>{comment.text}</p>
                            </div>
                        </div> 
                            )
                        })
                    }
                    </div>
                    { currentUser && 
                    <form onSubmit={handleComment} className=' flex justify-center items-start gap-2'>
                        <textarea 
                        required
                        onChange={(e) => setCommentField(e.target.value)}
                        className=' flex-1 rounded focus:outline-none p-3' 
                        type="text"
                        placeholder='write a comment'  />
                        <Button text='Comment' type="submit"  />
                    </form>
                    } 
                </div>
            </div>
        </div>
     </div> 
     :
     <LoadNow /> 
    }

    
    </>
  )
}

export default SingleReport