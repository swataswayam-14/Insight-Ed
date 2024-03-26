'use client'
import React, { useState } from "react"
import { RegisterCourse } from "@/actions/Student";
const RegisterComponent:React.FC = ()=>{
    const [subjectId, setSubjectId] = useState("")
    const [studentEmail , setStudentEmail] = useState("");

    async function Register() {
        await RegisterCourse(subjectId, studentEmail)
    }

    return <div>
            <input
            className='text-black'
            type="text"
            placeholder="Enter Subject Id"
            value={subjectId}
            onChange={(e)=>{
                setSubjectId(e.target.value);
            }}
            />
            <input
            className='text-black'
            type="text"
            placeholder="Enter Student Email"
            value={studentEmail}
            onChange={(e)=>{
                setStudentEmail(e.target.value);
            }}
            />
            <button onClick={()=>{
                Register()
            }}>Register</button>
        </div>
}

export default RegisterComponent