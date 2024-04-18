"use client"
import getAllCourses from "@/actions/AllCourses";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
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
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        async function getSubjects() {
            try {
                setLoading(true);
                const subject = await getAllCourses();
                if(subject){
                    setSubjects(subject)
                    //console.log(subject);
                    setLoading(false)
                }
            } catch (error) {
                setLoading(true);
                console.log(error);
                
            }
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
        <div className="min-h-screen bg-gray-50">
    <input
        type="text"
        placeholder="Search by subject title"
        value={searchQuery}
        className="w-full p-4 text-gray-700 bg-white border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        onChange={(e) => setSearchQuery(e.target.value)}
    />
    <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="py-8">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {filteredSubjects.map((subject) => (
                    <Subject  key={subject.id} title={subject.title} description={subject.description} subjectid={subject.id} teacherName={subject.teacherName} /> 
                ))}
            </div>
        </div>
    </div>
</div>

    );
}
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
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
            <article className="overflow-hidden rounded-lg shadow-lg ">
                <div className="bg-white p-4 hover:bg-purple-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <p className="text-gray-600 mb-4">by: {teacherName}</p>
                    <button className='bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105' onClick={()=>{
                        router.push(`/profile/student/register/${subjectid}`)
                    }}>Register</button>
                </div>
            </article>
        </div>
    );
};
