// app/components/home/Footer.tsx
"use client";

import React from "react";
import { FaGithub, FaMusic } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-700 dark:bg-gray-800 text-center">
      {/* Bungkus HoverCard dengan div berkelas inline-flex dan relative */}
      <div className="inline-flex relative">
        <HoverCard>
          {/* HoverCardTrigger membungkus link GitHub */}
          <HoverCardTrigger asChild>
            <a
              href="https://github.com/RAFIFEFZET" // Ganti dengan URL GitHub Anda
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-blue-400 hover:underline"
            >
              <FaGithub className="h-6 w-6 mr-2" /> © 2024 RAFIFEFZET
            </a>
          </HoverCardTrigger>

          {/* HoverCardContent dengan posisi absolute agar tidak melebar ke footer */}
          <HoverCardContent className="z-10">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-sm">
              I'm currently learning and exploring Next.js. Check out my GitHub
              profile for my latest projects and contributions.
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <label className="font-semibold mb-2" htmlFor="">
                  Check out my other NextJs Project
                </label>
                <div className="mt-2 mb-2">
                  <a
                    href="https://music-player-eight-olive.vercel.app/" // Replace with your repository
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-blue-400 hover:underline"
                  >
                    Music Player <FaMusic className="inline" />
                  </a>
                </div>
              </li>
              {/* Add more project links if needed */}
            </ul>
          </HoverCardContent>
        </HoverCard>
      </div>
    </footer>
  );
};

export default Footer;
