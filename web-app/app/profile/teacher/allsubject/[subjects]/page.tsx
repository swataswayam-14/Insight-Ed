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
    <div>
      {subjects.map((subject) => (
        <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} isStudent={false} />
      ))}
    </div>
    );
}