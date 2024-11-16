import React from 'react';

const ProgressCard = () => {
  return (
    <div className="z-100 bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 w-full max-w-md">
      {/* Icon */}
      <div className="flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 10v8h16v-8M4 10L7 5h10l3 5M4 10h16"
          />
        </svg>
      </div>
      {/* Distance Info */}
      <div className="flex-1">
        <div className="text-gray-600 text-sm font-medium">9.6 กม. → 7.4 กม.</div>
        <div className="relative mt-2 h-2 w-full bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-gradient-to-r from-green-500 to-black rounded-full"
            style={{ width: '75%' }} // Adjust width based on progress
          >
            <div className="absolute -right-1 -top-1.5 bg-green-500 w-3 h-3 rounded-full"></div>
          </div>
        </div>
      </div>
      {/* Time */}
      <div className="text-right">
        <div className="text-sm text-gray-500">15 นาที</div>
        <div className="text-lg font-bold text-red-500">11 นาที</div>
      </div>
    </div>
  );
};

export default ProgressCard;
