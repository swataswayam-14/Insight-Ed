"use client"
import React, { useEffect, useState } from 'react';
import { ScheduledLectures, TeacherProfile, TotalLectures, TotalStudents, TotalSubject } from '@/actions/TeacherProfile';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';
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
        <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Username: {teacherInfo.username}</h2>
            <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500">Email: {teacherInfo.email}</p>
            <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500">Total Students Enrolled: {totalStudents.length}</p>
            <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500">Total Subjects Launched: {totalSubject.length}</p>
            <p className="text-xl border-2 border-blue-200 m-2 rounded-full inline-block px-4 py-2 hover:bg-blue-200 font-semibold text-gray-500">Total Lectures Taken: {totalLecture.length}</p>
            <div className="flex justify-center gap-4 mt-6">
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-md transition duration-300" onClick={() => {
                    Router.push(`/profile/teacher/addsubject/${teacherInfo?.id}`);
                }}>Add Subject</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-md transition duration-300" onClick={() => {
                    Router.push(`/profile/teacher/allsubject/${teacherInfo?.id}`)
                }}>Analyse For a Subject</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-md transition duration-300" onClick={() => {
                    Router.push(`/profile/teacher/scheduledLectures/${teacherInfo?.id}`)
                }}>Check your scheduled lectures</button>
            </div>
        </div>
    ) : (
        <Loader/>
    )}
</div>

    );
}