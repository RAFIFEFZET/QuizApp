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
    <footer className="p-6 bg-background/40 backdrop-blur-md border-t border-primary/10 text-center">
      {/* Bungkus HoverCard dengan div berkelas inline-flex dan relative */}
      <div className="inline-flex relative">
        <HoverCard>
          {/* HoverCardTrigger membungkus link GitHub */}
          <HoverCardTrigger asChild>
            <a
              href="https://github.com/RAFIFEFZET" // Ganti dengan URL GitHub Anda
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
            >
              <FaGithub className="h-6 w-6 mr-2" /> © 2024 RAFIFEFZET
            </a>
          </HoverCardTrigger>

          {/* HoverCardContent dengan posisi absolute agar tidak melebar ke footer */}
          <HoverCardContent className="z-10 bg-background/80 backdrop-blur-md border border-primary/20">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              About Me
            </h3>
            <p className="text-sm mt-2">
              I'm currently learning and exploring Next.js. Check out my GitHub
              profile for my latest projects and contributions.
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <label className="font-semibold mb-2 text-primary/80">
                  Check out my other NextJs Project
                </label>
                <div className="mt-2 mb-2">
                  <a
                    href="https://music-player-eight-olive.vercel.app/" // Replace with your repository
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-md text-primary hover:bg-primary/20 transition-colors"
                  >
                    <FaMusic className="h-4 w-4" /> Music Player
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
