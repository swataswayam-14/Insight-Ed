"use client"
//import Subjects from "@/app/components/AllSubjectComponent";
// pages/Subjects.tsx
import React, { useEffect, useState } from 'react';
import Subject from '@/app/components/SubjectComponent';
import { TotalSubject } from '@/actions/TeacherProfile';

interface SubjectData {
    id: string;
    title: string;
    description: string;
}
export default function subjects({params}:any){
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    console.log(params.subjects);
    
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await TotalSubject(params.subjects);
      setSubjects(response);
    };

    fetchSubjects();
  }, []);

  return (
<div className="min-h-screen bg-gray-200">
  <div className="container mx-auto py-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} isStudent={false} yourCourses={false} />
      ))}
    </div>
  </div>
</div>

    );
}

{/* <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} isStudent={false} yourCourses={false} /> */}