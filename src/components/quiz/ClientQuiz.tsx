// components/quiz/ClientQuiz.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/quiz/QuestionCard";
import { useRouter } from "next/navigation";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ClientQuizProps {
  questions: Question[];
  slug: string;
  difficulty: string;
}

const ClientQuiz: React.FC<ClientQuizProps> = ({
  questions,
  slug,
  difficulty,
}) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  const handleOptionSelect = (
    questionIndex: number,
    selectedOption: string
  ) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        score += 1;
      }
    });
    router.push(
      `/quiz/${slug}/questions/score?score=${score}&total=${questions.length}`
    );
  };

  return (
    <>
      {questions.map((question, index) => {
        const options = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        options.sort();

        return (
          <QuestionCard
            key={index}
            question={question.question}
            options={options}
            selectedOption={userAnswers[index]}
            onSelectOption={(option) => handleOptionSelect(index, option)}
          />
        );
      })}
      {questions.length > 0 && (
        <Button onClick={handleSubmit} className="mt-4">
          Submit Answers
        </Button>
      )}
    </>
  );
};

export default ClientQuiz;
