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
}

const Subject: React.FC<SubjectProps> = ({ title, description, subjectid, isStudent }) => {
    const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/2">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-lg text-gray-600 mb-4">{description}</p>
        {!isStudent && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md border border-blue-500">
          <Link href={`/profile/teacher/addlecture/${subjectid}`}>Add Lecture</Link>
        </button>
        )}
      </div>
    </div>
  );
};

export default Subject;