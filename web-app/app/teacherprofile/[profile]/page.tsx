"use client"
import React, { useEffect, useState } from 'react';
import { TeacherProfile, TotalLectures, TotalStudents, TotalSubject } from '@/actions/TeacherProfile';
import { useRouter } from 'next/navigation';
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

        fetchTeacherInfo();
    }, []);

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
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center max-w-md mx-auto mt-40">
        {teacherInfo ? (
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Username: {teacherInfo.username}</h2>
                <p className="text-lg text-gray-600">Email: {teacherInfo.email}</p>
                <p className="text-lg text-gray-600">Total Students Enrolled: {totalStudents.length}</p>
                <p className="text-lg text-gray-600">Total Subjects Launched: {totalSubject.length}</p>
                <p className="text-lg text-gray-600">Total Lectures Taken: {totalLecture.length}</p>
            </div>
        ) : (
            <p className="text-lg text-gray-600">Loading teacher info...</p>
        )}
            <button className="bg-blue-500 hover:text-lg hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4 mr-2" onClick={() => {
                Router.push(`/profile/teacher/addsubject/${teacherInfo?.id}`);
            }}>Add Subject</button>
            <button className="bg-green-500 hover:text-lg hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4" onClick={() => {
                Router.push(`/profile/teacher/allsubject/${teacherInfo?.id}`)
            }}>Analyse For a Subject</button>
        </div>
    );
}