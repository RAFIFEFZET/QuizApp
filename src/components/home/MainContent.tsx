// app/components/home/MainContent.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { FaBrain, FaLightbulb, FaTrophy } from "react-icons/fa";

interface MainContentProps {
  handleStartQuiz: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ handleStartQuiz }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      {/* Main content container with glassmorphism effect */}
      <div className="w-full max-w-4xl bg-background/50 backdrop-blur-lg rounded-3xl border border-white/10 shadow-xl px-8 py-10 mb-12">
        {/* Judul dengan Ikon */}
        <div className="flex flex-col items-center mb-10">
          <div className="p-5 bg-primary/10 rounded-full mb-5">
            <HiMiniAcademicCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="font-poppins text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Quiz App
          </h1>
        </div>

        {/* Deskripsi */}
        <p className="font-poppins text-xl md:text-2xl text-center mb-12 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
          Selamat datang di Quiz App eksperimen menggunakan Next.js!👋👋
          <br />
          Ini adalah proyek coba-coba untuk mengeksplorasi fitur-fitur Next.js
          sekaligus membuat kuis yang menyenangkan menggunakan shadcn-ui.
        </p>
      </div>

      {/* Features section with glassmorphism cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-background/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <FaBrain className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">
            Berbagai Kategori
          </h3>
          <p className="text-center text-muted-foreground">
            Pilih dari berbagai kategori kuis yang menarik
          </p>
        </div>

        <div className="bg-background/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-500/10 rounded-full">
              <FaLightbulb className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">
            Tingkat Kesulitan
          </h3>
          <p className="text-center text-muted-foreground">
            Tantang dirimu dengan berbagai level kesulitan
          </p>
        </div>

        <div className="bg-background/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-500/10 rounded-full">
              <FaTrophy className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Lihat Skor</h3>
          <p className="text-center text-muted-foreground">
            Dapatkan hasil langsung dengan GIF menarik
          </p>
        </div>
      </div>

      {/* Tombol Start */}
      <Button
        onClick={handleStartQuiz}
        className="px-10 py-7 text-xl font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
      >
        Mulai Quiz
      </Button>
    </div>
  );
};

export default MainContent;
