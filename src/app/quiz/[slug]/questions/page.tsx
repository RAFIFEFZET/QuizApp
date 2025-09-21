// app/quiz/[slug]/questions/page.tsx

import axios, { AxiosError } from "axios";
import ClientQuiz from "@/components/quiz/ClientQuiz";
import he from "he"; // Library untuk mendecode HTML entities
import { categories } from "@/data/categories";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionsPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ difficulty?: string }>;
}

const MAX_RETRIES = 3; // Jumlah maksimal percobaan ulang

const cache: { [key: string]: Question[] } = {};

const fetchQuestions = async (
  categoryId: number,
  difficulty: string
): Promise<Question[]> => {
  const cacheKey = `${categoryId}-${difficulty}`;

  // Cek apakah data sudah ada di cache
  if (cache[cacheKey]) {
    console.log("Fetching questions from cache");
    return cache[cacheKey];
  }

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

      // Simpan ke cache
      cache[cacheKey] = questions;
    } catch (err) {
      attempts += 1;

      // Tangani error sebagai AxiosError
      const axiosError = err as AxiosError;

      if (axiosError.response) {
        // Server merespons dengan status code lainnya selain 2xx
        console.error(
          `Error: ${axiosError.response.status} - ${axiosError.response.statusText}`
        );
      } else if (axiosError.request) {
        // Permintaan dibuat tapi tidak ada respons
        console.error("Error: No response received from the server.");
      } else {
        // Terjadi kesalahan saat mengatur permintaan
        console.error("Error:", axiosError.message);
      }

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

// Ubah ke fungsi standar dan destructure di dalam fungsi
export default async function QuestionsPage(props: QuestionsPageProps) {
  // Await params and searchParams
  const params = await props.params;
  const searchParams = await props.searchParams;

  const slug = params.slug;
  const difficulty = searchParams.difficulty || "easy";

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return <div className="p-8 text-center text-red-500 text-xl font-medium">Kategori tidak ditemukan.</div>;
  }

  let questions: Question[] = [];

  try {
    questions = await fetchQuestions(category.id, difficulty);
    console.log("Questions fetched successfully");
  } catch (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-lg p-6 border-2 border-red-400 rounded-xl shadow-lg bg-background/90">
          <div className="text-center text-red-500 text-xl font-medium">
            {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 flex flex-col items-center min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="w-full max-w-4xl">
        <div className="mb-6 p-4 bg-primary/10 backdrop-blur-sm rounded-lg shadow-md border border-primary/30">
          <h1 className="text-3xl font-bold text-center">
            <span className="text-primary">{category.name}</span>
            <span className="mx-2">•</span>
            <span className="text-primary/80">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
          </h1>
        </div>
        <ClientQuiz questions={questions} slug={slug} difficulty={difficulty} />
      </div>
    </div>
  );
}
