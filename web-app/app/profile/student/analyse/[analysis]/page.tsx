"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { getVideoLinkFromLectureId } from '@/actions/Student';

type ResultItem = [number, number, string[]];
type ResultArray = ResultItem[][];

export default function analysis({params}:any) {
  //console.log(params.analysis);
  
  const [data, setData] = useState<ResultArray>([]);
//   const result: ResultArray = [
//     [
//       [20, 0, ["- Machine Learning", "- Supervised Learning", "- Economic Value"]],
//       [40, 20, ["- Supervised Learning", "- Input-Output Mappings", "- Labeled Data"]],
//       [60, 40, ["- Supervised learning", "- Machine learning", "- Data labeling"]]
//     ]
//   ];

  useEffect(() => {
    const getVideoLink = async()=>{
        try {
            let videoLink:any = await getVideoLinkFromLectureId(params.analysis);
            if(videoLink != ""){
                fetchData(videoLink);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    getVideoLink();
    //https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing&20
    //ddbdghfgffsasdsd

    //gsdgdgsfsfsfsf
    const fetchData = async (videoLink:any) => {
        try {
          const headers = {
            'content-type': 'application/json',
            'access-control-allow-origin': '*',
            'x-cloud-trace-context': 'bf71fad6fb7834da91672abfa3f07abc;o=1',
            'date': 'Mon, 08 Apr 2024 04:58:01 GMT',
            'server': 'Google Frontend',
            'content-length': '27133',
            'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
            'connection': 'close'
          };
      
          const response = await axios.get(`http://localhost:8080/speechAndKeywordsFullOneShot?query=${videoLink}`, { headers });
          console.log('Response status:', response.status);
          console.log('Response data:', response.data);
          setData(response.data.result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      //fetchData()
  }, []);
  if(data.length == 0){
    return <div>Loading...</div>
  }

  return (
    <ul className="list-decimal pl-5 space-y-2">
  {data.flat(2).map((item: any, index: number) => (
    <li key={index} className="flex flex-col items-center bg-gray-100 p-3 rounded-lg shadow">
      {Array.isArray(item) ? (
        item.map((subitem: any, subIndex: number) => (
          <React.Fragment key={subIndex}>
            {typeof subitem === 'number' && (
              <span className="text-red-600 font-semibold">
                {new Date(subitem * 1000).toISOString().substr(11, 8)} - {new Date((subitem + 20) * 1000).toISOString().substr(11, 8)}
              </span>
            )}
            {typeof subitem === 'string' && <span className="text-blue-600 font-medium text-sm">{`"${subitem}"`}</span>}
          </React.Fragment>
        ))
      ) : (
        <span className="text-gray-700 text-sm">{JSON.stringify(item)}</span>
      )}
    </li>
  ))}
</ul>

  );
};

