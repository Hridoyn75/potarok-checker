"use client"
import { onAuthStateChanged  } from "firebase/auth";
import { auth } from '@/firebase';
import { useState } from "react";
import { useRouter } from 'next/navigation';

const NewReport = () => {
    const [isUser, setisUser] = useState({displayName: 'to Potarok Checker'})
    const { push } = useRouter();

    // check if user is already logged in or not, if logged in then push to homepage
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setisUser(user)
        } else{
        push("/login")
        }
    });



    //handle new report submit form
    const handleNewReport = (e) => {
        e.preventDefault();
        push("/")
    }



  return (
    <>
        <div className=" flex justify-center items-center h-screen w-full">
            <div className=" text-center p-5 max-w-[90%] w-[900px] min-h-[70%] bg-white border-2 border-blue-950 border-r-8 border-b-8 rounded-lg">
                <h1 className=" text-3xl py-3 text-blue-900 font-extrabold">Report a প্রতারক</h1> 
                <p className=" text-sm pb-5 text-slate-500">Please keep in mind that you will be permanently banned for Submitting false Report</p>
                <form onSubmit={handleNewReport} className=" max-w-[90%] w-[400px] mx-auto grid gap-3">
                    <input type="text" required className=" focus:outline-none text-white bg-blue-950 rounded-md px-2 py-1" placeholder="Company Name"/>
                    <input type="text" required className=" focus:outline-none text-white bg-blue-950 rounded-md px-2 py-1" placeholder="Title of Report"/>
                    <textarea required className=" focus:outline-none text-white bg-blue-950 rounded-md p-5 " placeholder="আপনার সাথে ঘটে যাওয়া প্রতারণার সংক্ষিপ্ত বিবরণ দেন"/>
                    <p>Add image prove:</p>
                    <input required type="file" accept="image/*" multiple className=" cursor-pointer bg-slate-600 rounded text-white file:bg-green-700 file:border-none file:p-2" />
                    <input type="number" required className=" focus:outline-none text-white bg-blue-950 rounded-md px-2 py-1" placeholder="কত টাকার প্রতারনা হয়েছে (টাকা)"/>
                    <button type="submit" className=" bg-white border-2 border-blue-950 rounded p-1 px-3 mx-auto mt-3 hover:bg-slate-500 max-w-[250px]">Submit Report</button>

                    <div>
                        <p className=" text-blue-950 text-sm">Your are Reporting as: {isUser.displayName}, {isUser.email}</p>
                    </div>



                </form>
            </div>
        </div>
    </>
  )
}

export default NewReport