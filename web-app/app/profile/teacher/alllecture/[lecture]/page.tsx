"use client"

import { useEffect, useState } from "react";
import getAllLectures from "@/actions/TeacherProfile";
import Subject from "@/app/components/SubjectComponent";
import Loader from "@/app/components/Loader";
interface LectureData {
    id: string;
    title: string;
    link: string;
}
export default function allLectures({params}:any){
    //console.log(params.lecture);
    
    const [lectures, setLectures] = useState<LectureData[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        async function allLectures(){
            setLoading(true);
            const lectures = await getAllLectures(params.lecture); //subject id
            setLectures(lectures);
            setLoading(false);
        }
        allLectures();
    },[])

    return (
        <div>
          {loading ? (
            <Loader/>
          ) : (
            <div className="dark:bg-gray-800 dark:text-white">
              <h1 className="text-center text-3xl font-bold mb-6">All Lectures</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lectures.map((lecture) => (
                  <Subject
                    key={lecture.id}
                    title={lecture.title}
                    description={lecture.link}
                    subjectid={lecture.id}
                    isStudent={true}
                    yourCourses={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      );
}



{/* <div className="space-y-4">
    {lectures.map((lecture) => (
        <div key={lecture.id} className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div className="flex-shrink-0">
                <img src="/love-icon.png" alt="love for learning" className="h-12 w-12 object-cover rounded-full" />
            </div>
            <div>
                <div className="text-xl font-medium text-black">Title: {lecture.title}</div>
                <p className="text-gray-500">Link: {lecture.link}</p>
                {/* Add any additional information or buttons here */}
//             </div>
//         </div>
//     ))}
// </div> */}