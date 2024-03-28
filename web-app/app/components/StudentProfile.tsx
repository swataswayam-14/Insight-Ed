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
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center max-w-md mx-auto mt-40">
        {studentInfo ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Username: {studentInfo.username}</h2>
            <p className="text-lg text-gray-600">Email: {studentInfo.email}</p>
          </div>
        ) : (
          <p className="text-lg text-gray-600">Loading student info...</p>
        )}
        <button className="bg-white hover:text-lg hover:bg-blue-200 text-black p-4 border border-emerald-300 rounded-md mt-4 mr-2" onClick={() => {
          router.push(`/profile/student/yourcourses/${id}`);
        }}>Your Courses</button>
        <button className="bg-white hover:text-lg hover:bg-blue-200 text-black p-4 border border-emerald-300 rounded-md mt-4" onClick={() => {
          router.push('/profile/student/register');
        }}>Register for a Course</button>
      </div>
    );
}

export default StudentProfileComponent;