"use client"
import React, { useEffect, useState } from 'react';

const PredictionComponent = ({params}:any) => {
  const [prediction, setPrediction] = useState([]);
  const [status, setStatus] = useState(null);


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
      'date': `${formattedDate}`, //'date': 'Mon, 08 Apr 2024 07:22:14 GMT',
      'server': 'gunicorn',
      'connection': 'close'
    };


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://34.122.48.168:8080/emotionAttention?query=https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing', {
        headers:headers
      });
      const data = await response.json();
      setPrediction(data.prediction);
      setStatus(data.status);
    };

    fetchData();
  }, [params.analyse]);

  return (
    <div>
      {status === 'success' && (
        <div>
          <h2>Prediction:</h2>
          {prediction[0] && (
            <>
              <p>Value: {prediction[0][0][0]}</p>
              <p>Label: {prediction[0][1][0]}</p>
              <p>Confidence: {prediction[0][2][0]}</p>
            </>
          )}
        </div>
      )}
      {status !== 'success' && (
        <p>Error: {status}</p>
      )}
    </div>
  );
};

export default PredictionComponent;