"use client"
import Image from "next/image";
import { useRouter } from "next/navigation"; 
export default function Home() {
  const router = useRouter(); 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        className="rounded-xl shadow-lg dark:shadow-white/50"
        src="/Main.png"
        alt="studying student"
        width={780}
        height={350}
        priority
      />
      <div className="mt-8 space-y-4">
        <button
          className="ml-2 btn btn-primary px-6 py-2 rounded-xl text-black font-medium bg-gray-200 hover:bg-gray-300 shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
          onClick={() => {
            router.push('/teacher/signup');
          }}
        >
          Teacher Signup
        </button>
        <button
          onClick={() => {
            router.push('/teacher/signin');
          }}
          className="ml-2 btn btn-primary px-6 py-2 rounded-xl text-black font-medium bg-gray-200 hover:bg-gray-300 shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
        >
          Teacher Signin
        </button>
        <button
          className="ml-2 btn btn-primary px-6 py-2 rounded-xl text-black font-medium bg-gray-200 hover:bg-gray-300 shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
          onClick={() => {
            router.push('/student/signup');
          }}
        >
          Student Signup
        </button>
        <button
          onClick={() => {
            router.push('/student/signin');
          }}
          className="ml-2 btn btn-primary px-6 py-2 rounded-xl text-black font-medium bg-gray-200 hover:bg-gray-300 shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
        >
          Student Signin
        </button>
      </div>
    </div>
  );
}
