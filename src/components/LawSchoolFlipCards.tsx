import React, { useState } from "react";
import { Scale, ShieldAlert, FileText, Gavel, RotateCw, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { playGavel } from "../utils/audio";

interface LawLesson {
  id: string;
  title: string;
  topic: string;
  icon: React.ReactNode;
  badge: string;
  frontJoke: string;
  frontPunchline: string;
  backRealLawTitle: string;
  backRealExplanation: string[];
  keyTakeaway: string;
}

const LESSONS: LawLesson[] = [
  {
    id: "burden-of-proof",
    title: "BURDEN OF PROOF",
    topic: "Presumption of Innocence",
    icon: <Scale className="w-8 h-8 text-amber-500" />,
    badge: "100% on the state",
    frontJoke:
      "\"I don't have to prove you're an angel who volunteers at orphanages on weekends...\"",
    frontPunchline:
      "I just have to prove the police took a blurry photo of a confused raccoon at 2:00 AM. If there is reasonable doubt, you walk!",
    backRealLawTitle: "The Legal Reality: Proof Beyond Reasonable Doubt",
    backRealExplanation: [
      "In criminal justice systems, the prosecution carries the entire legal burden to prove every single element of the charged offense.",
      "The standard is 'Beyond a Reasonable Doubt'—the highest threshold known to the legal system (far higher than civil 'balance of probabilities').",
      "The defendant does not have to prove their innocence or present evidence; if the state's case leaves reasonable doubt in a rational mind, the court must acquit."
    ],
    keyTakeaway: "You are innocent until proven guilty; never let anyone reverse that burden onto you."
  },
  {
    id: "common-defences",
    title: "COMMON DEFENCES",
    topic: "Justification & Excuses",
    icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
    badge: "Not just 'wasn't me'",
    frontJoke:
      "\"The Holy Trinity of Bus-Bench Legal Defense: The 'Wasn't Me', the 'Thought It Was Free Sample Day', and the 'Temporary Involuntary Sleepwalking' maneuver!\"",
    frontPunchline:
      "If the glove doesn't fit... we buy cheaper gloves in bulk!",
    backRealLawTitle: "The Legal Reality: Legitimate Criminal Defenses",
    backRealExplanation: [
      "Alibi: Solid, verified corroboration that you were physically elsewhere when the crime occurred.",
      "Lack of Mens Rea (Criminal Intent): Proving the mental state required by statute was not present (e.g. accident vs willful intent).",
      "Self-Defense / Private Defense: Reasonable and proportionate force used to protect yourself or others from imminent unlawful violence.",
      "Mistake of Fact: An honest, genuine, and reasonable misconception of circumstances negating criminal mens rea.",
      "Duress & Necessity: Being coerced by genuine threat of immediate death or grievous bodily harm."
    ],
    keyTakeaway: "A valid defence legally negates criminal culpability even if the physical act occurred."
  },
  {
    id: "your-rights",
    title: "YOUR RIGHTS",
    topic: "Arrest & Police Encounters",
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    badge: "Silence is golden",
    frontJoke:
      "\"Rule #1: Zip it. Rule #2: Lock it. Rule #3: Put the key in your pocket. The police officer asking about your afternoon is NOT your group-chat bestie.\"",
    frontPunchline:
      "You cannot talk yourself out of handcuffs, but you can definitely talk yourself into a prison jumpsuit!",
    backRealLawTitle: "The Legal Reality: Constitutional & Statutory Safeguards",
    backRealExplanation: [
      "Right to Silence: You have the right not to answer questions that could incriminate you. Politely declare: 'I choose to remain silent until I consult my lawyer.'",
      "Right to Know the Reason for Arrest: Officers must promptly inform you of the grounds and legal statutory basis for your arrest.",
      "Right to Legal Counsel: You have the right to speak with an attorney within a reasonable time before formal recorded statements.",
      "Search & Seizure Limits: Police generally require a warrant, statutory arrest powers, or informed consent to search your private belongings, phone, or home."
    ],
    keyTakeaway: "Polite silence is your greatest shield; never resist physically, assert rights verbally."
  },
  {
    id: "court-steps",
    title: "WHAT HAPPENS IN COURT",
    topic: "The 5-Step Court Journey",
    icon: <Gavel className="w-8 h-8 text-purple-500" />,
    badge: "Arrest to verdict",
    frontJoke:
      "\"The 5-Step Strip-Mall Shuffle: You get arrested, someone reads scary words in Latin, you shout 'Not Guilty!', lawyers argue over a crumpled receipt, and someone bangs a wooden hammer!\"",
    frontPunchline:
      "Sitcoms wrap it up in 22 minutes with commercial breaks. Real court takes months of paperwork and waiting in hallways.",
    backRealLawTitle: "The Legal Reality: Procedural Stages of a Criminal Case",
    backRealExplanation: [
      "1. Arrest & Bail Hearing: Determination of temporary detention or release conditions.",
      "2. Arraignment / First Mention: Formal reading of charges; defendant enters plea (Guilty or Not Guilty).",
      "3. Pre-Trial Conferences (PTC): Crown and defense exchange witness lists, evidence disclosure, and explore charge reductions.",
      "4. Trial: Prosecution presents witnesses and physical evidence; defense cross-examines; verdict issued by judge.",
      "5. Mitigation & Sentencing: If convicted or pleading guilty, legal arguments on mitigation, community orders, fines, or custodial terms."
    ],
    keyTakeaway: "Criminal cases are methodical evidentiary marathons, not shouting matches."
  }
];

export function LawSchoolFlipCards() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    playGavel();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCard(id);
    }
  };

  const flipAll = (toBack: boolean) => {
    playGavel();
    const nextState: Record<string, boolean> = {};
    LESSONS.forEach((l) => {
      nextState[l.id] = toBack;
    });
    setFlippedCards(nextState);
  };

  return (
    <section
      id="law-school-section"
      aria-labelledby="law-school-heading"
      className="py-16 px-4 bg-amber-50 dark:bg-neutral-900 border-b-4 border-black transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white font-billboard text-lg tracking-wider rounded border-2 border-black retro-shadow-black uppercase mb-3">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Accredited by absolutely no one
          </div>
          <h2
            id="law-school-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-billboard uppercase text-neutral-900 dark:text-yellow-400 tracking-wide"
          >
            Law School in 60 Seconds
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mt-2">
            The front is our billboard comedy pitch. Flip each card over to learn how the legal system <span className="font-bold underline text-red-600 dark:text-red-400">actually</span> protects your rights.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => flipAll(true)}
              className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm uppercase rounded border-2 border-black retro-shadow-black transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
              aria-label="Flip all cards to show real legal rules"
            >
              <BookOpen className="w-4 h-4" />
              Flip All to Real Legal Rules
            </button>
            <button
              onClick={() => flipAll(false)}
              className="px-3.5 py-1.5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold text-sm uppercase rounded border-2 border-black dark:border-neutral-700 transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
              aria-label="Flip all cards to front jokes"
            >
              <RotateCw className="w-4 h-4" />
              Reset to Front Jokes
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LESSONS.map((lesson) => {
            const isFlipped = !!flippedCards[lesson.id];
            return (
              <div
                key={lesson.id}
                tabIndex={0}
                role="button"
                aria-pressed={isFlipped}
                aria-label={`${lesson.title} card: ${isFlipped ? "showing real legal explanation" : "showing comedy pitch"}. Press Enter to flip.`}
                onKeyDown={(e) => handleKeyDown(e, lesson.id)}
                onClick={() => toggleCard(lesson.id)}
                className="perspective-1000 group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600 rounded-xl"
              >
                <div
                  className={`relative min-h-[380px] w-full rounded-xl transition-transform duration-700 transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT OF CARD (Sitcom / Bus-Bench Joke) */}
                  <div className="absolute inset-0 backface-hidden w-full h-full bg-white dark:bg-neutral-800 border-4 border-black rounded-xl p-6 flex flex-col justify-between retro-shadow-black">
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-neutral-700 rounded-lg border-2 border-black">
                            {lesson.icon}
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                              {lesson.topic}
                            </span>
                            <h3 className="text-2xl font-billboard tracking-wide text-neutral-900 dark:text-white uppercase">
                              {lesson.title}
                            </h3>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 text-xs font-extrabold uppercase bg-yellow-300 text-black border border-black rounded shadow-xs">
                          {lesson.badge}
                        </span>
                      </div>

                      {/* Joke Content */}
                      <div className="mt-6 space-y-4">
                        <p className="font-marker text-lg text-neutral-800 dark:text-yellow-200 leading-snug">
                          {lesson.frontJoke}
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-300 bg-amber-50 dark:bg-neutral-700/60 p-3.5 rounded-lg border-l-4 border-amber-500">
                          {lesson.frontPunchline}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA to flip */}
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1 font-bold text-red-600 dark:text-red-400 uppercase">
                        <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                        Click / Tap to flip for real law
                      </span>
                      <span className="font-mono">[Enter ↵ to flip]</span>
                    </div>
                  </div>

                  {/* BACK OF CARD (Real Legal Education) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-blue-950 text-white border-4 border-yellow-400 rounded-xl p-6 flex flex-col justify-between retro-shadow-black">
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-blue-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                          <h4 className="font-bold text-sm sm:text-base text-yellow-300 uppercase tracking-wide">
                            {lesson.backRealLawTitle}
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 text-xs font-mono bg-blue-900 text-yellow-300 border border-yellow-500 rounded">
                          REAL LAW
                        </span>
                      </div>

                      {/* Explanatory bullets */}
                      <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-blue-100">
                        {lesson.backRealExplanation.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-yellow-400 font-bold shrink-0 mt-0.5">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key takeaway box */}
                    <div className="mt-4 pt-3 border-t border-blue-800">
                      <div className="bg-blue-900/80 p-2.5 rounded border border-yellow-400/40 text-xs font-semibold text-yellow-200">
                        <span className="text-yellow-400 uppercase font-black mr-1">Bottom Line:</span>
                        {lesson.keyTakeaway}
                      </div>
                      <div className="mt-2 text-right text-[11px] text-blue-300">
                        Click / Enter to flip back to joke ↺
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
