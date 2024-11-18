// app/quiz/[slug]/questions/page.tsx

import React from "react";
import axios, { AxiosError } from "axios";
import ClientQuiz from "@/components/quiz/ClientQuiz";
import he from "he"; // Library untuk mendecode HTML entities
import { categories } from "@/data/categories"; // Impor categories

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionsPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    difficulty?: string;
  };
}

const MAX_RETRIES = 3; // Jumlah maksimal percobaan ulang

const fetchQuestions = async (
  categoryId: number,
  difficulty: string
): Promise<Question[]> => {
  let attempts = 0;
  let success = false;
  let questions: Question[] = [];

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (attempts < MAX_RETRIES && !success) {
    try {
      const response = await axios.get<{ results: Question[] }>(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      );

      if (response.data.results.length === 0) {
        throw new Error(
          "Tidak ada pertanyaan ditemukan untuk kategori dan tingkat kesulitan ini."
        );
      }

      // Dekode karakter HTML entities
      questions = response.data.results.map((q) => ({
        ...q,
        question: he.decode(q.question),
        correct_answer: he.decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((ans) => he.decode(ans)),
      }));

      success = true;
    } catch (err) {
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
        throw new Error(
          "Terjadi kesalahan saat mengambil pertanyaan. Silakan coba lagi nanti."
        );
      }
    }
  }

  return questions;
};

const QuestionsPage: React.FC<QuestionsPageProps> = async ({
  params,
  searchParams,
}) => {
  const slug = params.slug;
  const difficulty = searchParams.difficulty || "easy";

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return <div className="p-4 text-red-500">Kategori tidak ditemukan.</div>;
  }

  let questions: Question[] = [];

  try {
    questions = await fetchQuestions(category.id, difficulty);
    console.log("Questions fetched successfully");
  } catch (error) {
    return <div className="p-4 text-red-500">{(error as Error).message}</div>;
  }

  return (
    <div className="p-4 flex flex-col flex-grow">
      <h1 className="text-2xl font-bold mb-4">
        Quiz: {category.name} -{" "}
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </h1>
      <ClientQuiz questions={questions} slug={slug} />
    </div>
  );
};

export default QuestionsPage;
