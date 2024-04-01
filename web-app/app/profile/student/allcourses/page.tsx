"use client"
import getAllCourses from "@/actions/AllCourses";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface subject {
    id: string;
    title: string;
    description: string;
    teacherid: string;
    createdAt: Date; 
    teacher:{
        firstname: string;
        lastname: string;
    }
    teacherName: string;
}

export default function AllCourses(){
    const [subjects , setSubjects] = useState<subject[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(()=>{
        async function getSubjects() {
            try {
                const subject = await getAllCourses();
                if(subject){
                    setSubjects(subject)
                    console.log(subject);
                    
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getSubjects();
    },[])
    const filteredSubjects = subjects.filter(subject =>
        subject.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div >
             <input
                type="text"
                placeholder="Search by subject title"
                value={searchQuery}
                className="text-black ml-96 p-4 rounded-xl"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredSubjects.map((subject) => (
                <Subject key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} teacherName={subject.teacherName} />
            ))}
        </div>
    );
}


interface SubjectProps {
    title: string;
    description: string;
    subjectid:string;
    teacherName:string;
  }
  
  const Subject: React.FC<SubjectProps> = ({ title, description, subjectid, teacherName }) => {
    const router = useRouter();
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-1/2">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-lg text-gray-600 mb-4">{description}</p>
          <p className="text-lg text-gray-600 mb-4">by: {teacherName}</p>
            <button className='bg-blue-200 p-4 hover:bg-blue-300 hover:scale-110 rounded-xl text-black font-medium' onClick={()=>{
              router.push(`/profile/student/register/${subjectid}`)
            }}>Register</button>  
        </div>
      </div>
    );
  };