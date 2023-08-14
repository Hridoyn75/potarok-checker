"use client"
import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { AuthContext } from "@/context/authContext";


const ReportForm = () => {
    const { currentUser } = useContext(AuthContext);
    const { push } = useRouter();
    const [inputs, setInputs] = useState();
    const [err, setErr] = useState(null);

    const [disableForm, setDisableForm] = useState(false);



    const apiKey = 'ff284a93af21e2591813f203c095e14c'; // Replace with your actual ImgBB API key

    const handleImageChange = async (event) => {
      setDisableForm(true);
      const selectedFiles = Array.from(event.target.files);
      const uploadPromises = selectedFiles.map(async (image) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('key', apiKey);
  
        try {
          const response = await axios.post('https://api.imgbb.com/1/upload', formData);
          return response.data.data.url;
        } catch (error) {
          console.log('Error uploading image:', error);
        }
      });
  
      const uploadedUrls = await Promise.all(uploadPromises);
      setInputs(prev =>({...prev, photos: JSON.stringify(uploadedUrls)}))
      setDisableForm(false);
    };

    //handle new report submit form
    const handleNewReport = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/report/create', inputs,{
          withCredentials:true
        })
        .then(res => {
          alert(res.data);
          push('/report/all')
        })
        .catch(err => setErr(err.response.data));
    }
    

    // handle input change
    const handleChange = (e) =>{
      setErr(null);
      setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
    }
  return (
    <form onSubmit={handleNewReport} className=" max-w-[90%] w-[400px] mx-auto grid gap-3">
        <input name="company" onChange={(e)=>handleChange(e)} type="text" required className=" focus:outline-2 focus:outline-yellow-400 text-white bg-blue-950 rounded-md p-2" placeholder="Company Name"/>
        <input name="title" onChange={(e)=>handleChange(e)} type="text" required className="focus:outline-2 focus:outline-yellow-400 text-white bg-blue-950 rounded-md p-2" placeholder="Title of Report"/>
        <textarea name="description" onChange={(e)=>handleChange(e)} required className="focus:outline-2 focus:outline-yellow-400 text-white bg-blue-950 rounded-md p-5 " placeholder="আপনার সাথে ঘটে যাওয়া প্রতারণার সংক্ষিপ্ত বিবরণ দেন"/>
        <input name="amount" onChange={(e)=>handleChange(e)} type="number" required className=" focus:outline-2 focus:outline-yellow-400 text-white bg-blue-950 rounded-md p-2" placeholder="কত টাকার প্রতারনা হয়েছে (টাকা)"/>
        <p>Add image prove:</p>
        <input onChange={handleImageChange} type="file" accept="image/*" multiple className=" cursor-pointer bg-slate-600 rounded text-white file:bg-green-700 file:border-none file:p-2" />
        { disableForm && <p className=" text-red-700">wait,Image is uploading...</p>}
        <button disabled={disableForm} type="submit" className=" bg-white border-2 border-blue-950 rounded p-1 px-3 mx-auto mt-3 hover:bg-slate-500 max-w-[250px]">Submit Report</button>
        {
          err &&
          <p className=" bg-red-600 p-2 border border-black rounded text-white">{"Oops... " + err +"!"}</p>
        }
        { currentUser &&
        <div>
            <p className=" text-blue-950 text-sm">Your are Reporting as: {currentUser.name || currentUser.username}, {currentUser.email}</p>
        </div>
        }
    </form>
  )
}

export default ReportForm