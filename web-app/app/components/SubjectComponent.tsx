// components/Subject.tsx
"use client"
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

    const handleAddLectures = () => {
        router.push(`/profile/teacher/addlecture/${subjectid}`);
    };
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      {!isStudent && <button className='bg-white text-black p-10 border-2'  onClick={handleAddLectures}>Add Lectures</button>}
    </div>
  );
};

export default Subject;