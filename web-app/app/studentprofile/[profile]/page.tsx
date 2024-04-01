"use client"
import React, { useEffect, useState } from 'react';
import { getStudentDetails } from '@/actions/Student';
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
            router.push('/profile/student/allcourses');
        }}>Browse Courses</button>

      </div>
    );
}
