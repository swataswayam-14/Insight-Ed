"use client"
import React, { useState } from 'react';
import { addLecture } from '@/actions/TeacherProfile';
import { useRouter } from 'next/router';


const AddLectureComponent: React.FC = (id) => {

    const [title , setTitle] = useState("");
    const [link, setLink] = useState("");
    const [teacherId, setTeacherId] = useState("");

    const addLectureDetails = async ()=>{
      console.log(id);
      
        //await addLecture(title, link, teacherId, id);
    }

    return <div>
    <input
      className='text-black'
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e)=>{
        setTitle(e.target.value);
      }}
    />
    <input
      className='text-black'
      type="text"
      placeholder="Description"
      value={link}
      onChange={(e)=>{
        setLink(e.target.value);
      }}
    />
    <input
      className='text-black'
      type="text"
      placeholder="Teacher ID"
      value={teacherId}
      onChange={(e)=>{
        setTeacherId(e.target.value);
      }}
    />
    <button className='bg-white text-black border-gray-200 border-b-2' onClick={()=>{
        addLectureDetails();
    }}>Add Lecture</button>
  </div>

}

export default AddLectureComponent;
