// components/quiz/QuestionCard.tsx
"use client";
import React from "react";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption?: string;
  onSelectOption: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  selectedOption,
  onSelectOption,
}) => {
  // Letters for option labeling (A, B, C, D)
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="mb-8 p-6 rounded-xl border-2 border-primary/20 bg-card/60 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 pb-3 border-b border-primary/20">
        {question}
      </h2>
      <ul className="space-y-3">
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => onSelectOption(option)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                selectedOption === option
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary-rgb)/0.5)] font-medium"
                  : "bg-card border border-primary/10 hover:border-primary/30 hover:shadow-md hover:bg-primary/5"
              }`}
              aria-pressed={selectedOption === option}
            >
              <span
                className={`inline-flex items-center justify-center h-8 w-8 rounded-full mr-3 flex-shrink-0 ${
                  selectedOption === option
                    ? "bg-primary-foreground text-primary"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {optionLetters[index]}
              </span>
              <span>{option}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Unanswered warning indicator */}
      {!selectedOption && (
        <div className="mt-4 text-amber-500 text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Pertanyaan belum dijawab</span>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
