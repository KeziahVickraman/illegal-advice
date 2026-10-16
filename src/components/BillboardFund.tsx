import React, { useState } from "react";
import confetti from "canvas-confetti";
import { DollarSign, TrendingUp, AlertTriangle, Sparkles, MapPin, Check } from "lucide-react";
import { playKaChing, playLaughTrack } from "../utils/audio";

export function BillboardFund() {
  const [raised, setRaised] = useState(142.5);
  const [donationCount, setDonationCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showMockup, setShowMockup] = useState(false);

  const GOAL = 4500.0;
  const percentage = Math.min(100, (raised / GOAL) * 100);

  const handleDonate = (amount: number) => {
    playKaChing();
    const newRaised = +(raised + amount).toFixed(2);
    setRaised(newRaised);
    const newCount = donationCount + 1;
    setDonationCount(newCount);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#facc15", "#eab308", "#ca8a04"]
    });

    const targetYear = 2092 - Math.min(40, newCount * 2);
    const months = ["January", "April", "June", "September", "November"];
    const randomMonth = months[newCount % months.length];

    setToastMessage(
      `🎉 Sal thanks you for your generous $${amount.toFixed(2)} contribution! Projected billboard completion date officially accelerated to ${randomMonth} ${targetYear}!`
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <section
      id="billboard-fund-section"
      aria-labelledby="billboard-fund-heading"
      className="py-16 px-4 bg-amber-400 dark:bg-amber-600 border-b-4 border-black text-black transition-colors"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-neutral-900 border-4 border-black rounded-2xl p-6 sm:p-10 retro-shadow-lg text-neutral-900 dark:text-neutral-100">
          {/* Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white font-billboard text-base uppercase rounded border-2 border-black retro-shadow-black">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Capital Expansion Campaign
            </span>
            <span className="text-xs font-mono font-bold bg-yellow-300 text-black px-2.5 py-1 rounded border border-black">
              Location: Interstate 95, Mile Marker 42 (Dreaming)
            </span>
          </div>

          <h2
            id="billboard-fund-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-billboard uppercase tracking-wide text-neutral-900 dark:text-yellow-400"
          >
            The Giant Highway Billboard Dream Fund
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
            Bus benches are fine, but true constitutional glory belongs on a 48-foot weatherproof illuminated steel monolith towering over 8 lanes of rush-hour traffic. We are painfully close!
          </p>

          {/* Progress Bar Display */}
          <div className="mt-8 bg-neutral-100 dark:bg-neutral-800 p-6 rounded-xl border-3 border-black">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-neutral-500 dark:text-neutral-400">
                  Total Warchest Amassed
                </span>
                <div className="text-4xl sm:text-5xl font-billboard text-red-600 dark:text-red-400">
                  ${raised.toFixed(2)}{" "}
                  <span className="text-lg text-neutral-600 dark:text-neutral-400 font-sans font-normal">
                    / ${GOAL.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-billboard text-amber-500">
                  {percentage.toFixed(1)}% FUNDED
                </span>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  (Stuck here since November 2021)
                </div>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-neutral-300 dark:bg-neutral-700 h-8 rounded-full border-2 border-black overflow-hidden p-0.5 relative">
              <div
                className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-black text-black"
                style={{ width: `${Math.max(4, percentage)}%` }}
                role="progressbar"
                aria-valuenow={raised}
                aria-valuemin={0}
                aria-valuemax={GOAL}
                aria-label="Billboard fund progress"
              >
                ★
              </div>
            </div>

            {/* Breakdown */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-neutral-300 dark:border-neutral-700 text-xs">
              <div className="bg-white dark:bg-neutral-900 p-2 rounded border border-black/20">
                <span className="font-bold text-red-600">3%</span> Billboard Steel
              </div>
              <div className="bg-white dark:bg-neutral-900 p-2 rounded border border-black/20">
                <span className="font-bold text-amber-500">55%</span> Glossy Stickers
              </div>
              <div className="bg-white dark:bg-neutral-900 p-2 rounded border border-black/20">
                <span className="font-bold text-blue-500">25%</span> Instant Noodles
              </div>
              <div className="bg-white dark:bg-neutral-900 p-2 rounded border border-black/20">
                <span className="font-bold text-purple-500">17%</span> Hair Pomade
              </div>
            </div>
          </div>

          {/* Toast feedback */}
          {toastMessage && (
            <div className="mt-4 p-3 bg-yellow-300 text-black border-2 border-black rounded-lg font-bold text-sm shadow animate-bounce">
              {toastMessage}
            </div>
          )}

          {/* Interactive Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleDonate(0.05)}
                className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-billboard text-lg uppercase tracking-wide rounded-lg border-2 border-black retro-shadow-black transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                aria-label="Contribute 5 cents to billboard dream fund"
              >
                <DollarSign className="w-4 h-4" />
                Contribute $0.05
              </button>
              <button
                onClick={() => handleDonate(0.25)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-billboard text-lg uppercase tracking-wide rounded-lg border-2 border-black retro-shadow-black transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                aria-label="Contribute 25 cents to billboard dream fund"
              >
                <DollarSign className="w-4 h-4" />
                High Roller ($0.25)
              </button>
            </div>

            <button
              onClick={() => {
                setShowMockup(!showMockup);
                playLaughTrack();
              }}
              className="text-xs sm:text-sm font-bold text-blue-600 dark:text-yellow-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              {showMockup ? "Hide Billboard Blueprints" : "Preview The 48-Foot Billboard Mockup 👁️"}
            </button>
          </div>

          {/* Billboard Mockup Preview */}
          {showMockup && (
            <div className="mt-6 p-6 bg-gradient-to-b from-sky-400 to-sky-600 rounded-xl border-4 border-black text-white retro-shadow-black relative">
              <div className="text-center">
                <span className="bg-red-600 text-white font-billboard text-xs px-2 py-0.5 rounded border border-black uppercase">
                  ARTIST'S CONCEPTUAL RENDITION (YEAR 2092)
                </span>
                <div className="mt-4 bg-yellow-400 text-black border-4 border-black p-6 rounded-lg retro-shadow-black">
                  <h3 className="font-billboard text-3xl sm:text-5xl uppercase text-red-600 leading-none">
                    JUST BECAUSE YOU DID IT...
                  </h3>
                  <h4 className="font-billboard text-2xl sm:text-4xl uppercase text-neutral-900 mt-1">
                    DOESN'T MEAN YOU'RE GUILTY!
                  </h4>
                  <div className="mt-3 flex items-center justify-around font-anton text-lg text-blue-900">
                    <span>CALL SAL!</span>
                    <span className="text-red-700">1-800-ISH-LEGAL</span>
                    <span>EXIT 4B (BEHIND PANDA WOK)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
