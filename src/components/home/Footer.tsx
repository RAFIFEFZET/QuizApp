// app/components/home/Footer.tsx
"use client";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-700 dark:bg-gray-800 text-center">
      <a
        href="https://github.com/RAFIFEFZET" // Ganti dengan URL GitHub Anda
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center text-blue-400 hover:underline"
      >
        <FaGithub className="h-6 w-6 mr-2" /> © 2024 RAFIFEFZET
      </a>
    </footer>
  );
};

export default Footer;
