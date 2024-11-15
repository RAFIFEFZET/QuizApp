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
    <header className="w-full flex justify-end p-4">
      <button
        onClick={toggleDarkMode}
        className={`p-3 rounded-full shadow-lg transition-colors duration-300 focus:outline-none ${
          darkMode ? "bg-white hover:bg-gray-200" : "bg-black hover:bg-gray-800"
        }`}
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
      >
        {darkMode ? (
          <FaSun className="text-yellow-500 w-6 h-6" />
        ) : (
          <FaMoon className="text-white w-6 h-6" />
        )}
      </button>
    </header>
  );
};

export default Header;
