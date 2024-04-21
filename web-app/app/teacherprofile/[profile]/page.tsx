"use client"
import React, { useEffect, useState } from 'react';
import { ScheduledLectures, TeacherProfile, TotalLectures, TotalStudents, TotalSubject } from '@/actions/TeacherProfile';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';
import TeacherAchievements from '@/app/components/TeacherAchievements';
import TeacherEvents from '@/app/components/TeacherEvents';
import TeacherTestimonials from '@/app/components/TeacherTestimonials';
import Image from 'next/image';
export default function TeacherProfileComp({params}:any){
    //console.log(params.profile);
    
    const [teacherInfo, setTeacherInfo] = useState<{ username: string, email: string, id:string } | undefined>(undefined);
    const [totalStudents , setTotalStudents] = useState([]);
    const [totalSubject , setTotalSubject] = useState([]);
    const [totalLecture , setTotalLecture] = useState([]);
    const Router = useRouter();

    useEffect(() => {
        const fetchTeacherInfo = async () => {
            try {
                const info = await TeacherProfile(params.profile);
                if (info) {
                    const { username, email, id } = info;
                    setTeacherInfo({ username, email, id });
                } else {
                    console.log('Teacher not found');
                }
            } catch (error) {
                console.error('Error fetching teacher info:', error);
            }
        };
        const checkScheduledLectures = async ()=>{
            try {
                const lectures = await ScheduledLectures(params.profile)
                if(lectures.length != 0){
                    //alert(`You have ${lectures.length} lectures scheduled today`)
                }
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchTeacherInfo();
        checkScheduledLectures();
    }, [params.profile]);

    useEffect(()=>{
        const fetchTotalInfo = async ()=>{
            try {
                const students:any = await TotalStudents(params.profile);
                if(students){
                    setTotalStudents(students);
                }
                const subjects:any = await TotalSubject(params.profile);
                if(subjects){
                    setTotalSubject(subjects);
                }
                const lectures:any = await TotalLectures(params.profile);
                if(lectures){
                    setTotalLecture(lectures);
                }
            } catch (error) {
                console.error('Error fetching total students info:', error);
            }
        }
        fetchTotalInfo()
    },[])

    return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
    {teacherInfo ? (
        <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white text-center transform transition duration-500 hover:scale-105">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQOGYkY8Di_0o3r5GeoBdOyHGHiVnAby59io_gmBtq4BFN0KXBSSD0FKFfbaWHnwlUIks&usqp=CAU" alt="Teacher's Avatar" className="w-32 h-32 rounded-full mx-auto mb-4"/> */}
            <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQOGYkY8Di_0o3r5GeoBdOyHGHiVnAby59io_gmBtq4BFN0KXBSSD0FKFfbaWHnwlUIks&usqp=CAU"
                alt="Teacher's Avatar"
                height={200}
                width={300}
                className='w-32 h-32 rounded-full mx-auto mb-4'
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Username: {teacherInfo.username}</h2>
            <div className="grid grid-cols-2 gap-4">
                <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500 transition duration-300 ease-in-out">Email: {teacherInfo.email}</p>
                <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500 transition duration-300 ease-in-out">Total Students Enrolled: {totalStudents.length}</p>
                <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500 transition duration-300 ease-in-out">Total Subjects Launched: {totalSubject.length}</p>
                <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500 transition duration-300 ease-in-out">Total Lectures Taken: {totalLecture.length}</p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-md transition duration-300 ease-in-out hover:shadow-xl" onClick={() => {
                    Router.push(`/profile/teacher/addsubject/${teacherInfo?.id}`);
                }}>Add Subject</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-md transition duration-300 ease-in-out hover:shadow-xl" onClick={() => {
                    Router.push(`/profile/teacher/allsubject/${teacherInfo?.id}`)
                }}>Analyse For a Subject</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-md transition duration-300 ease-in-out hover:shadow-xl" onClick={() => {
                    Router.push(`/profile/teacher/scheduledLectures/${teacherInfo?.id}`)
                }}>Check your scheduled lectures</button>
            </div>
            <div className="flex flex-wrap justify-around items-start mt-8">
            <div className="w-full md:w-1/3 p-4">
                <TeacherAchievements/>
            </div>
            <div className="w-full md:w-1/3 p-4">
                <TeacherEvents/>
            </div>
            <div className="w-full md:w-1/3 p-4">
                <TeacherTestimonials/>
            </div>
            </div>
        </div>
    ) : (
        <Loader/>
    )}
</div>


    );
}