"use client"

import axios from "axios";
import { useState } from "react";

import { getVideoLinkFromLectureId } from "@/actions/Student";

export default function question({params}:any){
    

    console.log(params.question);
    const [isLoading , setIsLoading] = useState(false);
    const [question , setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const getVideoLink = async()=>{
        try {
            let videoLink:any = await getVideoLinkFromLectureId(params.question);
            //the videoLink is showing undefined , fix this problem
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
            'x-cloud-trace-context': 'e9ab0ba2fcc8104034edd46f1d9e86fb;o=1',
            'date': `${formattedDate}`, //'date': 'Mon, 08 Apr 2024 07:22:14 GMT',
            'server': 'Google Frontend',
            'content-length': '292',
            'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
            'connection': 'open'
          };
        console.log('hit 1');
        ////https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing&20
          
        //one line difference between one retrieval for QA and Multi-step Approach for QA
        const response = await axios.get(`http://localhost:8080/qnabotNonHandwritten?query=https://drive.google.com/file/d/1OxGCJw5aEBzdkn4NoAFPzm5aFpL3luuO/view?usp=sharing&${question}`,{ headers });
        console.log('hit 2');
        
        const data = await response.data
        setAnswer(data.output_text);
    }
    
    return  <div className="min-h-screen bg-gray-900 text-white font-sans">
    <header className="p-5 bg-gray-800">
      <h1 className="text-4xl font-bold">Doubt Clearing Platform</h1>
    </header>
    <main className="flex flex-col items-center justify-center flex-1 px-4 md:px-0">
      <textarea
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full md:w-3/4 lg:w-2/3 h-40 p-4 mb-6 rounded-lg bg-gray-800 text-white text-lg resize-none shadow-lg"
        placeholder="Enter your question..."
      />
      
      <button
        className="px-6 py-3 bg-green-700 text-white rounded-lg cursor-pointer transition duration-300 hover:bg-green-600 shadow-lg"
        onClick={(event) => {
          event.preventDefault();
          getVideoLink();
        }}
      >
        Submit
      </button>
  
      {isLoading ? (
        <div className="flex justify-center items-center mt-5">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        </div>
      ) : (
        <div className="w-full md:w-3/4 lg:w-2/3 p-4 mb-5 mt-5 rounded-lg bg-gray-800 text-white shadow-lg">
          Answer: {answer}
        </div>
      )}
      <p className="text-sm text-gray-500 mt-5">Hint: Click the Submit button to get the answer.</p>
    </main>
  </div>
}

