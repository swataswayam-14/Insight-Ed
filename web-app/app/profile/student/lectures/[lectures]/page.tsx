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
    lectureid:string;
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
<div className="bg-gray-50 min-h-screen p-8">
    <div className="container mx-auto">
        {lectures.map((lecture) => (
            <Subject key={lecture.id} title={lecture.title} description={lecture.link} lectureid={lecture.id} isStudent={true} yourCourses={true}/> 
        ))}
    </div>
</div>

  );
};
{/* <Subject key={lecture.id} title={lecture.title} description={lecture.link} lectureid={lecture.id} isStudent={true} yourCourses={true}/> */}




const Subject: React.FC<SubjectProps> = ({ title, description, lectureid, isStudent, yourCourses }) => {
  const router = useRouter();
  return (
      <div className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Lecture Title: {title}</h3>
              <p className="text-gray-600 mb-4">Lecture Link: {description}</p>
              {yourCourses && (
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                      <button className='bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition ease-in-out duration-300' onClick={()=>{
                          router.push(`/profile/student/analyse/${lectureid}`)
                      }}>Search Concepts in Video</button>
                      <button className='bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition ease-in-out duration-300' onClick={()=>{
                          // Add your onClick event here
                      }}>Analyse Lecture</button>
                      <button className='bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg transition ease-in-out duration-300' onClick={()=>{
                          // Add your onClick event here
                      }}>Get Recommendation</button>
                      <button className='bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition ease-in-out duration-300' onClick={()=>{
                          router.push(`/profile/student/askdoubt/${lectureid}`)
                      }}>Ask Doubts</button>
                      <button className='bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition ease-in-out duration-300' onClick={()=>{
                          router.push(`/profile/student/askquestion/${lectureid}`)
                      }}>Ask Descriptive Questions</button>
                  </div>
              )}
          </div>
      </div>
  );
};
