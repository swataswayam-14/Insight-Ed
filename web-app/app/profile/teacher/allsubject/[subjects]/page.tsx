"use client"
//import Subjects from "@/app/components/AllSubjectComponent";
// pages/Subjects.tsx
import React, { useEffect, useState } from 'react';
import Subject from '@/app/components/SubjectComponent';
import { TotalSubject } from '@/actions/TeacherProfile';
import Loader from '@/app/components/Loader';

interface SubjectData {
    id: string;
    title: string;
    description: string;
}
export default function subjects({params}:any){
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    const [loading , setLoading] = useState(false);
    console.log(params.subjects);
    
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      const response = await TotalSubject(params.subjects);
      setSubjects(response);
      setLoading(false);
    };

    fetchSubjects();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-bold mb-6 mt-4">All Lectures</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Subject
                key={subject.id}
                title={subject.title}
                description={subject.description}
                subjectid={subject.id}
                isStudent={false}
                yourCourses={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

{/* <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} isStudent={false} yourCourses={false} /> */}