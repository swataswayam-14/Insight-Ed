"use client"

import axios from "axios";
import { useState } from "react";

import { getVideoLinkFromLectureId } from "@/actions/Student";

export default function doubt({params}:any){


    console.log(params.doubt);
    const [question , setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const getVideoLink = async()=>{
        try {
            let videoLink:any = await getVideoLinkFromLectureId(params.doubt);
            if(videoLink != ""){
                console.log(videoLink);
                
                getAnswer(videoLink);
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    async function getAnswer({videoLink}:any) {
        console.log(videoLink);
        
        const date = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const day = days[date.getUTCDay()];
        const dateNum = ('0' + date.getUTCDate()).slice(-2);
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        const hours = ('0' + date.getUTCHours()).slice(-2);
        const minutes = ('0' + date.getUTCMinutes()).slice(-2);
        const seconds = ('0' + date.getUTCSeconds()).slice(-2);
        
        const formattedDate = `${day}, ${dateNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
        console.log(formattedDate);
        const headers = {
            'content-type': 'application/json',
            'access-control-allow-origin': '*',
            'x-cloud-trace-context': '7a04e916aacbd18415ddc99e22f49bd4;o=1',
            'date': `${formattedDate}`, //'date': 'Mon, 08 Apr 2024 07:22:14 GMT',
            'server': 'Google Frontend',
            'content-length': '316',
            'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
            'connection': 'open'
          };
        console.log('hit 1');
        ////https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing&20
          
        const response = await axios.get(`https://insight-ed-server-latest-pje3eb6rka-uc.a.run.app/qnabotVideo?query=https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing&${question}`,{ headers });
        console.log('hit 2');
        
        const data = await response.data
        setAnswer(data.output_text);
    }
    
    return  <div className="min-h-screen bg-gray-900 text-white font-sans">
    <header className="p-5 bg-gray-700">
      <h1 className="text-3xl">Doubt Clearing Platform</h1>
    </header>
    <main className="flex flex-col items-center justify-center flex-1">
      <textarea onChange={(e)=>{
        setQuestion(e.target.value)
      }} className="w-4/5 h-32 p-2 mb-5 rounded-lg bg-gray-700 text-white text-lg resize-none" placeholder="Enter your question..." />
      
      <button className="px-5 py-2 bg-green-600 text-white rounded-lg cursor-pointer transition duration-300 hover:bg-green-500" onClick={(event) => {
        event.preventDefault();
        //getAnswer()
        getVideoLink();
      }}>Submit</button>
  
      <div className="w-4/5 p-2 mb-5 mt-5 rounded-lg bg-gray-700 text-white">Answer: {answer}</div>
      <p className="text-sm text-gray-500">Hint: Click the Submit button to get the answer.</p>
    </main>
  </div>
}

