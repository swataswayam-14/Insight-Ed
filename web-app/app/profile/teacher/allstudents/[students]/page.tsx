"use client"
import { findAllStudents } from "@/actions/TeacherProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import Image from "next/image";

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
          <Loader />
        ) : (
          <div className="dark:bg-gray-900 dark:text-gray-300">
            <h1 className="bg-indigo-600 text-gray-200 p-2 text-center shadow-md">Student List</h1>
            <ul className="bg-indigo-500 text-gray-200 p-4 flex flex-wrap">
              {students.map((student) => (
                <li key={student.id} className="mb-4 w-full md:w-1/2 lg:w-1/3 animate-fade-in-down">
                  <div className="m-2 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-700">
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQOGYkY8Di_0o3r5GeoBdOyHGHiVnAby59io_gmBtq4BFN0KXBSSD0FKFfbaWHnwlUIks&usqp=CAU" alt={student.firstname} className="w-full h-32 object-cover rounded-t-lg" /> */}
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQOGYkY8Di_0o3r5GeoBdOyHGHiVnAby59io_gmBtq4BFN0KXBSSD0FKFfbaWHnwlUIks&usqp=CAU"
                      alt={student.firstname}
                      height={200}
                      width={300}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="pt-2">
                      <h2 className="text-lg font-semibold">{student.firstname} {student.lastname}</h2>
                      <p className="text-sm">{student.username}</p>
                      <button onClick={() => {
                          Router.push(`/teacherprofile/emotionattention/${student.id}`)
                      }} className="bg-indigo-700 hover:bg-indigo-900 rounded-xl text-lg p-2 mt-2 transition duration-300 ease-in-out transform hover:scale-105">
                        Analyse
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
    
}