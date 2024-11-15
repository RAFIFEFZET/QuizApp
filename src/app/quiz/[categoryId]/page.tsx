// app/quiz/[categoryId]/page.tsx
// Halaman kuis berdasarkan kategori (QuizPage)
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/quiz/QuestionCard";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const params = useParams();
  const categoryId = params.categoryId;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<{ results: Question[] }>(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [categoryId]);

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
    // Implementasi logika untuk memeriksa jawaban dan menampilkan skor
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {questions.map((question, index) => {
        const options = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        options.sort(() => Math.random() - 0.5);

        return (
          <QuestionCard
            key={index}
            question={question.question}
            options={options}
            onSelectOption={(option) => handleOptionSelect(index, option)}
          />
        );
      })}
      <Button onClick={handleSubmit}>Submit Answers</Button>
    </div>
  );
};

export default QuizPage;
