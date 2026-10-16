import React from "react";

export function LawyerGraphic({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Halftone / retro rays background */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-2xl select-none"
        aria-label="Illustration of fictional fast-talking TV lawyer Sal pointing directly at the viewer with a big grin and gold pinky ring"
        role="img"
      >
        <defs>
          <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="tieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
          <filter id="comicShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="6" dy="6" stdDeviation="0" floodColor="#000000" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Comic explosive starburst ring */}
        <circle cx="250" cy="250" r="230" fill="url(#sunburstGrad)" stroke="#000000" strokeWidth="8" />

        {/* Sunburst radial beams */}
        <g stroke="#ca8a04" strokeWidth="12" opacity="0.35">
          <line x1="250" y1="20" x2="250" y2="480" />
          <line x1="20" y1="250" x2="480" y2="250" />
          <line x1="87" y1="87" x2="413" y2="413" />
          <line x1="87" y1="413" x2="413" y2="87" />
        </g>

        {/* Suited Torso */}
        <g filter="url(#comicShadow)">
          {/* Shoulders */}
          <path
            d="M 110 500 L 130 360 L 200 320 L 300 320 L 370 360 L 390 500 Z"
            fill="url(#suitGrad)"
            stroke="#000000"
            strokeWidth="7"
          />
          {/* White Shirt Collar */}
          <polygon points="200,320 250,390 215,360" fill="#ffffff" stroke="#000" strokeWidth="4" />
          <polygon points="300,320 250,390 285,360" fill="#ffffff" stroke="#000" strokeWidth="4" />
          {/* Broad Striped Gold Tie */}
          <polygon points="240,360 260,360 270,490 250,510 230,490" fill="url(#tieGrad)" stroke="#000" strokeWidth="5" />
          {/* Tie Stripes */}
          <line x1="240" y1="390" x2="260" y2="380" stroke="#78350f" strokeWidth="4" />
          <line x1="237" y1="420" x2="263" y2="410" stroke="#78350f" strokeWidth="4" />
          <line x1="234" y1="450" x2="266" y2="440" stroke="#78350f" strokeWidth="4" />
          <line x1="232" y1="480" x2="268" y2="470" stroke="#78350f" strokeWidth="4" />

          {/* Golden Gavel Pin on Lapel */}
          <circle cx="170" cy="380" r="10" fill="#fbbf24" stroke="#000" strokeWidth="3" />
          <rect x="160" y="377" width="20" height="6" rx="2" fill="#d97706" />

          {/* Neck */}
          <rect x="220" y="270" width="60" height="60" fill="url(#skinGrad)" stroke="#000" strokeWidth="6" />

          {/* Head */}
          <ellipse cx="250" cy="220" rx="75" ry="90" fill="url(#skinGrad)" stroke="#000" strokeWidth="7" />

          {/* Slicked TV Lawyer Hair */}
          <path
            d="M 175 190 C 170 120, 230 100, 260 105 C 310 100, 335 140, 325 190 C 315 150, 280 130, 240 135 C 200 140, 185 160, 175 190 Z"
            fill="#1e1b4b"
            stroke="#000"
            strokeWidth="7"
          />
          {/* Extra hair swoop */}
          <path
            d="M 210 125 Q 260 90 310 125"
            fill="none"
            stroke="#4338ca"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Ears */}
          <ellipse cx="172" cy="225" rx="14" ry="20" fill="url(#skinGrad)" stroke="#000" strokeWidth="5" />
          <ellipse cx="328" cy="225" rx="14" ry="20" fill="url(#skinGrad)" stroke="#000" strokeWidth="5" />

          {/* Eyebrows (Arched, charismatic) */}
          <path d="M 200 185 Q 220 170 235 185" fill="none" stroke="#1e1b4b" strokeWidth="6" strokeLinecap="round" />
          <path d="M 265 185 Q 280 165 300 180" fill="none" stroke="#1e1b4b" strokeWidth="6" strokeLinecap="round" />

          {/* Eyes (confident wink/intensity) */}
          <ellipse cx="218" cy="205" rx="12" ry="14" fill="#fff" stroke="#000" strokeWidth="4" />
          <circle cx="221" cy="205" r="6" fill="#1e293b" />
          <circle cx="223" cy="202" r="2.5" fill="#fff" />

          <ellipse cx="282" cy="205" rx="12" ry="14" fill="#fff" stroke="#000" strokeWidth="4" />
          <circle cx="279" cy="205" r="6" fill="#1e293b" />
          <circle cx="281" cy="202" r="2.5" fill="#fff" />

          {/* Nose */}
          <path d="M 250 200 L 256 230 L 244 235" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" />

          {/* Brilliant Smile / Teeth */}
          <path
            d="M 215 255 Q 250 295 285 255 Z"
            fill="#ffffff"
            stroke="#000"
            strokeWidth="5"
          />
          {/* Tooth separator & smile sparkle */}
          <line x1="250" y1="255" x2="250" y2="275" stroke="#cbd5e1" strokeWidth="3" />
          <path d="M 210 252 Q 250 288 290 252" fill="none" stroke="#000" strokeWidth="5" />

          {/* Hollywood Smile Sparkle Star */}
          <g transform="translate(288, 250) scale(0.7)">
            <path d="M 0,-15 L 4,-4 L 15,0 L 4,4 L 0,15 L -4,4 L -15,0 L -4,-4 Z" fill="#ffffff" stroke="#facc15" strokeWidth="2" />
          </g>

          {/* Giant Pointing Hand in Foreground (Bus-Bench Billboard Pose!) */}
          <g transform="translate(140, 160)">
            {/* Foreshortened arm and sleeve */}
            <path d="M 190 320 L 230 200 L 160 210 L 130 320 Z" fill="url(#suitGrad)" stroke="#000" strokeWidth="7" />
            <rect x="155" y="195" width="75" height="18" rx="4" fill="#ffffff" stroke="#000" strokeWidth="5" />

            {/* Fist */}
            <ellipse cx="190" cy="180" rx="35" ry="30" fill="url(#skinGrad)" stroke="#000" strokeWidth="6" />

            {/* Tacky Solid Gold Pinky Ring */}
            <ellipse cx="220" cy="182" rx="10" ry="10" fill="#fbbf24" stroke="#78350f" strokeWidth="4" />
            <circle cx="220" cy="182" r="4" fill="#ef4444" />

            {/* Huge Pointing Index Finger directly at camera! */}
            <path
              d="M 180 170 C 180 90, 150 70, 150 40 C 150 15, 175 15, 175 40 C 175 80, 205 130, 205 170 Z"
              fill="url(#skinGrad)"
              stroke="#000"
              strokeWidth="7"
            />
            {/* Fingernail reflection */}
            <path d="M 156 30 C 158 24, 168 24, 170 30" fill="none" stroke="#fed7aa" strokeWidth="4" />
            {/* Knuckle creases */}
            <line x1="162" y1="75" x2="175" y2="78" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
            <line x1="166" y1="115" x2="185" y2="118" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>

        {/* Tacky billboard badge overlay */}
        <g transform="translate(35, 30)">
          <rect x="0" y="0" width="130" height="42" rx="8" fill="#ef4444" stroke="#000" strokeWidth="4" filter="url(#comicShadow)" />
          <text x="65" y="27" fill="#ffffff" fontFamily="'Bebas Neue', sans-serif" fontSize="24" textAnchor="middle" fontWeight="bold">
            VOTED #1*
          </text>
        </g>
      </svg>
    </div>
  );
}
