// app/quiz/page.tsx
// Halaman untuk memilih kategori kuis (QuizCategoryPage)
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories"; // Impor categories

const QuizCategoryPage: React.FC = () => {
  const router = useRouter();

  // Fungsi untuk menangani pemilihan kategori menggunakan slug
  const handleCategorySelect = (slug: string) => {
    router.push(`/quiz/${slug}/difficulty`);
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Pilih Kategori Kuis
      </h1>
      <div className="w-full max-w-md p-6 border-2 border-primary rounded-xl shadow-lg bg-background/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="w-full">
              <Button
                onClick={() => handleCategorySelect(category.slug)}
                className="w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--primary-rgb)/0.8)] hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary"
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCategoryPage;
