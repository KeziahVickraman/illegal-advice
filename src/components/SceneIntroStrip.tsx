import React, { useState, useEffect } from "react";
import { Clapperboard, RefreshCw, Volume2 } from "lucide-react";
import { playLaughTrack, playPhoneRing } from "../utils/audio";

const SCENE_DIRECTIONS = [
  "[The office phone rings. Someone knocks over a stack of 4,000 glossy business cards.]",
  "[A ceiling tile falls directly into Sal's lukewarm coffee mug. He sips it anyway.]",
  "[Sirens wail outside. Sal quickly closes the faux-wood blinds and turns up smooth jazz.]",
  "[The neon sign buzzes loudly; Sal taps it with a cheap plastic gavel until it hums in B-minor.]",
  "[Sal vigorously practices his 'shocked innocent face' in the brass trim of the microwave.]",
  "[Someone flushes a toilet in the nail salon next door; the mini desktop water fountain sputters.]",
  "[A pigeon lands on the window sill. Sal offers it a bus-bench discount voucher.]",
  "[Sal unrolls a massive highway billboard blueprint on the linoleum desk, knocking over a cactus.]",
  "[The gold foil on Sal's diploma peels off by 2 inches. He hurriedly sticks it back with chewing gum.]",
  "[A dramatic burst of audience laughter echoes from nowhere. Sal points a finger at camera 2.]",
];

export function SceneIntroStrip() {
  const [directionIndex, setDirectionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Pick random direction on initial mount
    const initial = Math.floor(Math.random() * SCENE_DIRECTIONS.length);
    setDirectionIndex(initial);
  }, []);

  const handleNextDirection = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setDirectionIndex((prev) => (prev + 1) % SCENE_DIRECTIONS.length);
      setIsAnimating(false);
      // Fun 50% chance of sound
      if (Math.random() > 0.5) {
        playLaughTrack();
      } else {
        playPhoneRing();
      }
    }, 150);
  };

  return (
    <aside aria-label="Sitcom scene directions" className="w-full bg-amber-400 dark:bg-amber-500 border-y-4 border-black text-black py-2.5 px-4 shadow-md overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-mono">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex items-center gap-1.5 bg-black text-yellow-300 px-2.5 py-1 font-billboard text-base uppercase tracking-wider rounded border border-yellow-400 shrink-0">
            <Clapperboard className="w-4 h-4 text-red-500 animate-pulse" />
            SCENE 1 • TAKE 1
          </span>
          <span
            className={`font-semibold text-neutral-900 transition-opacity duration-200 italic tracking-tight text-center sm:text-left ${
              isAnimating ? "opacity-20 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {SCENE_DIRECTIONS[directionIndex]}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleNextDirection}
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-yellow-300 hover:bg-neutral-800 text-xs font-bold uppercase rounded border border-black shadow transition-transform active:translate-y-0.5 cursor-pointer"
            title="Roll next sitcom stage direction"
            aria-label="Roll next sitcom stage direction"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Next Take
          </button>
          <button
            onClick={playLaughTrack}
            className="flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white hover:bg-red-700 text-xs font-bold uppercase rounded border border-black shadow cursor-pointer"
            title="Play sitcom laugh track sound effect"
            aria-label="Play sitcom laugh track sound effect"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Laugh
          </button>
        </div>
      </div>
    </aside>
  );
}
