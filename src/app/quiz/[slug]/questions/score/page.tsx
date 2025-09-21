// app/quiz/[slug]/questions/score/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import gifsData from "@/data/gifs.json";
import { Button } from "@/components/ui/button";

const ScorePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const score = parseInt(searchParams.get("score") || "0", 10);
  const total = parseInt(searchParams.get("total") || "10", 10);
  const slug = params.slug;

  // Validasi skor dan total
  const isValid = !(isNaN(score) || isNaN(total) || total <= 0);

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
  let message = "Good effort!";
  if (category === "perfect") {
    message = "Gyattt Damn";
  } else if (category === "good") {
    message = "I mean... Thats Alrigth";
  } else if (category === "average") {
    message = "Hop On StudyTok";
  } else {
    message = "You're cooked dawg☠️";
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

  const difficulty = searchParams.get("difficulty") || "easy";

  // Calculate percentage for better visualization
  const percentage = Math.round((score / total) * 100);

  // Determine color based on score percentage
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-blue-500";
    if (percentage >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-b from-background to-background/90">
      <div className="w-full max-w-lg p-8 border-2 border-primary/30 rounded-xl shadow-lg bg-card/60 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Skor Kamu</h1>

        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Circular progress indicator */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={getScoreColor()}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${
                  2 * Math.PI * 40 * (1 - percentage / 100)
                }`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            {/* Score text in the center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>
                {percentage}%
              </span>
              <span className="text-sm opacity-70">
                {score}/{total} benar
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-2xl font-semibold mb-3">
            {isValid ? message : "Invalid score or total."}
          </p>
          <p className="text-sm opacity-70">
            Kategori: {category.charAt(0).toUpperCase() + category.slice(1)} •
            Level: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </p>
        </div>

        {isValid && (
          <>
            {/* Tampilkan GIF berdasarkan skor setelah gifSrc ditentukan */}
            {gifSrc ? (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={gifSrc}
                  alt="Score GIF"
                  width={400}
                  height={300}
                  className="w-full object-cover"
                  unoptimized={true}
                />
              </div>
            ) : (
              <div className="w-full h-64 mb-8 bg-gray-200 animate-pulse rounded-lg"></div>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={handleRetakeQuiz}
                className="flex-1 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Coba Lagi
              </Button>

              <Button
                onClick={() => router.push(`/quiz/${slug}/difficulty`)}
                variant="outline"
                className="flex-1 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-primary/10"
              >
                Ubah Level
              </Button>

              <Button
                onClick={() => router.push("/quiz")}
                variant="ghost"
                className="flex-1 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-primary/5"
              >
                Kategori Lain
              </Button>
            </div>
          </>
        )}

        {!isValid && (
          <Button
            onClick={() => router.push("/")}
            className="w-full py-6 text-lg font-medium"
          >
            Kembali ke Beranda
          </Button>
        )}

        <div className="mt-8 pt-4 border-t border-primary/10 text-center text-sm opacity-70">
          <p>Bagikan skor kamu:</p>
          <div className="flex justify-center gap-4 mt-2">
            {/* Social share buttons (non-functional for demo) */}
            <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              <span role="img" aria-label="share">
                📱
              </span>
            </button>
            <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
              <span role="img" aria-label="whatsapp">
                📢
              </span>
            </button>
            <button className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors">
              <span role="img" aria-label="copy">
                📋
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
