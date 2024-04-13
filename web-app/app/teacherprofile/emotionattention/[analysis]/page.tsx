"use client"

import axios from "axios"
import { useEffect } from "react"

export default function Emotion(){

    useEffect(()=>{
        async function getdata() {
            const headers = {
                'content-type':'application/json',
                'access-control-allow-origin':'*'

            }
            const response = await axios.get('http://localhost:8080/emotionAttention?query=https://drive.google.com/file/d/1ht1X246gT9t8U92t5p3UIYGRbQSRBx94/view?usp=sharing',{headers})
            const predictions = await response.data.prediction //array
            const status = await response.data.status //string
            const flatArray: any[][] = [];

            predictions.forEach((sublist: any[]) => {
              sublist.forEach((subsublist: any[]) => {
                subsublist.forEach((item: any) => {
                  if (flatArray.length === 0) {
                    flatArray.push([item]);
                  } else {
                    const lastSubArray = flatArray[flatArray.length - 1];
                    lastSubArray.push(item);
                  }
                });
              });
            });
            console.log(predictions);
        }
        getdata()
        
    },[])
    return<div>hello</div>
}