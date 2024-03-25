// pages/Subjects.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Subject from './SubjectComponent';
import { TotalSubject } from '@/actions/TeacherProfile';


interface SubjectData {
    id: string;
    title: string;
    description: string;
}

const Subjects = () => {
    const [subjects, setSubjects] = useState<SubjectData[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await TotalSubject('874c5bbc-843d-49c6-b736-eea58c381aab');
      setSubjects(response);
    };

    fetchSubjects();
  }, []);

  return (
    <div>
      {subjects.map((subject) => (
        <Subject key={subject.id} title={subject.title} description={subject.description} />
      ))}
    </div>
  );
};

export default Subjects;