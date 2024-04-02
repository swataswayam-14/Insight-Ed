"use client"

import React, { useEffect, useState } from 'react';
import { addSubject } from '@/actions/TeacherProfile';
import { useRouter } from 'next/navigation';
export default function AddSubjectComponent({params}:any) {
    //console.log(params.subject);
    
    const Router = useRouter();
    const [title , setTitle] = useState("");
    const [description, setDescription] = useState("");


    const addSubjectDetails = async ()=>{
        await addSubject(title, description, params.subject);
        Router.push(`/profile/teacher/allsubject/${params.subject}`);
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        
        <input
          className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="bg-blue-500 text-white border border-blue-500 rounded-md px-4 py-2" onClick={addSubjectDetails}>
          Add Details
        </button>
      </div>
    );
}

