import React from 'react';

interface DataType {
  prediction: Array<Array<Array<number | string>>>;
  status: string;
}

const data: DataType = {
  "prediction": [
    [[0.0], ["happy"], ["N/A"]],
    [[13.0], ["happy"], ["N/A"]],
    [[13.0], ["N/A"], ["Yes"]],
    [[13.0], ["fear"], ["N/A"]],
    [[26.0], ["happy"], ["N/A"]],
    [[39.0], ["N/A"], ["Yes"]],
    [[52.0], ["fear"], ["N/A"]],
    [[65.0], ["happy"], ["N/A"]],
    [[78.0], ["fear"], ["N/A"]],
    [[91.0], ["disgust"], ["N/A"]],
    [[104.0], ["happy"], ["N/A"]],
    [[117.0], ["N/A"], ["Yes"]],
    [[130.0], ["fear"], ["N/A"]]
  ],
  "status": "success"
};

const EmotionAttention: React.FC = () => {
  return (
    <div>
      <div className='text-gray-300  text-center p-4 font-extrabold text-2xl'>It shows the emotional state of the student in each part of the lecture video</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {data.prediction.map((item, index) => {
    const time = item[0][0];
    const emotionalState = item[1][0];
    const number = item[2][0];
    return (
      <div key={index} className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
        <div className="space-y-2">
          <p className="text-gray-500 text-xs font-medium">
            Time: <span className="text-gray-900 font-bold">{time}</span>
          </p>
          <p className="text-gray-500 text-xs font-medium">
            Emotional State: <span className="text-gray-900 font-bold">{emotionalState}</span>
          </p>
          <p className="text-gray-500 text-xs font-medium">
            Number: <span className="text-gray-900 font-bold">{number}</span>
          </p>
        </div>
      </div>
    );
  })}
</div>
</div>


  );
};

export default EmotionAttention;
