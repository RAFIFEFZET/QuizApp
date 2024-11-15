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
    return <div className="p-4 text-red-500">Kategori tidak ditemukan.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pilih Tingkat Kesulitan</h1>
      {difficulties.map((difficulty) => (
        <div key={difficulty} className="mb-2">
          <Button onClick={() => handleDifficultySelect(difficulty)}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DifficultySelectionPage;
