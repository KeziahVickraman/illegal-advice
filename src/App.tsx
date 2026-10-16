import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { SceneIntroStrip } from "./components/SceneIntroStrip";
import { HeroBillboard } from "./components/HeroBillboard";
import { LawSchoolFlipCards } from "./components/LawSchoolFlipCards";
import { BusinessCardWall } from "./components/BusinessCardWall";
import { OfficeTour } from "./components/OfficeTour";
import { BillboardFund } from "./components/BillboardFund";
import { IntakeChatClipboard } from "./components/IntakeChatClipboard";
import { RealHelpFooter } from "./components/RealHelpFooter";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Set initial theme based on system preference or default
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
    // Smooth scroll down slightly if on mobile
    const chatEl = document.getElementById("intake-chat-widget");
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-yellow-300 selection:text-black">
      {/* Sitcom Stage Top Banner */}
      <SceneIntroStrip />

      {/* Main Top Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenChat={handleOpenChat}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 1. Hero Billboard */}
        <HeroBillboard onOpenChat={handleOpenChat} />

        {/* 2. Law School in 60 Seconds (4 3D Flip Cards) */}
        <LawSchoolFlipCards />

        {/* 3. Business Card Wall */}
        <BusinessCardWall />

        {/* 4. Strip-Mall Office Tour Gallery */}
        <OfficeTour />

        {/* 5. Highway Billboard Dream Fund (Sad Progress Bar) */}
        <BillboardFund />
      </main>

      {/* 6. Front-Desk Sign-In Clipboard Chat Widget (Gemini Powered) */}
      <IntakeChatClipboard
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
      />

      {/* 7. Real Help Footer (Serious, Dignified, Clearly Separated) */}
      <RealHelpFooter />
    </div>
  );
}
