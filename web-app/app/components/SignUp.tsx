"use client"
import { TeacherSignup } from "@/actions/Teacher";
import { useRouter } from "next/navigation";
import { ChangeEventHandler } from "react";
import { useState } from "react";
export default function TeacherSignUpComponent() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [phoneno, setphoneno] = useState("");
    const [address, setaddress] = useState("");
    const [username, setusername] = useState("");
    const Router = useRouter();
    return<div className="h-full flex justify-center items-center ">
    <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg space-y-4">
        <div className="text-3xl font-extrabold text-center text-black">
            Sign Up
        </div>
        <div className="space-y-2">
            <LabelledInput onChange={(e) => setusername(e.target.value)} label="Username" placeholder="swataswayam.14" />
            <LabelledInput onChange={(e) => setPassword(e.target.value)} label="Password" type="password" placeholder="swataasjbd3746" />
            <LabelledInput onChange={(e) => setemail(e.target.value)} label="Email" type="email" placeholder="swataswayamdash@gmail.com" />
            <LabelledInput onChange={(e) => setfirstname(e.target.value)} label="Firstname" type="text" placeholder="Swata Swayam" />
            <LabelledInput onChange={(e) => setlastname(e.target.value)} label="Lastname" type="text" placeholder="Dash" />
            <LabelledInput onChange={(e) => setphoneno(e.target.value)} label="Phone" type="tel" placeholder="+91 123456" />
            <LabelledInput onChange={(e) => setaddress(e.target.value)} label="Address" type="text" placeholder="House no 1416, 123456" />
        </div>
        <button onClick={async () => {
            const id = await TeacherSignup(username, firstname, lastname, password, phoneno, address, email);
            Router.push(`/teacherprofile/${id}`);
        }} type="button" className="w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">Sign Up</button>
    </div>
</div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange:ChangeEventHandler<HTMLInputElement>;

}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}