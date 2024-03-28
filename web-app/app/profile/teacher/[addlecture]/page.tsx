"use client"
import React, { useState } from 'react';
import { addLecture } from '@/actions/TeacherProfile';
export default function addLectureComponent({params}:any){
    const [title , setTitle] = useState("");
    const [link, setLink] = useState("");
    const [teacherId, setTeacherId] = useState("");

    const addLectureDetails = async ()=>{
      console.log(params.addlecture);
        await addLecture(title, link, teacherId, params.addlecture);
    }
    console.log(params.addlecture);
    
    return <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
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
      value={link}
      onChange={(e) => {
        setLink(e.target.value);
      }}
    />
    <input
      className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4"
      type="text"
      placeholder="Teacher ID"
      value={teacherId}
      onChange={(e) => {
        setTeacherId(e.target.value);
      }}
    />
    <button
      className="bg-blue-500 text-white border border-blue-500 rounded-md px-4 py-2"
      onClick={() => {
        addLectureDetails();
      }}
    >
      Add Lecture
    </button>
  </div>
  
}