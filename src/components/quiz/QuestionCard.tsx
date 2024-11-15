// components/quiz/QuestionCard.tsx
"use client";
import React from "react";

interface QuestionCardProps {
  question: string;
  options: string[];
  onSelectOption: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onSelectOption,
}) => {
  return (
    <div className="mb-6">
      <p className="font-semibold">{question}</p>
      <div className="flex flex-col mt-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(option)}
            className="mb-2 p-2 bg-gray-200 rounded"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
