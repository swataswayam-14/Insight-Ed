import React from 'react';

// Section component
const Section = ({ title, description }:any) => {
  return (
<div className="flex flex-col items-center p-4 bg-gray-800 text-white">
<div className="mb-2">
  <img src="../love-icon.png" alt="love for learning" className="w-16 h-16 rounded-full shadow-lg" />
</div>
<h2 className="text-xl font-bold mb-4">{title}</h2>
<p className='text-gray-200'>{description}</p>
</div>
);
};

// Main component
const LearningSections = () => {
  return (
    <div className="flex flex-wrap justify-around">
      <div className="grid grid-cols-3">
      <Section
        title="Detection of Emotion and Attentiveness of a Students"
        description="Used Transfer Learning on EfficientNetB7 model along with a custom dataset combined with an open-sourced LLMs to capture the same through the recorded lecture which the student attended through the webcam during that session."
      />
      <Section
        title="Automatic Video Time-stamping into Different Topics- Saving Student's Time"
        description="This feature allows automatic time stamping of videos depending on a hyperparameter chosen by the student exclusively."
      />
      <Section
        title="Reverse Video Search"
        description="This feature allows the student to not get through the video again and again for a particular keyword but rather type it and get the exact timestamp(s) for the same."
      />
      <Section
        title="QnA Bot"
        description="This feature allows the student to ask questions related to specific lectures. The bot then analyzes the question to determine where it was taught in the lecture by the teacher, and finally formulates an answer. 🤖📚"
      />
      <Section
         title="Lecture Analysis"
         description="This feature enables students to analyze entire lectures by providing precise timestamps for each topic taught."
      />
      <Section
         title="Generation of Questionnaire on topics where students lacked attention"
         description="This feature allows the teacher to generate/upload a questionnaire through an LLM for the topics for the student to double-check his/her understanding to plan further steps and also get recommended most relevant YouTube videos on the same or the teacher could suggest some materials or videos from their course itself."
      />
    </div>
    </div>
  );
};

export default LearningSections;
