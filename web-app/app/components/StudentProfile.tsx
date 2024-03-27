"use client"
import React, { useEffect, useState } from 'react';
import { getStudentDetails } from '@/actions/Student';
import { useRouter } from 'next/navigation';
const StudentProfileComponent: React.FC = () => {
    const [studentInfo, setStudentInfo] = useState<{ username: string, email: string } | undefined>(undefined);
    const [id , setId] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const info = await getStudentDetails('701bce9c-8e9d-4e20-a5fe-a5535fc2c52e');
                if (info) {
                    const { username, email, id } = info;
                    setStudentInfo({ username, email });
                    setId(id);
                } else {
                    console.log('Student not found');
                }
            } catch (error) {
                console.error('Error fetching Student info:', error);
            }
        };

        fetchStudentInfo();
    }, []);

    return (
        <div>
            {studentInfo ? (
                <div>
                    <h2>Username: {studentInfo.username}</h2>
                    <p>Email: {studentInfo.email}</p>
                </div>
            ) : (
                <p>Loading student info...</p>
            )}
            <button className='bg-white text-black p-4 border-emerald-300 border-2' onClick={()=>{
                router.push(`/profile/student/yourcourses/${id}`)
            }}>Your Courses</button>
            <button className='bg-white text-black p-4 border-emerald-300 border-2' onClick={()=>{
                router.push('/profile/student/register')
            }}>Register for a Course</button>
        </div>
    );
}

export default StudentProfileComponent;