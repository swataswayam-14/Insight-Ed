// components/Subject.tsx

import React from 'react';

interface SubjectProps {
  title: string;
  description: string;
}

const Subject: React.FC<SubjectProps> = ({ title, description }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className='bg-white text-black p-10 border-2'>Add Lectures</button>
    </div>
  );
};

export default Subject;