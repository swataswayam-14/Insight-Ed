"use client"
import React, { useState, useEffect } from 'react';
import { getScheduledLectures } from '@/actions/Student';

export default function Scheduled({params}:any){
    const [scheduledLectures, setScheduledLectures] = useState<any>([]);
    //console.log(params.scheduled);
    
    useEffect(() => {
      const fetchScheduledLectures = async () => {
        try {
          const lectures:any = await getScheduledLectures(params.scheduled);
          setScheduledLectures(lectures);
        } catch (error) {
          console.error('Error fetching scheduled lectures:', error);
        }
      };
  
      fetchScheduledLectures();
    }, []);
  
    return (
        <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Scheduled Lectures</h2>
        <ul className='bg-gray-500'>
            {scheduledLectures.map((lecture:any) => (
            <div className="border-b border-gray-200 py-4">
                <li key={lecture.id} className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-semibold">{lecture.title}</p>
                        <p className="text-white">{lecture.date}</p>
                        <p className="text-gray-600">By: {lecture.teacher.firstname} {lecture.teacher.lastname}</p>
                        <p className='text-gray-800'>{lecture.time}</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Join Class</button>
                </li>
            </div>
            ))}
        </ul>
    </div>
    );
}