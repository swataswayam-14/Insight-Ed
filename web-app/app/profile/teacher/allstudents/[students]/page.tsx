"use client"
import { findAllStudents } from "@/actions/TeacherProfile";
import { useEffect, useState } from "react";

interface Students{
    id:string;
    username:string;
    email:string;
    password:string;
    firstname:string;
    lastname:string;
    phoneno:string;
    address:string;
}

export default function allStudents({params}:any){
    //console.log(params);
    
    const [students , setStudents] = useState<Students[]>([]);
    
    useEffect(()=>{
        async function getStudents() {
            const response = await findAllStudents(params.students);
            setStudents(response.map((student) => ({
                id: student.student.id,
                username: student.student.username,
                email: student.student.email,
                password: student.student.password,
                firstname: student.student.firstname,
                lastname: student.student.lastname,
                phoneno: student.student.phoneno,
                address: student.student.address,
              })));
        }
        getStudents();
    },[])

    return (
        <div>
            <h1 className="bg-white text-black p-2 ">Student List</h1>
            <ul className="bg-blue-400 text-black p-4">
            {students.map((student) => (
            <li key={student.id}>
                <div>
                    <h2>{student.firstname} {student.lastname}</h2>
                    <p>{student.username}</p>
                    <button className="bg-blue-600 rounded-xl text-lg p-2">Analyse</button>
                </div>
            </li>
            ))}
            </ul>
        </div>
    )
}