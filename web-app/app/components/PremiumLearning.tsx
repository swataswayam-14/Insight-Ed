import React from 'react';

// PremiumLearning component
const PremiumLearning = () => {
  return (
    <div className="bg-pastel-pink p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-orange-500 mb-2">Premium Learning Experience</h2>
          <div className="flex items-center mb-4">
            <img src="../time-icon.png" alt="Time Management" className="h-6 w-6 mr-2"/>
            <span className="text-sm text-gray-700">Time Management</span>
          </div>
          <div className="flex items-center mb-4">
            <img src="../love-icon.png" alt="Love for Learning" className="h-6 w-6 mr-2"/>
            <span className="text-sm text-gray-700">Love for Learning</span>
          </div>
          <div className="flex items-center">
            <img src="../growth-icon.png" alt="Growth" className="h-6 w-6 mr-2"/>
            <span className="text-sm text-gray-700">Growth</span>
          </div>
        </div>
        <div className="flex-1">
          <img src="../learning-woman.png" alt="Learning" className="max-w-xs md:max-w-sm mx-auto"/>
        </div>
        <div className="flex-1">
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-gray-700">
              <strong>Easily Accessible:</strong> Learning Will Feel Very Comfortable With Courserb.
            </li>
            <li className="text-sm text-gray-700">
              <strong>Fun learning experience:</strong> Learning Will Feel Very Comfortable With Courserb.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PremiumLearning;
