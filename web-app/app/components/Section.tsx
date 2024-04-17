import React from 'react';

// Section component
const Section = ({ title, description }:any) => {
  return (
    <div className="flex flex-col items-center p-4 bg-purple-600 text-white">
      <div className="mb-2">
        {/* Placeholder for icon or image */}
        <span className="block w-12 h-12 bg-purple-400 rounded-full"></span>
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

// Main component
const LearningSections = () => {
  return (
    <div className="flex justify-around">
      <Section
        title="Learn The Latest Skills"
        description="Company is bootstrap based, lorem ipsums not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
      />
      <Section
        title="Get Ready For A Career"
        description="Company is bootstrap based, lorem ipsums not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
      />
      <Section
        title="Earn A Certificate"
        description="Company is bootstrap based, lorem ipsums not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
      />
    </div>
  );
};

export default LearningSections;
