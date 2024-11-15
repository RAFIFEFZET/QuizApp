// app/quiz/[categoryId]/[difficulty]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/quiz/QuestionCard";
import he from "he"; // Import library 'he'

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
  const difficulty = params.difficulty;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<{ results: Question[] }>(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
        );
        // Dekode karakter HTML entities
        const decodedQuestions = response.data.results.map((q) => ({
          ...q,
          question: he.decode(q.question),
          correct_answer: he.decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((ans) => he.decode(ans)),
        }));
        setQuestions(decodedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [categoryId, difficulty]);

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
    alert(`Anda mendapatkan skor ${score} dari ${questions.length}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {questions.map((question, index) => {
        const options = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        options.sort(() => Math.random() - 0.5); // Acak urutan opsi

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
