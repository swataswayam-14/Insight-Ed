import React from 'react';

// Banner component
const Banner = () => {
  return (
    <div className="bg-yellow-300 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-5xl font-bold text-gray-800">The Smart Choice For Future</h1>
          <p className="mt-4 text-gray-600">
            Elearn is a global training provider based across the UK that
            specialises in accredited and bespoke training courses. We crush
            the...
          </p>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Search for a location..."
              className="px-4 py-2 w-64 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-400">
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
