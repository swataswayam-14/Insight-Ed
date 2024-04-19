"use client"
import Loader from '@/app/components/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Sample data received from the backend
// const backendResponse:any = {
//     "result": [
//       [
//         [
//           [
//             0.0
//           ],
//           [
//             13.0
//           ],
//           [
//             "- Machine Learning",
//             "- Economic Value",
//             "- SWOT"
//           ]
//         ],
//         [
//           [
//             13.0
//           ],
//           [
//             26.0
//           ],
//           [
//             "- Supervised Learning",
//             "- Machine Learning"
//           ]
//         ],
//         [
//           [
//             26.0
//           ],
//           [
//             39.0
//           ],
//           [
//             "- Supervised Learning",
//             "- Training Data",
//             "- Labeled Data"
//           ]
//         ],
//         [
//           [
//             39.0
//           ],
//           [
//             52.0
//           ],
//           [
//             "- Machine learning",
//             "- Supervised learning"
//           ]
//         ],
//         [
//           [
//             52.0
//           ],
//           [
//             65.0
//           ],
//           [
//             "- Unsupervised learning",
//             "- Predictive modeling",
//             "- Machine learning"
//           ]
//         ],
//         [
//           [
//             65.0
//           ],
//           [
//             78.0
//           ],
//           [
//             "- Spam filter",
//             "- Email classification",
//             "- Machine learning"
//           ]
//         ],
//         [
//           [
//             78.0
//           ],
//           [
//             91.0
//           ],
//           [
//             "- Speech recognition",
//             "- Audio transcription"
//           ]
//         ],
//         [
//           [
//             91.0
//           ],
//           [
//             104.0
//           ],
//           [
//             "- Machine translation",
//             "- Natural language processing",
//             "- Language translation"
//           ]
//         ],
//         [
//           [
//             104.0
//           ],
//           [
//             117.0
//           ],
//           [
//             "- Supervised Learning",
//             "- Online Advertising"
//           ]
//         ],
//         [
//           [
//             117.0
//           ],
//           [
//             130.0
//           ],
//           [
//             "- Online advertising",
//             "- Keyword relevance",
//             "- Ad click-through rates"
//           ]
//         ]
//       ]
//     ]
//   }





interface BackendResponse {
  result: Array<Array<Array<[number] | [string]>>>;
}


const VideoDataDisplay: React.FC<{ backendResponse: BackendResponse }> = ({ backendResponse }) => {
  return (
    <div>
        <div className='flex flex-wrap mb-2 justify-center items-center '>
            <div className='text-3xl items-center bg-white text-black rounded-full p-6 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out'>
            Time Stamps along with the topics taught
            </div>
        </div>
    {backendResponse.result.map((timeRange, index) => (
      <div key={index} className="mb-4 p-4 rounded-lg shadow-lg bg-white hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 grid grid-cols-3">
        {timeRange.map((data, innerIndex) => (
          <div key={innerIndex} className="my-2">
            {Array.isArray(data[0]) && Array.isArray(data[1]) && (
              <p className="text-lg font-semibold text-gray-800">
                Time Range: <strong className="text-indigo-600">{data[0][0]}s - {data[1][0]}s</strong>
              </p>
            )}
            {Array.isArray(data[2]) && (
              <ul className="list-disc pl-5 space-y-2">
                {data[2].map((topic, topicIndex) => (
                  <li key={topicIndex} className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out">{topic}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
  
  );
};



const App: React.FC = () => {
    const [backendResponse, setBackendResponse] = useState<BackendResponse>()
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        async function getData() {
            setLoader(true);
            const response = await axios.get('http://localhost:8080/speechAndKeywordsEmotionDrwosiniess?query=https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view');
            setBackendResponse(response.data);
            setLoader(false);
        }
        getData()
    },[])
    if(loader){
        return <Loader/>
    }else if(loader == false && backendResponse){
        return (
            <div className="App">
              <VideoDataDisplay backendResponse={backendResponse} />
            </div>
        );
    }
};

export default App;

