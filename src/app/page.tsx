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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Konten Utama */}
      <MainContent handleStartQuiz={handleStartQuiz} />
    </div>
  );
};

export default HomePage;
