import React, { useState } from "react";
import { Eye, Award, Sparkles, AlertCircle, ThumbsUp } from "lucide-react";
import { playLaughTrack } from "../utils/audio";

interface TourItem {
  id: string;
  name: string;
  tackinessRating: string;
  salCaption: string;
  icon: string;
  tagline: string;
  salVerdict: string;
}

const TOUR_ITEMS: TourItem[] = [
  {
    id: "velvet-painting",
    name: "The Velvet Painting of Justice",
    tackinessRating: "12 / 10",
    icon: "🤡⚖️",
    tagline: "Purchased for $4.50 at a roadside clearance tent",
    salCaption:
      "Look at that crying clown holding the Scales of Justice, folks. Does it scream 'prestigious Ivy League partner'? No! It screams 'I will fight a traffic citation in a Walmart parking lot until sunrise!' It sets an immediate mood of gravitas, remorse, and discounted retainers.",
    salVerdict: "Judge says: Obscenely majestic."
  },
  {
    id: "plastic-plant",
    name: "The Immortal Faux-Ficus Tree",
    tackinessRating: "9.5 / 10",
    icon: "🪴📄",
    tagline: "Watered once in 2014 by a nervous bail bondsman",
    salCaption:
      "This bad boy has survived three recessions, two landlord disputes, and an unauthorized pigeon nesting incident. It is currently 40% polyester, 60% discarded subpoena receipts. If you whisper a confession into leaf #4, attorney-client privilege technically attaches.",
    salVerdict: "Water requirements: Zero. Legal value: Infinite."
  },
  {
    id: "broken-fountain",
    name: "The Broken Desktop Zen Fountain",
    tackinessRating: "11 / 10",
    icon: "⛲⚡",
    tagline: "Supposed to soothe clients; sounds like an angry weedwhacker",
    salCaption:
      "The brochure promised 'Tranquil babbling brook meditation for stressed defendants.' What we actually got was a motor that hums aggressively in B-flat whenever the microwave in suite 3B turns on. We keep it plugged in to drown out police sirens.",
    salVerdict: "Audio camouflage rating: 100% effective."
  },
  {
    id: "framed-diploma",
    name: "The Magnified Framed Diploma",
    tackinessRating: "10 / 10",
    icon: "📜🎖️",
    tagline: "Inkjet School of Jurisprudence (Bowling Division)",
    salCaption:
      "Notice the gold seal? We put a 3x magnifying lens over it so prospective clients think it's from the Supreme Court of Something Impressive. Signed by Dean 'Fast Eddy' Henderson on high-gloss photo paper. Is it legally recognized? In our hearts, absolutely.",
    salVerdict: "Citations: Pending appellate review."
  },
  {
    id: "leatherette-chair",
    name: "The Duct-Taped Client Hot Seat",
    tackinessRating: "8.5 / 10",
    icon: "🪑🩹",
    tagline: "Sit on the left cheek only; right spring is lethal",
    salCaption:
      "If you sit on the right cushion, a rusted coil spring will launch your pelvis directly into cross-examination. We tell clients it's an ergonomic posture-enhancer designed to make them look innocent and alert before a grand jury.",
    salVerdict: "Spring tension: Dangerous. Character: Unmatched."
  },
  {
    id: "bus-bench-table",
    name: "The Repurposed Bus-Bench Table",
    tackinessRating: "10 / 10",
    icon: "🚏💼",
    tagline: "Liberated from Route 42 when the city repaved the curb",
    salCaption:
      "Why spend thousands on a mahogany boardroom table when the city left my face printed on concrete slab right outside? It still says 'WERE YOU INJURED? CALL SAL!' across the middle. Perfect for signing plea agreements and eating egg rolls.",
    salVerdict: "Municipal tax dollars at work for justice."
  }
];

export function OfficeTour() {
  const [activeItem, setActiveItem] = useState<TourItem>(TOUR_ITEMS[0]);

  const handleSelect = (item: TourItem) => {
    setActiveItem(item);
    playLaughTrack();
  };

  return (
    <section
      id="office-tour-section"
      aria-labelledby="office-tour-heading"
      className="py-16 px-4 bg-white dark:bg-neutral-950 border-b-4 border-black transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white font-billboard text-lg tracking-wider rounded border-2 border-black retro-shadow-black uppercase mb-3">
            <Eye className="w-4 h-4 text-yellow-300" />
            Strip-Mall Interior Design Excellence
          </div>
          <h2
            id="office-tour-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-billboard uppercase text-neutral-900 dark:text-yellow-400 tracking-wide"
          >
            The Faux-Wood Office Tour
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mt-2">
            Step behind the faux-wood paneling into our air-conditioned sanctuary of reasonable doubt. Click an artifact to hear Sal's official appraisal.
          </p>
        </div>

        {/* Tour Showcase: Selected Item Highlight + Thumbnail Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Featured Artifact Spotlight (Left / Top) */}
          <div className="lg:col-span-7 bg-amber-50 dark:bg-neutral-900 border-4 border-black rounded-2xl p-6 sm:p-8 retro-shadow-lg relative overflow-hidden">
            {/* Background subtle watermark badge */}
            <div className="absolute top-2 right-4 text-8xl opacity-10 select-none pointer-events-none">
              {activeItem.icon}
            </div>

            {/* Top Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-neutral-300 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-yellow-300 rounded-xl border-2 border-black">
                  {activeItem.icon}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    Strip-Mall Relic
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-billboard uppercase text-neutral-900 dark:text-yellow-300">
                    {activeItem.name}
                  </h3>
                </div>
              </div>
              <div className="bg-red-600 text-white px-3 py-1 rounded-full font-billboard text-sm uppercase tracking-wider border border-black shadow">
                Tackiness: {activeItem.tackinessRating}
              </div>
            </div>

            <p className="mt-3 text-sm font-semibold text-neutral-600 dark:text-neutral-400 italic">
              "{activeItem.tagline}"
            </p>

            {/* Sal's Monologue Bubble */}
            <div className="mt-6 bg-white dark:bg-neutral-800 p-5 rounded-xl border-3 border-black retro-shadow-black relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-billboard text-lg text-red-600 dark:text-red-400 uppercase">
                  Sal's Voiceover:
                </span>
                <span className="text-xs bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded font-mono">
                  [Sitcom Laugh Track]
                </span>
              </div>
              <p className="text-base sm:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                {activeItem.salCaption}
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-xs font-bold text-neutral-500 dark:text-neutral-400">
                <span className="text-amber-600 dark:text-amber-400">
                  {activeItem.salVerdict}
                </span>
                <span className="font-mono">Office Relic Verified ✓</span>
              </div>
            </div>
          </div>

          {/* Artifact Selector Grid (Right / Bottom) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {TOUR_ITEMS.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`p-4 rounded-xl border-3 text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? "bg-yellow-400 dark:bg-amber-500 border-black retro-shadow-black text-black scale-[1.02]"
                      : "bg-neutral-100 dark:bg-neutral-800/80 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-yellow-400 text-neutral-800 dark:text-neutral-200"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Inspect ${item.name}`}
                >
                  <span className="text-3xl shrink-0 p-1.5 bg-white dark:bg-neutral-900 rounded-lg border border-black/30">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-billboard text-lg uppercase truncate tracking-wide">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-mono font-bold shrink-0 ml-1">
                        ★ {item.tackinessRating}
                      </span>
                    </div>
                    <p className="text-xs truncate opacity-85 mt-0.5">
                      {item.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
