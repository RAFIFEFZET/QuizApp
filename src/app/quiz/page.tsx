// app/quiz/page.tsx
// Halaman untuk memilih kategori kuis (QuizCategoryPage)
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Definisikan tipe untuk kategori
interface Category {
  id: number;
  name: string;
  slug: string;
}

// Daftar kategori dengan properti slug
const categories: Category[] = [
  { id: 9, name: "General Knowledge", slug: "general-knowledge" },
  {
    id: 15,
    name: "Entertainment: Video Games",
    slug: "entertainment-video-games",
  },
  {
    id: 31,
    name: "Entertainment: Anime & Manga",
    slug: "entertainment-anime-manga",
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations",
    slug: "entertainment-cartoon-animations",
  },
  // Tambahkan kategori lainnya sesuai kebutuhan
];

const QuizCategoryPage: React.FC = () => {
  const router = useRouter();

  // Fungsi untuk menangani pemilihan kategori menggunakan slug
  const handleCategorySelect = (slug: string) => {
    router.push(`/quiz/${slug}/difficulty`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pilih Kategori Kuis</h1>
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <Button onClick={() => handleCategorySelect(category.slug)}>
            {category.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuizCategoryPage;
