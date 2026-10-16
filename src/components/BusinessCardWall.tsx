import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Printer, Sparkles, Copy, Check, Phone, ShieldCheck } from "lucide-react";
import { playKaChing } from "../utils/audio";

interface BusinessCard {
  id: string;
  slogan: string;
  subtext: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}

const INITIAL_CARDS: BusinessCard[] = [
  {
    id: "card-1",
    slogan: "Just because you did it doesn't mean you're guilty.",
    subtext: "Reasonable doubt delivered fresh daily behind the dry cleaners.",
    bgColor: "bg-amber-100 dark:bg-amber-950",
    borderColor: "border-amber-600",
    accentColor: "text-amber-800 dark:text-amber-300"
  },
  {
    id: "card-2",
    slogan: "Caught red-handed? We argue your hands were actually maroon!",
    subtext: "Color theory is a recognized legal defense in our hearts.",
    bgColor: "bg-red-100 dark:bg-red-950",
    borderColor: "border-red-600",
    accentColor: "text-red-800 dark:text-red-300"
  },
  {
    id: "card-3",
    slogan: "Were you there? Probably! Can they prove it? Not on my watch!",
    subtext: "Alibis baked from scratch while you wait.",
    bgColor: "bg-blue-100 dark:bg-blue-950",
    borderColor: "border-blue-600",
    accentColor: "text-blue-800 dark:text-blue-300"
  },
  {
    id: "card-4",
    slogan: "We treat your misdemeanor like our mom made it!",
    subtext: "With extra care and a side of aggressive objections.",
    bgColor: "bg-emerald-100 dark:bg-emerald-950",
    borderColor: "border-emerald-600",
    accentColor: "text-emerald-800 dark:text-emerald-300"
  },
  {
    id: "card-5",
    slogan: "If the glove doesn't fit... we buy cheaper gloves in bulk!",
    subtext: "Discounts available if you bring your own notary.",
    bgColor: "bg-purple-100 dark:bg-purple-950",
    borderColor: "border-purple-600",
    accentColor: "text-purple-800 dark:text-purple-300"
  },
  {
    id: "card-6",
    slogan: "We put the 'con' in confidential attorney-client privilege!",
    subtext: "What you whisper to our fake ficus tree stays in the strip mall.",
    bgColor: "bg-yellow-100 dark:bg-yellow-950",
    borderColor: "border-yellow-600",
    accentColor: "text-yellow-800 dark:text-yellow-300"
  }
];

const SLOGAN_GENERATOR_BANK = [
  { slogan: "Speeding? The radar gun was dazzled by your radiant smile!", subtext: "Scientific defense pending further research." },
  { slogan: "Did you sign a confession? Don't worry, my pen ran out of ink!", subtext: "Handwriting challenges are our specialty." },
  { slogan: "The prosecution has 12 binders. We have one really confident grin.", subtext: "Charisma over paperwork every single Tuesday." },
  { slogan: "Trespassing? You were simply testing their perimeter security for free!", subtext: "Invoice the property owner for consulting fees." },
  { slogan: "No case too petty, no strip mall too far from the highway!", subtext: "Park in spot 4B or risk municipal towing." },
  { slogan: "You don't need a Harvard lawyer. You need a guy with bus-bench equity!", subtext: "Tuition is expensive; bus benches are forever." },
  { slogan: "Eyewitness saw you? Ask them to describe your socks under oath!", subtext: "Cross-examination by pure bewilderment." },
  { slogan: "Not Guilty-ish: When you're 90% innocent and 10% creatively misunderstood.", subtext: "Ask about our seasonal plea bargain combos." }
];

export function BusinessCardWall() {
  const [cards, setCards] = useState<BusinessCard[]>(INITIAL_CARDS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const printNewCard = () => {
    setIsPrinting(true);
    playKaChing();

    // Trigger celebratory confetti from button position
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#fbbf24"]
    });

    setTimeout(() => {
      const randomTemplate = SLOGAN_GENERATOR_BANK[Math.floor(Math.random() * SLOGAN_GENERATOR_BANK.length)];
      const colorPalettes = [
        { bg: "bg-amber-100 dark:bg-amber-950", border: "border-amber-600", accent: "text-amber-800 dark:text-amber-300" },
        { bg: "bg-rose-100 dark:bg-rose-950", border: "border-rose-600", accent: "text-rose-800 dark:text-rose-300" },
        { bg: "bg-cyan-100 dark:bg-cyan-950", border: "border-cyan-600", accent: "text-cyan-800 dark:text-cyan-300" },
        { bg: "bg-lime-100 dark:bg-lime-950", border: "border-lime-600", accent: "text-lime-800 dark:text-lime-300" },
        { bg: "bg-fuchsia-100 dark:bg-fuchsia-950", border: "border-fuchsia-600", accent: "text-fuchsia-800 dark:text-fuchsia-300" },
      ];
      const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

      const newCard: BusinessCard = {
        id: `card-${Date.now()}`,
        slogan: randomTemplate.slogan,
        subtext: randomTemplate.subtext,
        bgColor: palette.bg,
        borderColor: palette.border,
        accentColor: palette.accent
      };

      setCards((prev) => [newCard, ...prev.slice(0, 7)]);
      setIsPrinting(false);
    }, 400);
  };

  const copySlogan = (card: BusinessCard) => {
    navigator.clipboard.writeText(`"${card.slogan}" — Not Guilty-ish Legal (1-800-ISH-LEGAL)`);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="business-cards-section"
      aria-labelledby="cards-heading"
      className="py-16 px-4 bg-faux-wood dark:bg-faux-wood-dark border-b-4 border-black text-white relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-black font-billboard text-lg tracking-wider rounded border-2 border-black retro-shadow-black uppercase mb-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              Laminated in 1998 & Still Sticky
            </div>
            <h2
              id="cards-heading"
              className="text-4xl sm:text-5xl font-billboard uppercase text-yellow-300 tracking-wide text-shadow"
            >
              The Bus-Bench Business Card Wall
            </h2>
            <p className="text-sm sm:text-base text-amber-100 max-w-xl">
              Sal changes his slogan whenever a prospective client sneezes in the waiting room. Take one, stick it on your fridge, or print an absurd new one!
            </p>
          </div>

          <button
            onClick={printNewCard}
            disabled={isPrinting}
            className={`px-5 py-3.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-billboard text-xl uppercase tracking-wider rounded-xl border-4 border-black retro-shadow-black transition-all active:translate-y-1 cursor-pointer flex items-center gap-2.5 shrink-0 ${
              isPrinting ? "animate-pulse opacity-75" : "hover:scale-105"
            }`}
            aria-label="Print a new tacky business card slogan"
          >
            <Printer className="w-6 h-6 animate-bounce" />
            {isPrinting ? "Printing Fresh Card..." : "Print A New Card 🖨️"}
          </button>
        </div>

        {/* Card Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`p-5 rounded-lg border-4 ${card.borderColor} ${card.bgColor} text-neutral-900 dark:text-neutral-100 retro-shadow-black flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden ${
                index === 0 && isPrinting ? "scale-95 opacity-50" : "scale-100 opacity-100"
              }`}
            >
              {/* Tacky faux watermark */}
              <div className="absolute -right-4 -bottom-4 text-7xl font-billboard opacity-5 dark:opacity-10 pointer-events-none select-none uppercase">
                LEGAL
              </div>

              <div>
                {/* Card Top Brand */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-300 dark:border-neutral-700">
                  <div className="flex items-center gap-1.5 font-billboard text-base sm:text-lg tracking-wider text-red-600 dark:text-red-400">
                    <ShieldCheck className="w-4 h-4" />
                    NOT GUILTY-ISH LEGAL
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-neutral-900 text-yellow-300 px-1.5 py-0.5 rounded">
                    SLOGAN #{index + 101}
                  </span>
                </div>

                {/* Slogan */}
                <p className="mt-3 font-anton text-lg sm:text-xl text-neutral-900 dark:text-yellow-300 leading-snug">
                  "{card.slogan}"
                </p>

                {/* Subtext */}
                <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 italic">
                  {card.subtext}
                </p>
              </div>

              {/* Card Footer / Action */}
              <div className="mt-4 pt-3 border-t border-neutral-300 dark:border-neutral-700 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-mono font-bold text-[11px] text-neutral-600 dark:text-neutral-400">
                  <Phone className="w-3 h-3 text-red-500" />
                  1-800-ISH-LEGAL
                </span>

                <button
                  onClick={() => copySlogan(card)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-black text-yellow-300 hover:bg-neutral-800 rounded font-semibold text-[11px] uppercase transition-colors cursor-pointer"
                  title="Copy card slogan to clipboard"
                  aria-label={`Copy slogan: ${card.slogan}`}
                >
                  {copiedId === card.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      Pocketed!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Take Card
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
