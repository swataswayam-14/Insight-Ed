"use client"
import React, { useEffect, useState } from 'react';
import { getScheduledLectures, getStudentDetails } from '@/actions/Student';
import { useRouter } from 'next/navigation';
export default function StudentProfileComp({params}:any) {
    const [studentInfo, setStudentInfo] = useState<{ username: string, email: string, id:string } | undefined>(undefined);
    const [id , setId] = useState("");
    const router = useRouter();
    //console.log(params.profile);
    

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const info = await getStudentDetails(params.profile);
                if (info) {
                    const { username, email, id } = info;
                    setStudentInfo({ username, email, id });
                    setId(id);
                } else {
                    console.log('Student not found');
                }
            } catch (error) {
                console.error('Error fetching Student info:', error);
            }
        };
        const getScheduledlecture = async ()=>{
          try {
            const lectures = await getScheduledLectures(params.profile)
            if(lectures.length != 0){
              //alert(`You have ${lectures.length} lectures for today`)
            }
          } catch (error) {
            console.log(error);
          }
        }
        fetchStudentInfo();
        getScheduledlecture();
    }, [params.profile]);

    return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-green-300 via-green-200 to-green-100">
    {studentInfo ? (
        <div className="w-full max-w-6xl p-10 rounded-xl shadow-2xl bg-white text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Username: {studentInfo.username}</h2>
            <p className="text-2xl text-gray-800">Email: {studentInfo.email}</p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
                <button className="bg-teal-500 hover:bg-teal-600 text-white text-xl px-8 py-3 rounded-lg shadow-md transition duration-300" onClick={() => {
                    router.push(`/profile/student/yourcourses/${id}`);
                }}>Your Courses</button>
                <button className="bg-teal-500 hover:bg-teal-600 text-white text-xl px-8 py-3 rounded-lg shadow-md transition duration-300" onClick={() => {
                    router.push('/profile/student/allcourses');
                }}>Browse Courses</button>
                <button className="bg-teal-500 hover:bg-teal-600 text-white text-xl px-8 py-3 rounded-lg shadow-md transition duration-300" onClick={() => {
                    router.push(`/studentprofile/scheduledlectures/${id}`);
                }}>View Scheduled Lectures</button>
            </div>
        </div>
    ) : (
        <p className="text-2xl text-gray-800">Loading student info...</p>
    )}
</div>

);
}
