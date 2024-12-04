// app/quiz/[slug]/questions/score/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import gifsData from "@/data/gifs.json";

const ScorePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const score = parseInt(searchParams.get("score") || "0", 10);
  const total = parseInt(searchParams.get("total") || "10", 10);
  const slug = params.slug;

  // Validasi skor dan total
  if (isNaN(score) || isNaN(total) || total <= 0) {
    return <div className="p-4 text-red-500">Invalid score or total.</div>;
  }

  // Menentukan kategori skor
  let category: keyof typeof gifsData = "average";

  if (score === total) {
    category = "perfect";
  } else if (score >= Math.ceil(total * 0.7)) {
    category = "good";
  } else if (score >= Math.ceil(total * 0.4)) {
    category = "average";
  } else {
    category = "low";
  }

  // Menentukan pesan berdasarkan kategori dengan gaya Gen Z
  let message = "You did it, fam!";
  if (category === "perfect") {
    message = "Yasss! Slayed it with a perfect score!";
  } else if (category === "good") {
    message = "Lit! You did great!";
  } else if (category === "average") {
    message = "Not bad, keep hustling!";
  } else {
    message = "You're cooked";
  }

  // Inisialisasi state untuk gifSrc
  const [gifSrc, setGifSrc] = useState<string>("");

  useEffect(() => {
    const gifs = gifsData[category];
    if (gifs && gifs.length > 0) {
      const randomIndex = Math.floor(Math.random() * gifs.length);
      setGifSrc(gifs[randomIndex]);
    }
  }, [category]);

  const handleRetakeQuiz = () => {
    router.push(`/quiz/${slug}/questions`);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-6">Your Score</h1>
      <p className="text-xl mb-2">
        You scored {score} out of {total}
      </p>
      <p className="text-xl mb-4">{message}</p>
      {/* Tampilkan GIF berdasarkan skor setelah gifSrc ditentukan */}
      {gifSrc ? (
        <Image
          src={gifSrc}
          alt="Score GIF"
          width={256}
          height={256}
          className="mb-6"
        />
      ) : (
        <div className="w-64 h-64 mb-6 bg-gray-200 animate-pulse"></div>
      )}
      <button
        onClick={handleRetakeQuiz}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
};

export default ScorePage;
