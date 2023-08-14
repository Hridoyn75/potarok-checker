"use client"
import Button from '@/components/button'
import RenderReports from '@/components/render-reports'
import { AuthContext } from '@/context/authContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

const Dashboard = () => {
    const { currentUser, handleUserUpdate } = useContext(AuthContext)
    const [editMode, setEditMode] = useState(false);
    const [Err, setErr] = useState(null);
    const [Message, setMessage] = useState(null);
    
    const [inputs, setinputs] = useState(currentUser);
    const [selectedImage, setSelectedImage] = useState(null);
    const [disableForm, setDisableForm] = useState(false);


    const handleChange = (e) =>{
      setinputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleImageUpload = async (event) =>{
      setDisableForm(true);
      const userImage = event.target.files[0];

      const formData = new FormData();
      formData.append('image', userImage);
      formData.append('key', 'ff284a93af21e2591813f203c095e14c'); // Replace with your actual API key
      
      try {
        const response = await axios.post('https://api.imgbb.com/1/upload', formData);
        setSelectedImage(response.data.data.url);
        setinputs(prev => ({...prev, "photo": response.data.data.url}));
        setDisableForm(false);
      } catch (error) {
        console.log('Error uploading image:', error);
        setDisableForm(false);
      }
    }

    const handleUpdate = async (e) => {
      e.preventDefault();
      const response = await handleUserUpdate(inputs);
      if (response.success){
        setMessage(response.message);
        setEditMode(false);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }else{
        setErr(response.message);
        setTimeout(() => {
          setErr(null);
        }, 3000);
      }
    };




  return (
    <>
    {!currentUser ?
      <div className=' h-screen flex items-center'>
        <Link href="/auth/login" className=' text-xl bg-yellow-500 py-2 px-4 rounded'>Login Required! Click me</Link>
      </div>
    :
    <div className=' w-full min-h-screen pt-5 px-2 bg-[#FFDFCD] flex justify-center items-center'> 
    <div className=" bg-white w-[1000px] max-w-full p-3 min-h-[70%] block border-2 border-blue-950 border-r-8 border-b-8 rounded-lg gap-5 md:flex">
      <div className=' min-w-[300px] pt-20 mb-3 md:mb-0'>
        <div className=" bg-red-200 p-3 rounded">
        <form onSubmit={(e) => handleUpdate(e)}>
        { !editMode ?
          <Image 
          src={selectedImage || currentUser.photo || "/assets/profile.png"}
          width={150}
          height={150}
          alt='profile image'
          className=' aspect-square object-cover rounded-full mx-auto mb-5 border-2 border-black' />
        :
        <>
          <input onChange={handleImageUpload} id='profile-pic' type='file' style={{"display":"none"}}  />
          
          <label
          htmlFor="profile-pic">
            <Image 
            accept="image/*"
            src={ selectedImage || "/assets/upload.png"}
            width={150}
            height={150}
            alt='upload image'
            className=' aspect-square object-cover cursor-pointer rounded-full mx-auto  border-2 border-black' />
          </label><br />
          { disableForm && <p className=' text-center pb-1'>Uploading...</p>}
        </>  
        }

          { true && 
          <input 
          disabled={ disableForm }
          className=' bg-slate-600 py-1 px-2 text-center rounded focus:outline-none my-2' 
          type='text' 
          name='bio' 
          onChange={handleChange} 
          readOnly={editMode ? false : true } 
          placeholder={editMode ? "Enter new bio" : "Bio: " + currentUser.bio}/>
          }

          <br/>
          
          { currentUser.name &&
           <input 
           disabled={ disableForm }
           readOnly={editMode ? false : true }  
           className={` ${ editMode && " border-2 border-green-700"} bg-transparent placeholder:text-black py-1 px-2 rounded focus:outline-none mt-2`} 
           type='text' 
           name='name' 
           onChange={handleChange} 
           placeholder={editMode ? "Enter new name" : currentUser.name}/>
           }

           <br/>
          <input 
          disabled={ disableForm }
          readOnly={editMode ? false : true }  
          className={` ${ editMode && " border-2 border-green-700"} bg-transparent placeholder:text-black py-1 px-2 rounded focus:outline-none my-2`} 
          type='text' 
          name='username' 
          onChange={handleChange} 
          placeholder={editMode ? "Enter new username" : "@" + currentUser.username}/><br/>


          { editMode && 
          <>
          <input 
          disabled={ disableForm }
          className={` border-2 border-green-700 bg-transparent placeholder:text-black py-1 px-2 rounded focus:outline-none my-2`} 
          type='text' 
          name='facebookID' 
          onChange={handleChange} 
          placeholder="Enter your facebook link"/>
          <br/>
          </>
          }
          
          { editMode && 
          <>
          <input 
          disabled={ disableForm }
          className={` border-2 border-green-700 bg-transparent placeholder:text-black py-1 px-2 rounded focus:outline-none my-2`} 
          type='text' 
          name='websiteURL' 
          onChange={handleChange} 
          placeholder="Enter your website link"/>
          <br/>
          </>
          }

          
          <p className=' px-2'>{ currentUser.email }</p>
          <div className="text-center">
          {Err && <p className=' text-red-600'>{Err}</p>}
          {Message && <p className=' text-green-600'>{Message}</p>}
            {
              editMode ?
              <div className=' flex gap-2 justify-center'>
              <Button text='Update' disabled={ disableForm } bg="green" type='submit' />
              <Button text='Cancel' bg='red' whenclick={()=> setEditMode(false)} />
              </div>
            :
            <Button text="Update Profile" whenclick={()=> setEditMode(true)} />
            }
          </div>
          </form>

        </div>
        <div className=' mt-6'>
          <p>Social Connections</p>
          <div className="flex pt-2">
            <a href='https://www.facebook.com/' target='_blank'>
              <Image 
              className='border-2 rounded-full hover:border-green-600'
              src='/assets/facebook.png'
              alt='facebook'
              width={50}
              height={50} />
            </a>
          </div>

        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h1 className=' text-2xl pt-3 pb-1 border-b-2 border-cyan-600 w-fit'>Your Reports</h1>
          <Button bg="green" text="New Report" url='/report/create' />
        </div>
        <RenderReports type='self' />
      </div>
    </div>
    </div> }

    </>


  )
}

export default Dashboard