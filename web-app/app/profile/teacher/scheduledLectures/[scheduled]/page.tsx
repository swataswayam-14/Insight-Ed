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
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">All Lectures</h1>
            <ul>
                {lectures.map((lecture: any) => (
                    <div key={lecture.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <li>
                            <h3 className="text-xl font-semibold mb-2 text-black">{lecture.title}</h3>
                            <p className="text-gray-600">Date: {lecture.date}</p>
                            <p className="text-gray-600">Time: {lecture.time}</p>
                            <p className="text-blue-500">Link: <a href={lecture.link} target="_blank" rel="noopener noreferrer">{lecture.link}</a></p>
                        </li>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Take class</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}