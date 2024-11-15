// app/components/home/MainContent.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { HiMiniAcademicCap } from "react-icons/hi2";

interface MainContentProps {
  handleStartQuiz: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ handleStartQuiz }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      {/* Judul dengan Ikon */}
      <div className="flex items-center mb-12">
        <HiMiniAcademicCap className="h-12 w-12 mr-4" />
        <h1 className="font-poppins text-5xl font-extrabold">Quiz App</h1>
      </div>

      {/* Deskripsi */}
      <p className="font-poppins text-xl md:text-2xl text-center mb-12 max-w-2xl px-4 sm:px-0">
        Selamat datang di Quiz App eksperimen menggunakan Next.js!👋👋
        <br />
        Ini adalah proyek coba-coba untuk mengeksplorasi fitur-fitur Next.js
        sekaligus membuat kuis yang menyenangkan menggunakan shadcn-ui. Jelajahi
        berbagai kategori pertanyaan dan uji pengetahuan Anda. Klik tombol di
        bawah untuk memulai dan nikmati pengalaman kuis interaktif yang saya
        buat!
      </p>

      {/* Tombol Start */}
      <Button
        onClick={handleStartQuiz}
        className="px-8 py-4 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 dark:bg-white-800"
      >
        Start
      </Button>
    </div>
  );
};

export default MainContent;
