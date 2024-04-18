"use client"
import { findAllStudents } from "@/actions/TeacherProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";

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
    const Router = useRouter()
    //console.log(params);
    
    const [students , setStudents] = useState<Students[]>([]);
    const [loading , setLoading] = useState(false);
    
    useEffect(()=>{
        async function getStudents() {
            setLoading(true);
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
              setLoading(false);
        }
        getStudents();
    },[])

    return (
        <div>
          {loading ? (
            <Loader/>
          ) : (
            <div className="dark:bg-gray-800 dark:text-white">
              <h1 className="bg-purple-600 text-white p-2 text-center">Student List</h1>
              <ul className="bg-purple-500 text-white p-4">
                {students.map((student) => (
                  <li key={student.id} className="mb-4">
                    <div className="p-4 rounded-lg shadow-lg">
                      <h2 className="text-lg font-semibold">{student.firstname} {student.lastname}</h2>
                      <p className="text-sm">{student.username}</p>
                      <button onClick={()=>{
                          Router.push(`/profile/teacher/student/${student.id}`)
                      }} className="bg-purple-700 hover:bg-purple-800 rounded-xl text-lg p-2 mt-2 transition duration-300 ease-in-out">Analyse</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
}