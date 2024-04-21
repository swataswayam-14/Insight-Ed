"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { getVideoLinkFromLectureId } from '@/actions/Student';
import Loader from '@/app/components/Loader';

type ResultItem = [number, number, string[]];
type ResultArray = ResultItem[][];

const SearchInstructions = () => {
  return (
    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p className="font-bold">Find Your Lecture Topics</p>
      <p className="text-sm">
        Type a specific topic in the search box and click the <strong>Search</strong> button to find out when it was discussed in your lecture videos. The results will display the exact timestamps for you to review.
      </p>
    </div>
  );
};

export default function Analysis({params}:any) {
  //console.log(params.analysis);
  
  const [data, setData] = useState<ResultArray>([]);
  const result: ResultArray = [
    [
      [20, 0, ["- Machine Learning", "- Supervised Learning", "- Economic Value"]],
      [40, 20, ["- Supervised Learning", "- Input-Output Mappings", "- Labeled Data"]],
      [60, 40, ["- Supervised learning", "- Machine learning", "- Data labeling"]]
    ]
  ];

  // useEffect(() => {
  //   const getVideoLink = async()=>{
  //       try {
  //           let videoLink:any = await getVideoLinkFromLectureId(params.analysis);
  //           if(videoLink != ""){
  //               fetchData(videoLink);
  //           }
  //       } catch (error) {
  //           console.log(error);
            
  //       }
  //   }
  //   getVideoLink();
    //https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing&20
    //ddbdghfgffsasdsd

    //gsdgdgsfsfsfsf
  //   const fetchData = async (videoLink:any) => {
  //       try {
  //         const headers = {
  //           'content-type': 'application/json',
  //           'access-control-allow-origin': '*',
  //           'x-cloud-trace-context': 'bf71fad6fb7834da91672abfa3f07abc;o=1',
  //           'date': 'Mon, 08 Apr 2024 04:58:01 GMT',
  //           'server': 'Google Frontend',
  //           'content-length': '27133',
  //           'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
  //           'connection': 'close'
  //         };
      
  //         const response = await axios.get(`http://localhost:8080/speechAndKeywordsFullOneShot?query=${videoLink}`, { headers });
  //         console.log('Response status:', response.status);
  //         console.log('Response data:', response.data);
  //         setData(response.data.result);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };
  //     //fetchData()
  // }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<number[]>([]);
    const [loader, setLoader] = useState(false);
  
    const handleSearch = (term: string) => {
      setLoader(true);
      const termLower = term.toLowerCase();
      const results: number[] = [];
      result.forEach(session => {
        session.forEach(([end, start, topics]) => {
          const topicFound = topics.some(topic => topic.toLowerCase().includes(termLower));
          if (topicFound) {
            results.push(start);
          }
        });
      });
      setTimeout(()=>{
        setSearchResults(results);
        setLoader(false);
      },10000)
    };

    return (
      <div>
        <SearchInstructions />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-xs">
            <input
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a topic..."
            />
            <button
              className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline transform motion-safe:hover:scale-105 transition duration-300 ease-in-out"
              onClick={() => handleSearch(searchTerm)}
            >
              Search
            </button>
          </div>
          <div className="w-full max-w-xs mt-6">
            {loader ? (
               <p className="text-gray-600">Loading...</p>
            ) : searchResults.length > 0 ? (
              <ul className="bg-white rounded-md divide-y divide-gray-200 shadow">
                {searchResults.map((time, index) => (
                  <li key={index} className="px-2 py-2 hover:bg-gray-50 transition duration-150 ease-in-out">
                    Topic taught at: <span className="font-semibold text-black">{time} minutes</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No topics found.</p>
            )}
          </div>
        </div>
      </div>
  );
}