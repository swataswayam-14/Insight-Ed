"use server"

import client from "@/db"


export async function TeacherProfile(teacherId:string) {
    const teacher = await client.teacher.findUnique({
        where:{
            id:teacherId,
        }
    })
    if(teacher){
        const { username, email, id } = teacher;
        return {username , email, id};
    }else{
        console.log('teacher not found');
    }
}

export async function TotalStudents(teacherId:string) {
    const students = await client.studentteacher.findMany({
        where:{
            teacherid:teacherId 
        },
        include:{
            student:true
        }
    })
    return students.map((studentTeacher) => studentTeacher.student);
}


export async function TotalSubject(teacherId:string) {
    const subjects = await client.subject.findMany({
        where:{
            teacherid:teacherId
        }
    })
    console.log(subjects);
    
    // if(subjects){
    //     return subjects.map((sub)=>sub);
    // }
    return subjects
}


export async function TotalLectures(teacherId:string) {
    const lectures = await client.lecture.findMany({
        where:{
            teacherid:teacherId
        }
    })
    if(lectures){
        return lectures.map((lecture)=>lecture);
    }
}


export async function addSubject(title:string, description:string, teacherId:string) {
    const subject = await client.subject.create({
        data:{
            title:title,
            description:description,
            teacherid:teacherId
        }
    })
    if(subject){
        console.log(subject.title +' is created');
    }
}

export async function addLecture(title:string, link:string, teacherId:string, subjectId:string) {
    const lecture = await client.lecture.create({
        data:{
            subjectid:subjectId,
            teacherid:teacherId,
            title:title,
            link:link
        }
    })
    if(lecture){
        console.log(lecture.title +' is created');
        
    }
}


export async function findAllStudents(lectureId:string){
    const lecture = await client.lecture.findUnique({
        where:{
            id:lectureId
        },
        include:{
            subject:true
        }
    });
    if(!lecture){
        console.log('Lecture not found');
    }
    const students = await client.studentsubject.findMany({
        where:{
            subjectid:lecture?.subjectid
        },
        include:{
            student:true
        }
    });
    return students.map((students)=>students);
}

export default async function getAllLectures(subjectid:any){
    const lectures = await client.lecture.findMany({
        where:{
            subjectid:subjectid
        }
    })

    return lectures

}