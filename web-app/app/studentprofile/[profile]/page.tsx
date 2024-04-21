"use client"
import React, { useEffect, useState } from 'react';
import { getScheduledLectures, getStudentDetails } from '@/actions/Student';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';
import ProgressBar from '@/app/components/ProgressBar';
import UpcomingEvents from '@/app/components/UpcomingEvents';
import Image from 'next/image';
import FAQ from '@/app/components/FAQs';
import TestiMonials from '@/app/components/TestimonialSlider';
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
    }, []);

    return (
        <div>
            <ProgressBar/>
            <UpcomingEvents/>

<div className=" flex flex-col items-center justify-center bg-gradient-to-tl from-gray-900 via-gray-700 to-gray-500">
    {studentInfo ? (
        <div className="w-full max-w-5xl p-10 rounded-xl shadow-2xl bg-gray-200 text-center animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQOGYkY8Di_0o3r5GeoBdOyHGHiVnAby59io_gmBtq4BFN0KXBSSD0FKFfbaWHnwlUIks&usqp=CAU" alt="School Logo" className="h-16 w-16 rounded-full border-2 border-teal-500"/> */}
                <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQOGYkY8Di_0o3r5GeoBdOyHGHiVnAby59io_gmBtq4BFN0KXBSSD0FKFfbaWHnwlUIks&usqp=CAU"
                    alt='School Logo'
                    height={200}
                    width={300}
                    className='h-16 w-16 rounded-full border-2 border-teal-500'
                />
                <h2 className="text-4xl font-extrabold text-gray-900">Username: {studentInfo.username}</h2>
                {/* <img src="../love-icon.png" alt="Profile" className="h-16 w-16 rounded-full border-2 border-teal-500"/> */}
                <Image
                    src="/love-icon.png"
                    alt='Profile'
                    height={200}
                    width={300}
                    className='h-16 w-16 rounded-full border-2 border-teal-500'
                />
            </div>
            <p className="text-2xl text-gray-800">Email: {studentInfo.email}</p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
                <button className="bg-teal-500 hover:bg-teal-700 text-white text-xl px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => {
                    router.push(`/profile/student/yourcourses/${id}`);
                }}>Your Courses</button>
                <button className="bg-teal-500 hover:bg-teal-700 text-white text-xl px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => {
                    router.push('/profile/student/allcourses');
                }}>Browse Courses</button>
                <button className="bg-teal-500 hover:bg-teal-700 text-white text-xl px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => {
                    router.push(`/studentprofile/scheduledlectures/${id}`);
                }}>View Scheduled Lectures</button>
            </div>
        </div>
    ) : (
        <Loader/>
    )}
</div>
{/* <FAQ/>
<TestiMonials/> */}
</div>


);
}
