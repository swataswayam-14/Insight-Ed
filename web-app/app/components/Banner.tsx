import React from 'react';

// Banner component
const Banner = () => {
  return (
    <div className="bg-gray-700 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-5xl font-bold text-gray-200">Insight-Ed: The Smart Choice For Future E-Learning</h1>
          <p className="mt-4 text-gray-100">
          Our product (website) provides a solution to tackle the challenge of distance learning between student and teacher, especially in the pandemic era where offline learning was a thing of the past.
          Our solution tries to bridge the knowledge gap between a teacher and a student in online classes by leveraging the power of AI to provide the teacher and student with insights to better prepare themselves for the course/lecture, leading to our solution - Insight-Ed.
          </p>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Search for a location..."
              className="px-4 py-2 w-64 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-yellow-400 hover:text-black">
              Continue
            </button>
          </div>
        </div>
        <div className="flex-shrink-0">
          {/* Illustration or Image */}
          <img src="../illustration.png" alt="Illustration" className="h-48 w-auto"/>
        </div>
      </div>
    </div>
  );
};

export default Banner;
