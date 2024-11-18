// app/quiz/[slug]/questions/loading.tsx

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-blue-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span>Loading Pertanyaan...</span>
      </div>
    </div>
  );
};

export default Loading;
