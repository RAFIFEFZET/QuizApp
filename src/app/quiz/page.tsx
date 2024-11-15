// app/quiz/page.tsx
// Halaman untuk memilih kategori kuis (QuizCategoryPage)
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 31, name: "Entertainment: Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

const QuizCategoryPage = () => {
  const router = useRouter();

  const handleCategorySelect = (id: number) => {
    router.push(`/quiz/${id}/difficulty`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pilih Kategori Kuis</h1>
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <Button onClick={() => handleCategorySelect(category.id)}>
            {category.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuizCategoryPage;
