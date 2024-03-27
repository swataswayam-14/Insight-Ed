// pages/Subjects.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Subject from './SubjectComponent';
import { YourCourses } from '@/actions/Student';
import { useParams } from 'next/navigation';

interface SubjectData {
    id: string;
    title: string;
    description: string;
}

const RegisteredCourses = () => {
    const {studentid}:any = useParams()
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    useEffect(()=>{
        async function getSubjects() {
            const ResgisteredSubject = await YourCourses('701bce9c-8e9d-4e20-a5fe-a5535fc2c52e');
            setSubjects(ResgisteredSubject);
        }
        getSubjects();
    },[])

  return (
    <div>
      {subjects.map((subject) => (
        <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} isStudent={true} />
      ))}
    </div>
  );
};

export default RegisteredCourses;