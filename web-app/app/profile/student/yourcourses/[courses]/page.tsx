"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//import Subject from '@/app/components/SubjectComponent';
import { YourCourses } from '@/actions/Student';

interface SubjectData {
    id: string;
    title: string;
    description: string;
}

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
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/2">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-lg text-gray-600 mb-4">{description}</p>
          {(yourCourses)&& (
            <button className='bg-blue-200 p-4 hover:bg-blue-300 hover:scale-110 rounded-xl text-black font-medium' onClick={()=>{
                router.push(`/profile/student/lectures/${subjectid}`)
            }}>View Lectures</button>  
          )}
        </div>
      </div>
    );
  };
  




export default function ResgisteredSubject({params}:any) {
    //const {studentid}:any = useParams()
    console.log(params.courses);
    
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    useEffect(()=>{
        async function getSubjects() {
            const ResgisteredSubject = await YourCourses(params.courses);
            setSubjects(ResgisteredSubject);
        }
        getSubjects();
    },[])

  return (
    <div>
      {subjects.map((subject) => (
        <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} isStudent={true} yourCourses={true}/>
      ))}
    </div>
  );
};

