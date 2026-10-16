import React from "react";
import { Scale, Moon, Sun, Volume2, VolumeX, MessageSquare, ShieldAlert } from "lucide-react";
import { playLaughTrack } from "../utils/audio";

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenChat: () => void;
}

export function Navbar({
  isDarkMode,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenChat
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b-4 border-yellow-400 text-white px-4 py-3 shadow-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-lg p-1"
          aria-label="Not Guilty-ish Legal Home"
        >
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg border-2 border-black retro-shadow-gold text-black">
            <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-billboard text-xl sm:text-2xl uppercase tracking-wider text-yellow-300 group-hover:text-yellow-200 transition-colors leading-none">
              NOT GUILTY-ISH LEGAL
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-tight">
              Reasonable Doubt At Strip-Mall Prices
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-5 text-xs font-bold uppercase tracking-wider">
          <a
            href="#law-school-section"
            className="text-neutral-300 hover:text-yellow-400 transition-colors py-1 border-b-2 border-transparent hover:border-yellow-400"
          >
            Law In 60s
          </a>
          <a
            href="#business-cards-section"
            className="text-neutral-300 hover:text-yellow-400 transition-colors py-1 border-b-2 border-transparent hover:border-yellow-400"
          >
            Card Wall
          </a>
          <a
            href="#office-tour-section"
            className="text-neutral-300 hover:text-yellow-400 transition-colors py-1 border-b-2 border-transparent hover:border-yellow-400"
          >
            Office Tour
          </a>
          <a
            href="#billboard-fund-section"
            className="text-neutral-300 hover:text-yellow-400 transition-colors py-1 border-b-2 border-transparent hover:border-yellow-400"
          >
            Billboard Fund
          </a>
          <a
            href="#real-help-footer"
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 py-1"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Real Help (PDO/CLAS)
          </a>
        </nav>

        {/* Right Controls: Theme, Sound, Chat Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound FX Button */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                playLaughTrack();
              }
            }}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 text-yellow-400 rounded-lg border border-neutral-700 transition-transform active:scale-95 cursor-pointer"
            title={soundEnabled ? "Mute Sitcom Audio" : "Enable Sitcom Audio"}
            aria-label={soundEnabled ? "Mute Sitcom Audio" : "Enable Sitcom Audio"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 text-yellow-400 rounded-lg border border-neutral-700 transition-transform active:scale-95 cursor-pointer"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-sky-300" />}
          </button>

          {/* Open Chat Clipboard */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-billboard text-base sm:text-lg uppercase tracking-wider rounded-lg border-2 border-black retro-shadow-black transition-transform active:translate-y-0.5 cursor-pointer"
            aria-label="Open front-desk intake chat clipboard"
          >
            <MessageSquare className="w-4 h-4 text-red-600" />
            <span>Chat Desk 📋</span>
          </button>
        </div>
      </div>
    </header>
  );
}
