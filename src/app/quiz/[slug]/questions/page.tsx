// app/quiz/[slug]/questions/page.tsx
"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/quiz/QuestionCard";
import he from "he"; // Library untuk mendecode HTML entities
import { categories } from "@/data/categories"; // Impor categories

// Helper function untuk delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const MAX_RETRIES = 3; // Jumlah maksimal percobaan ulang

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Memoize difficulty untuk memastikan stabil
  const difficulty = useMemo(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("difficulty") || "easy";
    }
    return "easy"; // Default jika window tidak tersedia
  }, []);

  // Mendapatkan kategori berdasarkan slug
  const category = useMemo(
    () => categories.find((cat) => cat.slug === slug),
    [slug]
  );

  // Ref untuk memastikan fetch hanya dilakukan sekali
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) {
      console.log("Already fetched, skipping.");
      return;
    }

    if (!category) {
      console.error("Invalid slug provided.");
      setError("Kategori tidak ditemukan.");
      return;
    }

    const fetchQuestions = async () => {
      hasFetched.current = true; // Tandai sudah melakukan fetch
      setIsLoading(true);
      console.log("Fetching questions...");
      let attempts = 0;
      let success = false;

      while (attempts < MAX_RETRIES && !success) {
        try {
          const response = await axios.get<{ results: Question[] }>(
            `https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=${difficulty}&type=multiple`
          );

          if (response.data.results.length === 0) {
            throw new Error(
              "Tidak ada pertanyaan ditemukan untuk kategori dan tingkat kesulitan ini."
            );
          }

          // Dekode karakter HTML entities
          const decodedQuestions = response.data.results.map((q) => ({
            ...q,
            question: he.decode(q.question),
            correct_answer: he.decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map((ans) => he.decode(ans)),
          }));
          setQuestions(decodedQuestions);
          success = true; // Tandai sebagai berhasil
          console.log("Questions fetched successfully");
        } catch (err) {
          const axiosError = err as AxiosError;
          if (axiosError.response?.status === 429) {
            attempts += 1;
            if (attempts < MAX_RETRIES) {
              const waitTime = Math.pow(2, attempts) * 1000; // Exponential backoff
              console.warn(
                `Rate limit exceeded. Mencoba kembali dalam ${
                  waitTime / 1000
                } detik... (Percobaan ${attempts}/${MAX_RETRIES})`
              );
              await delay(waitTime);
            } else {
              console.error(
                "Gagal mengambil pertanyaan setelah beberapa kali mencoba."
              );
              setError(
                "Terjadi kesalahan saat mengambil pertanyaan. Silakan coba lagi nanti."
              );
            }
          } else {
            console.error("Error fetching questions:", err);
            setError("Gagal mengambil pertanyaan. Silakan coba lagi nanti.");
            break; // Berhenti mencoba jika bukan error 429
          }
        }
      }
      setIsLoading(false);
    };

    fetchQuestions();
  }, [category, difficulty]); // Gunakan 'category' sebagai dependency

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
    // Redirect ke halaman skor dengan query parameters
    router.push(
      `/quiz/${slug}/questions/score?score=${score}&total=${questions.length}`
    );
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 flex flex-col flex-grow">
      <h1 className="text-2xl font-bold mb-4">
        Quiz: {category?.name} -{" "}
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </h1>
      {isLoading || questions.length === 0 ? (
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
      ) : (
        questions.map((question, index) => {
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
              selectedOption={userAnswers[index]} // Menambahkan selectedOption
              onSelectOption={(option) => handleOptionSelect(index, option)}
            />
          );
        })
      )}
      {questions.length > 0 && (
        <Button onClick={handleSubmit} className="mt-4">
          Submit Answers
        </Button>
      )}
    </div>
  );
};

export default QuestionsPage;
