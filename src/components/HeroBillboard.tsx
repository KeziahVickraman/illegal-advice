import React from "react";
import confetti from "canvas-confetti";
import { Phone, Sparkles, Scale, MessageSquare, ArrowDown, ShieldAlert, Award } from "lucide-react";
import { LawyerGraphic } from "./LawyerGraphic";
import { playLaughTrack, playPhoneRing } from "../utils/audio";

interface HeroBillboardProps {
  onOpenChat: () => void;
}

export function HeroBillboard({ onOpenChat }: HeroBillboardProps) {
  const triggerConsultFun = () => {
    playLaughTrack();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ef4444", "#f59e0b", "#3b82f6", "#ffffff"]
    });
    onOpenChat();
  };

  const handlePhoneClick = () => {
    playPhoneRing();
    onOpenChat();
  };

  return (
    <section
      aria-label="Not Guilty-ish Legal Main Billboard"
      className="relative pt-6 pb-16 px-4 bg-gradient-to-b from-blue-900 via-blue-950 to-neutral-900 text-white overflow-hidden"
    >
      {/* Tacky strip-mall flashing light bulb marquee top/bottom */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-neutral-900 flex justify-between px-2 overflow-hidden select-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full my-auto ${
              i % 2 === 0 ? "bg-yellow-300 animate-bulb-slow" : "bg-red-500 animate-bulb-fast"
            }`}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto pt-6">
        {/* Strip-mall Mall Plaque Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400 text-neutral-950 font-billboard text-sm sm:text-base uppercase tracking-wider rounded-md border-2 border-black retro-shadow-black">
            <Sparkles className="w-4 h-4 text-red-600 animate-spin-slow" />
            Suite 4B • Located Behind The 24-Hour Panda Wok • Validated Parking (First 4 Minutes)
          </div>
        </div>

        {/* GIANT BILLBOARD CONTAINER */}
        <div className="relative bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 text-neutral-950 border-8 border-yellow-300 rounded-3xl p-6 sm:p-10 md:p-12 retro-shadow-lg ring-8 ring-red-600 overflow-hidden">
          {/* Tacky billboard grid lines / metal scaffold feel */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Starburst: FREE CONSULT* */}
          <div className="absolute -top-3 -right-3 sm:top-4 sm:right-6 z-20 transform rotate-12 hover:rotate-6 transition-transform">
            <button
              onClick={triggerConsultFun}
              className="clip-starburst bg-red-600 hover:bg-red-500 text-white w-32 h-32 sm:w-40 sm:h-40 p-4 flex flex-col items-center justify-center text-center shadow-2xl cursor-pointer border-2 border-yellow-200"
              aria-label="Free consultation offer details"
            >
              <span className="font-billboard text-xl sm:text-2xl leading-none uppercase text-yellow-300">
                FREE*
              </span>
              <span className="font-billboard text-lg sm:text-xl leading-none uppercase text-white mt-0.5">
                CONSULT
              </span>
              <span className="text-[9px] font-sans font-bold leading-tight mt-1 text-yellow-200">
                *First 9 seconds only
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content (Billboard Headline & Punchlines) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Firm Name Badge */}
              <div className="inline-block bg-neutral-900 text-yellow-400 px-4 py-1.5 rounded-lg border-2 border-black font-billboard text-lg sm:text-2xl tracking-wider uppercase retro-shadow-black">
                ⚖️ NOT GUILTY-ISH LEGAL
              </div>

              {/* Prominent Catchphrase */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-billboard uppercase tracking-tight text-neutral-950 leading-[0.95] drop-shadow-sm">
                "JUST BECAUSE <span className="text-red-700 underline decoration-yellow-600">YOU DID IT</span> DOESN'T MEAN YOU'RE <span className="text-blue-900 bg-white/70 px-2 rounded-md">GUILTY.</span>"
              </h1>

              {/* Subtitle Pitch */}
              <p className="text-base sm:text-xl font-bold text-neutral-900 max-w-xl leading-snug">
                Did you accidentally borrow something forever? Was the surveillance footage taken by an astigmatic owl? At Not Guilty-ish, we specialize in high-voltage reasonable doubt, comedic legal education, and strip-mall justice!
              </p>

              {/* Call to Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={onOpenChat}
                  className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-billboard text-2xl uppercase tracking-wider rounded-2xl border-4 border-black retro-shadow-black transition-all transform hover:scale-105 active:scale-95 animate-pulse cursor-pointer flex items-center justify-center gap-3"
                  aria-label="Call now or scroll to intake chat"
                >
                  <Phone className="w-6 h-6 animate-bounce" />
                  <span>CALL NOW (or don't, we're not your boss)</span>
                </button>

                <button
                  onClick={handlePhoneClick}
                  className="w-full sm:w-auto px-6 py-4 bg-blue-900 hover:bg-blue-800 text-yellow-300 font-billboard text-xl uppercase tracking-wider rounded-2xl border-4 border-black retro-shadow-black transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                  aria-label="Direct phone line badge"
                >
                  <span>1-800-ISH-LEGAL</span>
                </button>
              </div>

              {/* Tiny Absurd Asterisk Footnote */}
              <div className="text-[11px] font-mono text-neutral-800 leading-tight bg-yellow-200/90 p-3 rounded-lg border border-neutral-900/40">
                <strong>*MANDATORY ABSURD ASTERISK:</strong> Free consult strictly limited to the first 9 seconds or until our microwave finishes reheating yesterday's egg roll, whichever occurs first. Not valid in international waters, commercial aviation airspace, or small claims court against our landlord. Not real legal advice.
              </div>
            </div>

            {/* Right Content (Oversized Pointing Lawyer Illustration) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[380px] sm:max-w-[420px] relative">
                <LawyerGraphic className="w-full" />

                {/* Bus-Bench Plaque Under Headshot */}
                <div className="mt-3 bg-neutral-900 text-yellow-300 border-3 border-black p-3 rounded-xl text-center retro-shadow-black">
                  <span className="block font-billboard text-xl tracking-wider uppercase text-white">
                    SAL "THE BENCH-PRESS" VANCE, ESQ-ISH
                  </span>
                  <span className="text-xs font-semibold text-yellow-400">
                    "I don't look back at the scene, I look at the legal technicalities!"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick jump anchor strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <a
            href="#law-school-section"
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800/80 hover:bg-neutral-700 text-yellow-400 rounded-full border border-yellow-400/30 transition-colors"
          >
            <Scale className="w-4 h-4 text-red-500" />
            Law School In 60 Seconds
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#business-cards-section"
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800/80 hover:bg-neutral-700 text-yellow-400 rounded-full border border-yellow-400/30 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Tacky Business Card Wall
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#office-tour-section"
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800/80 hover:bg-neutral-700 text-yellow-400 rounded-full border border-yellow-400/30 transition-colors"
          >
            Office Tour
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#real-help-footer"
            className="flex items-center gap-1.5 px-4 py-2 bg-red-900/90 hover:bg-red-800 text-white rounded-full border border-red-500 transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-yellow-300" />
            Need Real Legal Aid? (PDO / CLAS)
          </a>
        </div>
      </div>
    </section>
  );
}
