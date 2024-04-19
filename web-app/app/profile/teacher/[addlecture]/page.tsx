"use client"
import React, { useState } from 'react';
import { addLecture } from '@/actions/TeacherProfile';
import { useRouter } from 'next/navigation';
export default function addLectureComponent({params}:any){
    const Router = useRouter();
    const [title , setTitle] = useState("");
    const [link, setLink] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [date, setDate] = useState("");
    const [time , setTime] = useState("");
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5]?[0-9] [ap]m?$/i;
    const addLectureDetails = async ()=>{
      //console.log(params.addlecture);
        const teacherId = await addLecture(title, link, teacherEmail, params.addlecture, time, date);
        Router.push(`/teacherprofile/${teacherId}`);
    }

    function handleTimeChange(e:any){
      const inputTime = e.target.value;
      const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] [ap]m$/i;
      if (timePattern.test(inputTime) || inputTime === '') {
        setTime(inputTime);
      }
    }
    
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
      placeholder="Google Meet Link"
      value={link}
      onChange={(e) => {
        setLink(e.target.value);
      }}
    />
    <input
      className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4"
      type="text"
      placeholder="Enter your email"
      value={teacherEmail}
      onChange={(e) => {
        setTeacherEmail(e.target.value);
      }}
    />
    <input
      className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4"
      type="text"
      placeholder="Enter Date (dd/mm/yyyy)"
      value={date}
      onChange={(e)=>{
        setDate(e.target.value)
      }}
    />
    <input
      className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4"
      type="text"
      placeholder="Enter Time (HH:MM am/pm)"
      value={time}
      onChange={(e) => {
        setTime(e.target.value)
      }}
    />
    <button
      className="bg-blue-500 text-white border border-blue-500 rounded-md px-4 py-2"
      onClick={() => {
        addLectureDetails();
      }}
    >
      Schedule Lecture
    </button>
  </div>
  
}