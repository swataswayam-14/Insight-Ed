"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//import Subject from '@/app/components/SubjectComponent';
import { YourCourses } from '@/actions/Student';
import getAllLectures from '@/actions/TeacherProfile';

interface SubjectData {
    id: string;
    title: string;
    link:string;
}

interface SubjectProps {
    title: string;
    description: string;
    subjectid:string;
    isStudent:boolean;
    yourCourses:boolean;
  }
  


export default function AllLectures({params}:any) {
    //const {studentid}:any = useParams()
    console.log(params.lectures);
    
    const [lectures, setLectures] = useState<SubjectData[]>([]);
    useEffect(()=>{
        async function getSubjects() {
            const allLectures = await getAllLectures(params.lectures);
            setLectures(allLectures);
        }
        getSubjects();
    },[])

  return (
    <div>
      {lectures.map((lecture) => (
        <Subject key={lecture.id} title={lecture.title} description={lecture.link} subjectid={lecture.id} isStudent={true} yourCourses={true}/>
      ))}
    </div>
  );
};




const Subject: React.FC<SubjectProps> = ({ title, description, subjectid, isStudent, yourCourses }) => {
    const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/2">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">lecture title: {title}</h3>
        <p className="text-lg text-gray-600 mb-4">lecture link: {description}</p>
        {(yourCourses)&& (
          <button className='bg-blue-200 p-4 hover:bg-blue-300 hover:scale-110 rounded-xl text-black font-medium' onClick={()=>{
          
          }}>Get personalised questions</button>  
        )}
      </div>
    </div>
  );
};
