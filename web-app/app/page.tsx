"use client"
import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const Router = useRouter();
  return (
    <div>
      <Image 
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ml-60 rounded-xl" 
        src="/Main.png"
        alt="Next.js Logo" 
        width={780} 
        height={350} 
        priority 
      />
    <div className="flex flex-col items-center">
      <div >
        <button className="btn btn-primary p-4 rounded-2xl text-black font-medium bg-gray-200 hover:text-lg mr-36 mb-4 hover:bg-gray-300 shadow-lg" onClick={()=>{
          Router.push('/teacher/signup')
        }}>Teacher Signup</button>
        <button className="btn btn-primary p-4 rounded-2xl text-black font-medium bg-gray-200 hover:text-lg hover:bg-gray-300 shadow-lg">Teacher Signin</button>
      </div>
      <div>
        <button className="btn btn-primary p-4 rounded-2xl text-black font-medium bg-gray-200 hover:text-lg mr-36 mb-4 hover:bg-gray-300 shadow-lg" onClick={()=>{
          Router.push('/student/signup')
        }}>Student Signup</button>
        <button className="btn btn-primary p-4 rounded-2xl text-black font-medium bg-gray-200 hover:text-lg hover:bg-gray-300 shadow-lg">Student Signin</button>
      </div>
    </div>
    </div>
  );
}



{/* <Image 
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ml-60 rounded-xl" 
        src="/Main.png"
        alt="Next.js Logo" 
        width={780} 
        height={350} 
        priority 
      /> */}