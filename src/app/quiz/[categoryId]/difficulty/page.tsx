// app/quiz/[categoryId]/difficulty/page.tsx
"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const difficulties = ["easy", "medium", "hard"];

const DifficultySelectionPage = () => {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId;

  const handleDifficultySelect = (difficulty: string) => {
    router.push(`/quiz/${categoryId}/${difficulty}`);
  };

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
