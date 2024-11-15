// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/home/Header";
import MainContent from "@/components/home/MainContent";
import Footer from "@/components/home/Footer";

const HomePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push("/quiz");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Mengelola penambahan/menghapus kelas 'dark' pada elemen root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen justify-between bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Konten Utama */}
      <MainContent handleStartQuiz={handleStartQuiz} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
