// components/quiz/ClientQuiz.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/quiz/QuestionCard";
import ConfirmDialog from "@/components/quiz/ConfirmDialog";
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
  const [validationError, setValidationError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(
    questions.length * 30,
  ); // 30 seconds per question
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // States for confirm dialogs
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showTimeUpConfirm, setShowTimeUpConfirm] = useState(false);

  const router = useRouter();

  // Auto-scroll to active question when set
  useEffect(() => {
    if (activeQuestion !== null) {
      const element = document.getElementById(`question-${activeQuestion}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeQuestion]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as minutes:seconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOptionSelect = (
    questionIndex: number,
    selectedOption: string,
  ) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
    setValidationError(null);

    // Find next unanswered question for the progress indicator
    const nextUnanswered = findNextUnansweredQuestion();
    if (nextUnanswered !== null && nextUnanswered !== questionIndex) {
      setActiveQuestion(nextUnanswered);
    }
  };

  const findNextUnansweredQuestion = (): number | null => {
    for (let i = 0; i < questions.length; i++) {
      if (!userAnswers[i]) {
        return i;
      }
    }
    return null;
  };

  const handleTimeUp = () => {
    // Show custom dialog when time is up
    setShowTimeUpConfirm(true);
  };

  const submitAnswers = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        score += 1;
      }
    });
    router.push(
      `/quiz/${slug}/questions/score?score=${score}&total=${questions.length}&difficulty=${difficulty}`,
    );
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    const unansweredQuestions =
      questions.length - Object.keys(userAnswers).length;

    if (unansweredQuestions > 0) {
      setValidationError(
        `Ada ${unansweredQuestions} pertanyaan yang belum dijawab!`,
      );

      // Set active question to the first unanswered question
      const firstUnanswered = findNextUnansweredQuestion();
      if (firstUnanswered !== null) {
        setActiveQuestion(firstUnanswered);
      }
      return;
    }

    // Show custom confirmation dialog
    setShowSubmitConfirm(true);
  };

  // Handle confirm submission
  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    setShowConfetti(true);
    setTimeout(() => submitAnswers(), 1000);
  };

  // Handle time up confirm
  const handleTimeUpConfirm = () => {
    setShowTimeUpConfirm(false);
    submitAnswers();
  };

  return (
    <div className="w-full">
      {/* Progress & Timer bar */}
      <div className="sticky top-0 z-10 mb-8 p-4 bg-background/90 backdrop-blur-sm rounded-lg shadow-md border border-primary/20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground font-bold mr-3">
              {Object.keys(userAnswers).length}/{questions.length}
            </div>
            <div className="h-2 w-full md:w-48 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{
                  width: `${
                    (Object.keys(userAnswers).length / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`text-lg font-mono font-bold ${
                timeRemaining < 30 ? "animate-pulse text-red-500" : ""
              }`}
            >
              {formatTime(timeRemaining)}
            </div>
            <Button
              onClick={() => {
                // Jump to first unanswered question
                const nextUnanswered = findNextUnansweredQuestion();
                if (nextUnanswered !== null) {
                  setActiveQuestion(nextUnanswered);
                }
              }}
              variant="ghost"
              className="ml-4 text-primary hover:text-primary/90 hover:bg-primary/10"
            >
              Soal Belum Dijawab
            </Button>
          </div>
        </div>
      </div>

      {/* Validation error message */}
      {validationError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-md text-red-700 animate-bounce">
          <p className="font-medium">{validationError}</p>
        </div>
      )}

      <div className="space-y-8 pb-24">
        {questions.map((question, index) => {
          const options = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          options.sort();

          return (
            <div
              key={index}
              id={`question-${index}`}
              className={`relative transition-all duration-300 ${
                activeQuestion === index
                  ? "ring-2 ring-primary ring-offset-4"
                  : ""
              }`}
            >
              <div
                className={`absolute -left-6 md:-left-10 top-6 flex items-center justify-center w-10 h-10 rounded-full font-bold shadow-lg ${
                  userAnswers[index]
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </div>
              <QuestionCard
                question={question.question}
                options={options}
                selectedOption={userAnswers[index]}
                onSelectOption={(option) => handleOptionSelect(index, option)}
              />
            </div>
          );
        })}
      </div>

      {/* Floating submit button */}
      {questions.length > 0 && (
        <div className="sticky bottom-6 flex justify-center">
          <Button
            onClick={handleSubmit}
            className="px-10 py-6 text-xl font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary-rgb)/0.6)] hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary"
          >
            Selesai dan Lihat Skor ({Object.keys(userAnswers).length}/
            {questions.length})
          </Button>
        </div>
      )}

      {/* Confetti effect when submitting */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* This would be replaced with a real confetti component in a production app */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl animate-bounce">🎉</div>
          </div>
        </div>
      )}

      {/* Custom confirm dialogs */}
      <ConfirmDialog
        isOpen={showSubmitConfirm}
        title="Konfirmasi Pengumpulan"
        message="Yakin ingin mengumpulkan jawaban? Kamu tidak dapat mengubahnya setelah dikumpulkan."
        confirmText="Ya, Kumpulkan"
        cancelText="Kembali ke Kuis"
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowSubmitConfirm(false)}
      />

      <ConfirmDialog
        isOpen={showTimeUpConfirm}
        title="Waktu Habis!"
        message="Waktu pengerjaan kuis telah habis. Kumpulkan jawaban sekarang?"
        confirmText="Kumpulkan"
        cancelText="Tinjau Jawaban"
        onConfirm={handleTimeUpConfirm}
        onCancel={() => setShowTimeUpConfirm(false)}
        isDestructive={true}
      />
    </div>
  );
};

export default ClientQuiz;
