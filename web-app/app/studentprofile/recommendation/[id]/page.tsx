"use client"
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

type KeywordsRecommendationsData = {
  keywords: string[];
  recommendations: string[];
};

const KeywordsRecommendations: React.FC = ({params}:any) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
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
  const headers = useMemo(() => {
    return {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'date': `${formattedDate}`, //'date': 'Mon, 08 Apr 2024 07:22:14 GMT',
        'server': 'gunicorn',
        'connection': 'close'
    };
  }, [formattedDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<KeywordsRecommendationsData>('http://34.122.48.168:8080/speechAndKeywordsIndividualParts?query=https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing&0&120', {headers});
        const { keywords, recommendations } = response.data;

        if (Array.isArray(keywords)) {
          setKeywords(keywords);
        }

        if (Array.isArray(recommendations)) {
          setRecommendations(recommendations);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      <h2>Keywords:</h2>
      <ul>
        {keywords.length > 0 &&
          keywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
      </ul>

      <h2>Recommendations:</h2>
      <ul>
        {recommendations.length > 0 &&
          recommendations.map((recommendation, index) => (
            <li key={index}>
              <a href={recommendation} target="_blank" rel="noreferrer">
                {recommendation}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default KeywordsRecommendations;