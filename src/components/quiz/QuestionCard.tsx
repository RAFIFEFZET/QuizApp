// components/quiz/QuestionCard.tsx
"use client";
import React from "react";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption?: string; // Tambahkan properti ini sebagai opsional
  onSelectOption: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedOption, // Tambahkan ini ke dalam destructuring props
  onSelectOption,
}) => {
  return (
    <div className="mb-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="mb-2">
            <button
              onClick={() => onSelectOption(option)}
              className={`w-full text-left p-2 border rounded ${
                selectedOption === option
                  ? "bg-blue-300 border-blue-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
