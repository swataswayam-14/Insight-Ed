"use client"

import React, { useEffect, useState } from 'react';
import { addSubject } from '@/actions/TeacherProfile';

const AddSubjectComponent: React.FC = () => {
    const [title , setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teacherId, setTeacherId] = useState("");

    const addSubjectDetails = async ()=>{
        await addSubject(title, description, teacherId);
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
      value={description}
      onChange={(e)=>{
        setDescription(e.target.value);
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
        addSubjectDetails();
    }}>Add Details</button>
  </div>

}

export default AddSubjectComponent;
