"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//import Subject from '@/app/components/SubjectComponent';
import { YourCourses } from '@/actions/Student';
import Loader from '@/app/components/Loader';

interface SubjectData {
    id: string;
    title: string;
    description: string;
}

interface SubjectProps {
    title: string;
    description: string;
    subjectid:string;
}
  




const Subject: React.FC<SubjectProps> = ({ title, description, subjectid }) => {
  const router = useRouter();
  return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <button className='bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105' onClick={()=>{
                  router.push(`/profile/student/lectures/${subjectid}`)
              }}>View Lectures</button>
          </div>
      </div>
  );
};

  




export default function ResgisteredSubject({params}:any) {
    //const {studentid}:any = useParams()
    console.log(params.courses);
    const [searchQuery, setSearchQuery] = useState("");
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        async function getSubjects() {
            setLoading(true);
            const ResgisteredSubject = await YourCourses(params.courses);
            setSubjects(ResgisteredSubject);
            setLoading(false);
        }
        getSubjects();
    },[])
    const filteredSubjects = subjects.filter(subject =>
      subject.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if(loading){
        return <Loader/>
    }else{
  return (
<div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 p-8">
    <div className="container mx-auto">
        <input
            type="text"
            placeholder="Search by subject title"
            value={searchQuery}
            className="w-full mb-6 p-4 text-gray-700 bg-white rounded-xl shadow border-0 focus:ring-2 focus:ring-purple-300"
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
                 <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} />
            ))}
        </div>
    </div>
</div>

  );
}
};




