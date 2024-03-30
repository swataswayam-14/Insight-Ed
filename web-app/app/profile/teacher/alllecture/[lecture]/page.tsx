"use client"

import { useEffect, useState } from "react";
import getAllLectures from "@/actions/TeacherProfile";
import Subject from "@/app/components/SubjectComponent";
interface LectureData {
    id: string;
    title: string;
    link: string;
}
export default function allLectures({params}:any){
    //console.log(params.lecture);
    
    const [lectures, setLectures] = useState<LectureData[]>([]);
    useEffect(()=>{
        async function allLectures(){
            const lectures = await getAllLectures(params.lecture); //subject id
            setLectures(lectures);
        }
        allLectures();
    },[])

    return <div>
        {lectures.map((lecture)=>(
            <Subject key={lecture.id} title={lecture.title} description={lecture.link} subjectid={lecture.id} isStudent={true}/>
        ))}
    </div>
}

