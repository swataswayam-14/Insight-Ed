"use client"
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { addUploadLink } from '@/actions/Teacher';
import Loader from '@/app/components/Loader';
export default function AddLink({params}:any){
    const router = useRouter();
    const [uploadLink , setUploadLink] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [loader , setLoader] = useState(false);

    if(loader){
        return <Loader/>
    }
    
    return <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
   
   
   <input
  className="bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md shadow-sm px-4 py-2 mb-4 w-1/4 transition duration-300 ease-in-out transform focus:scale-105"
  type="text"
  placeholder="Enter the g-drive link of lecture"
  value={uploadLink}
  onChange={(e) => {
    setUploadLink(e.target.value)
  }}
/>
<input
  className="bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md shadow-sm px-4 py-2 mb-4 w-1/4 transition duration-300 ease-in-out transform focus:scale-105"
  type="text"
  placeholder="Enter your email"
  value={teacherEmail}
  onChange={(e) => {
    setTeacherEmail(e.target.value)
  }}
/>

    <button
      className="bg-blue-500 text-white border border-blue-500 rounded-md px-4 py-2"
      onClick={async() => {
        setLoader(true)
        const res = await addUploadLink(params.id, uploadLink, teacherEmail)
        if(res != null){
            setLoader(false);
            router.push(`/teacherprofile/${res}`)
        }
      }}
    >
      Add Uploaded Link
    </button>
  </div>
  
}