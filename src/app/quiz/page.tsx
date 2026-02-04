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
    <div className="relative min-h-[80vh] overflow-hidden">
      {/* Floating Shapes Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />
        
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-bounce-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
        
        {/* Decorative Shapes */}
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-primary/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-secondary/50 rounded-full animate-ping delay-500" />
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-primary/60 rounded-full animate-ping delay-700" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative p-8 flex flex-col items-center justify-center min-h-[80vh]">
        {/* Title with Animation */}
        <div className="animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Pilih Kategori Kuis
          </h1>
          <p className="text-muted-foreground text-center mb-8 text-lg">
            Pilih kategori yang ingin kamu tantang! 🎯
          </p>
        </div>

        {/* Category Cards */}
        <div className="w-full max-w-lg p-8 border-2 border-primary/30 rounded-2xl shadow-2xl bg-background/60 backdrop-blur-md animate-fade-in-up">
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="w-full animate-fade-in-right"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                <Button
                  onClick={() => handleCategorySelect(category.slug)}
                  className="group relative w-full py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(var(--primary-rgb)/0.3)] overflow-hidden"
                >
                  {/* Button Shine Effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10">{category.name}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Text */}
        <p className="mt-8 text-sm text-muted-foreground/60 animate-fade-in">
          ✨ {categories.length} kategori tersedia
        </p>
      </div>
    </div>
  );
};

export default QuizCategoryPage;
