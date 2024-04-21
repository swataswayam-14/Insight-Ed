"use client"
import React from 'react';
import { useRouter } from "next/navigation"
// Navbar component
const Navbar = () => {
  const Router = useRouter()
  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <a className="flex items-center py-4 px-2">
                {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2"/> */}
                <span className="font-semibold text-gray-200 text-lg">Insight-Ed</span>
              </a>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <a className="py-4 px-2 text-gray-300 font-semibold hover:text-purple-500 transition duration-300">Home</a>
              <a className="py-4 px-2 text-gray-300 font-semibold hover:text-purple-500 transition duration-300">Articles</a>
              <a className="py-4 px-2 text-gray-300 font-semibold hover:text-purple-500 transition duration-300">Courses</a>
              <a className="py-4 px-2 text-gray-300 font-semibold hover:text-purple-500 transition duration-300">Reviews</a>
              <a className="py-4 px-2 text-gray-300 font-semibold hover:text-purple-500 transition duration-300">Contact</a>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-3 ">
            <a href="#" onClick={()=>{
                Router.push('/home')
            }} className="py-2 px-2 font-medium text-gray-300 rounded hover:bg-purple-500 hover:text-white transition duration-300">Log In</a>
            <a href="#" onClick={()=>{
                Router.push('/home')
            }} className="py-2 px-2 font-medium text-white bg-purple-500 rounded hover:bg-purple-600 transition duration-300">Sign Up</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
