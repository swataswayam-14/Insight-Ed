// components/Subject.tsx
"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SubjectProps {
  title: string;
  description: string;
  subjectid:string;
  isStudent:boolean;
  yourCourses:boolean;
}

const Subject: React.FC<SubjectProps> = ({ title, description, subjectid, isStudent, yourCourses }) => {
  const router = useRouter();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-md text-gray-600 mb-4">{description}</p>
      {!isStudent && (
        <div className="flex flex-col sm:flex-row sm:justify-between mt-4">
          <button className="bg-blue-500 text-white px-2 py-2 mr-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 mb-2 sm:mb-0">
            <Link href={`/profile/teacher/${subjectid}`}>Add Lecture</Link>
          </button>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110' onClick={()=>{
              router.push(`/profile/teacher/alllecture/${subjectid}`)
          }}>View All Lectures</button>
        </div>
      )}
      {isStudent && (
        <button className='bg-blue-200 text-black px-4 py-2 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110' onClick={()=>{
          router.push(`/profile/teacher/allstudents/${subjectid}`)
        }}>View All Students</button>  
      )}
    </div>
  );
};


export default Subject;