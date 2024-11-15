// app/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/home/MainContent";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push("/quiz");
  };

  return (
    <div className="p-4">
      {/* Konten Utama */}
      <MainContent handleStartQuiz={handleStartQuiz} />
    </div>
  );
};

export default HomePage;
