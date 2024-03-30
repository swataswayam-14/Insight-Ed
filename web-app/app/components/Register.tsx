'use client'
import React, { useState } from "react"
import { RegisterCourse } from "@/actions/Student";
import { useRouter } from "next/navigation";
const RegisterComponent:React.FC = ()=>{
    const Router = useRouter();
    const [subjectId, setSubjectId] = useState("")
    const [studentEmail , setStudentEmail] = useState("");

    async function Register() {
        const studentId = await RegisterCourse(subjectId, studentEmail)
        if(studentId != -1){
          Router.push(`/studentprofile/${studentId}`)
        }
    }

    return <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center max-w-md mx-auto mt-40">
    <input
      className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
      type="text"
      placeholder="Enter Subject Id"
      value={subjectId}
      onChange={(e) => {
        setSubjectId(e.target.value);
      }}
    />
    <input
      className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
      type="text"
      placeholder="Enter Student Email"
      value={studentEmail}
      onChange={(e) => {
        setStudentEmail(e.target.value);
      }}
    />
    <button className="bg-blue-500 hover:text-lg hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={Register}>
      Register
    </button>
  </div>
}

export default RegisterComponent