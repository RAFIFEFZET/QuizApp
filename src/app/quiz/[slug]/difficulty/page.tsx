// app/quiz/[slug]/difficulty/page.tsx
"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Import mapping jika menggunakan file terpisah
// import slugToCategoryIdMap from "../../slugToCategoryIdMap";

// Mapping dari slug ke categoryId
const slugToCategoryIdMap: { [key: string]: number } = {
  "general-knowledge": 9,
  "entertainment-video-games": 15,
  "entertainment-anime-manga": 31,
  "entertainment-cartoon-animations": 32,
  // Tambahkan mapping lainnya sesuai kebutuhan
};

// Daftar tingkat kesulitan
const difficulties = ["easy", "medium", "hard"];

const DifficultySelectionPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  // Mendapatkan categoryId dari slug
  const categoryId = slugToCategoryIdMap[slug];

  const handleDifficultySelect = (difficulty: string) => {
    if (!categoryId) {
      alert(
        "Kategori tidak ditemukan. Silakan kembali dan pilih kategori yang valid."
      );
      return;
    }
    // Navigasi ke halaman pertanyaan dengan query parameter difficulty
    router.push(`/quiz/${slug}/questions?difficulty=${difficulty}`);
  };

  if (!categoryId) {
    return (
      <div className="p-8 text-red-500 text-center text-xl">
        Kategori tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Pilih Tingkat Kesulitan
      </h1>
      <div className="w-full max-w-md p-6 border-2 border-primary rounded-xl shadow-lg bg-background/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-4">
          {difficulties.map((difficulty) => (
            <div key={difficulty} className="w-full">
              <Button
                onClick={() => handleDifficultySelect(difficulty)}
                className="w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--primary-rgb)/0.8)] hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary"
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifficultySelectionPage;
