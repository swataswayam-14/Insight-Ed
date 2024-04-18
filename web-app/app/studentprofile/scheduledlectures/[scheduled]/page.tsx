"use client"
import React, { useState, useEffect } from 'react';
import { getScheduledLectures } from '@/actions/Student';
import Loader from '@/app/components/Loader';

export default function Scheduled({params}:any){
    const [scheduledLectures, setScheduledLectures] = useState<any>([]);
    const [loading , setLoading] = useState(true);
    //console.log(params.scheduled);
    
    useEffect(() => {
      const fetchScheduledLectures = async () => {
        try {
          setLoading(true);
          const lectures:any = await getScheduledLectures(params.scheduled);
          setScheduledLectures(lectures);
          setLoading(false);
        } catch (error) {
          setLoading(true);
          console.error('Error fetching scheduled lectures:', error);
        }
      };
  
      fetchScheduledLectures();
    }, []);
    if(loading){
      return <Loader/>
    }
    else if(scheduledLectures.length == 0 && loading == false){
      return <div className="flex justify-center items-center h-screen">
      <p className="text-2xl text-gray-300">There are no lectures scheduled for today!</p>
    </div>
    }
    else{
    return (
<div className="p-4 bg-gradient-to-r from-purple-700 to-purple-200 rounded shadow-lg text-white">
    <h2 className="text-3xl font-bold mb-6">Scheduled Lectures</h2>
    <ul className='divide-y divide-gray-700'>
        {scheduledLectures.map((lecture:any) => (
        <li key={lecture.id} className="py-4 flex justify-between items-center">
            <div>
                <p className="text-xl font-semibold">{lecture.title}</p>
                <p className="text-purple-200">{lecture.date}</p>
                <p className="text-gray-400">By: {lecture.teacher.firstname} {lecture.teacher.lastname}</p>
                <p className='text-gray-300'>{lecture.time}</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">Join Class</button>
        </li>
        ))}
    </ul>
</div>

    );
  }
}