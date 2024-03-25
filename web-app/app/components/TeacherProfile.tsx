"use client"
import React, { useEffect, useState } from 'react';
import { TeacherProfile, TotalLectures, TotalStudents, TotalSubject } from '@/actions/TeacherProfile';

const TeacherProfileComponent: React.FC = () => {
    const [teacherInfo, setTeacherInfo] = useState<{ username: string, email: string } | undefined>(undefined);
    const [totalStudents , setTotalStudents] = useState([]);
    const [totalSubject , setTotalSubject] = useState([]);
    const [totalLecture , setTotalLecture] = useState([]);

    useEffect(() => {
        const fetchTeacherInfo = async () => {
            try {
                const info = await TeacherProfile('874c5bbc-843d-49c6-b736-eea58c381aab', 'aasdadfasfadad');
                if (info) {
                    const { username, email } = info;
                    setTeacherInfo({ username, email });
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
                const students:any = await TotalStudents('874c5bbc-843d-49c6-b736-eea58c381aab');
                if(students){
                    setTotalStudents(students);
                }
                const subjects:any = await TotalSubject('874c5bbc-843d-49c6-b736-eea58c381aab');
                if(subjects){
                    setTotalSubject(subjects);
                }
                const lectures:any = await TotalLectures('874c5bbc-843d-49c6-b736-eea58c381aab');
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
        <div>
            {teacherInfo ? (
                <div>
                    <h2>Username: {teacherInfo.username}</h2>
                    <p>Email: {teacherInfo.email}</p>
                    <p>Total Students Enrolled: {totalStudents.length}</p>
                    <p>Total Subjects launched: {totalSubject.length}</p>
                    <p>Total Lectures Taken: {totalLecture.length}</p>
                </div>
            ) : (
                <p>Loading teacher info...</p>
            )}
            <button onClick={()=>{

            }}>Add Subject</button>
            <button>Analyse For a subject</button>
        </div>
    );
}

export default TeacherProfileComponent;