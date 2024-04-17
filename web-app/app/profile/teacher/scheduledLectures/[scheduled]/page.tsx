"use client"
import { ScheduledLectures } from "@/actions/TeacherProfile";
import React, { useEffect, useState } from "react";

export default function Lecture({params}:any){
    //console.log(params.scheduled);
    
    const [lectures , setLectures] = useState<any>([]);
    useEffect(()=>{
        async function getLectures(){
            const scheduledLectures = await ScheduledLectures(params.scheduled)
            setLectures(scheduledLectures);
        }
        getLectures()
    },[])
    return (
<div className="min-h-screen bg-gray-100 p-8">
  <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">All Lectures</h1>
  <div className="container mx-auto">
    <ul className="space-y-6">
      {lectures.map((lecture: any) => (
        <li key={lecture.id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">{lecture.title}</h3>
          <p className="text-md text-gray-700">Date: {lecture.date}</p>
          <p className="text-md text-gray-700">Time: {lecture.time}</p>
          <p className="text-md text-blue-600 hover:text-blue-700">Link: <a href={lecture.link} target="_blank" rel="noopener noreferrer">{lecture.link}</a></p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">Take class</button>
        </li>
      ))}
    </ul>
  </div>
</div>

    );
}