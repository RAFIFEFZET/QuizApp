// app/components/home/Header.tsx
"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="w-full flex justify-between items-center p-6">
      <div className="flex items-center">
        <span className="font-semibold text-lg bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Quiz App
        </span>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-full backdrop-blur-md bg-background/40 border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none"
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
      >
        {darkMode ? (
          <FaSun className="text-amber-400 w-5 h-5" />
        ) : (
          <FaMoon className="text-primary w-5 h-5" />
        )}
      </button>
    </header>
  );
};

export default Header;
