import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { ALPHABET_DATA, HINDI_SWAR_DATA, HINDI_VYANJAN_DATA, NUMBERS_1_TO_100, FRUITS_DATA } from '../data/learningData';
import { sound } from '../utils/sound';

interface BalloonItem {
  id: number;
  text: string;
  subtext: string;
  hindiVoice: string;
  enVoice: string;
  color: string;
  x: number; // percentage from left (5% - 85%)
  y: number; // percentage from top
  speed: number;
  scale: number;
  isPopping: boolean;
}

interface BalloonPopGameProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

const BALLOON_COLORS = [
  '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#F97316', '#06B6D4', '#84CC16', '#A855F7'
];

export const BalloonPopGame: React.FC<BalloonPopGameProps> = ({
  langMode,
  onAddStar
}) => {
  const [category, setCategory] = useState<'abc' | 'hindi' | 'numbers' | 'fruits'>('abc');
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);

  // Generate balloon payload based on selected category
  const getRandomPayload = () => {
    if (category === 'abc') {
      const item = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)];
      return {
        text: item.upper,
        subtext: item.emoji,
        enVoice: `${item.upper}! ${item.word}`,
        hindiVoice: `${item.upper}! ${item.hindiWord}`,
        color: item.color
      };
    }
    if (category === 'hindi') {
      const allHindi = [...HINDI_SWAR_DATA, ...HINDI_VYANJAN_DATA];
      const item = allHindi[Math.floor(Math.random() * allHindi.length)];
      return {
        text: item.letter,
        subtext: item.emoji,
        enVoice: `${item.roman}! ${item.meaning}`,
        hindiVoice: `${item.letter} से ${item.word}`,
        color: item.color
      };
    }
    if (category === 'numbers') {
      const numItem = NUMBERS_1_TO_100[Math.floor(Math.random() * 20)]; // 1 to 20 for fun
      return {
        text: numItem.num.toString(),
        subtext: numItem.hindiNum,
        enVoice: `${numItem.englishWord}`,
        hindiVoice: `${numItem.hindiWord}`,
        color: BALLOON_COLORS[numItem.num % BALLOON_COLORS.length]
      };
    }
    // fruits
    const fruit = FRUITS_DATA[Math.floor(Math.random() * FRUITS_DATA.length)];
    return {
      text: fruit.emoji,
      subtext: fruit.name,
      enVoice: fruit.name,
      hindiVoice: fruit.hindiName,
      color: fruit.color
    };
  };

  // Spawn new balloon
  const spawnBalloon = () => {
    const payload = getRandomPayload();
    const newBalloon: BalloonItem = {
      id: nextIdRef.current++,
      text: payload.text,
      subtext: payload.subtext,
      enVoice: payload.enVoice,
      hindiVoice: payload.hindiVoice,
      color: payload.color,
      x: 8 + Math.random() * 76, // 8% to 84%
      y: 105, // start just below screen
      speed: 0.28 + Math.random() * 0.22, // gentle toddler speed
      scale: 0.9 + Math.random() * 0.2,
      isPopping: false
    };

    setBalloons((prev) => [...prev.slice(-9), newBalloon]);
  };

  // Animation loop: float balloons upwards
  useEffect(() => {
    // Initial batch
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnBalloon(), i * 700);
    }

    const interval = setInterval(() => {
      setBalloons((prev) => {
        const updated = prev
          .map((b) => ({
            ...b,
            y: b.y - b.speed
          }))
          .filter((b) => b.y > -20); // remove when floated off top
        return updated;
      });
    }, 30);

    const spawnInterval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length < 6) {
          spawnBalloon();
        }
        return prev;
      });
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(spawnInterval);
    };
  }, [category]);

  // Handle Balloon Pop
  const handlePop = (balloon: BalloonItem, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (balloon.isPopping) return;

    sound.playPop();

    // Voice announcement
    if (langMode === 'hi') {
      sound.speak(balloon.hindiVoice, 'hi-IN', 0.9);
    } else if (langMode === 'en') {
      sound.speak(balloon.enVoice, 'en-US', 0.95);
    } else {
      sound.speak(`${balloon.enVoice}! ${balloon.hindiVoice}`, 'en-US', 0.9);
    }

    // Little confetti burst at click coordinate
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 15,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: [balloon.color, '#FDE047', '#60A5FA', '#F472B6']
      });
    } catch {
      // Fallback
    }

    // Mark as popping then remove
    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, isPopping: true } : b))
    );

    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    }, 200);

    setPoppedCount((c) => {
      const newCount = c + 1;
      if (newCount % 5 === 0) {
        sound.playSuccess();
        onAddStar();
      }
      return newCount;
    });

    onAddStar();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 w-full h-full overflow-hidden select-none bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 flex flex-col justify-between"
    >
      {/* Background Floating Decorative Clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-8 left-10 text-6xl animate-float">☁️</div>
        <div className="absolute top-20 right-16 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>☁️</div>
        <div className="absolute top-44 left-1/3 text-7xl animate-float" style={{ animationDelay: '3s' }}>☁️</div>
      </div>

      {/* Top Game HUD Bar */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between gap-2 flex-wrap">
        {/* Category selector */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-sky-300 shadow-sm">
          <button
            onClick={() => {
              sound.playTap();
              setCategory('abc');
              setBalloons([]);
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-xl font-black text-xs sm:text-sm transition-all ${
              category === 'abc' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
            }`}
          >
            🔤 ABC
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setCategory('hindi');
              setBalloons([]);
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-xl font-black text-xs sm:text-sm transition-all ${
              category === 'hindi' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
            }`}
          >
            अ क हिंदी
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setCategory('numbers');
              setBalloons([]);
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-xl font-black text-xs sm:text-sm transition-all ${
              category === 'numbers' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
            }`}
          >
            🔢 123
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setCategory('fruits');
              setBalloons([]);
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-xl font-black text-xs sm:text-sm transition-all ${
              category === 'fruits' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
            }`}
          >
            🍎 Fruits
          </button>
        </div>

        {/* Popped score */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-amber-300 shadow-xs">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span className="font-extrabold text-slate-800 text-sm sm:text-base font-mono">
            Popped: {poppedCount} 🎈
          </span>
        </div>
      </div>

      {/* Balloon Playfield Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {balloons.map((b) => (
          <div
            key={b.id}
            onClick={(e) => handlePop(b, e)}
            onTouchStart={(e) => handlePop(b, e)}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: `scale(${b.isPopping ? 1.4 : b.scale})`,
              opacity: b.isPopping ? 0 : 1,
              transition: b.isPopping ? 'transform 0.15s ease-out, opacity 0.15s ease-out' : 'none'
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation group"
          >
            {/* Balloon SVG Body */}
            <div className="relative flex flex-col items-center">
              {/* Balloon shape */}
              <div
                style={{ backgroundColor: b.color }}
                className="w-24 h-30 sm:w-28 sm:h-34 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-lg border-2 border-white/40 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 active:scale-95 transition-transform"
              >
                {/* Gloss highlight */}
                <div className="absolute top-3 left-4 w-5 h-8 bg-white/40 rounded-full rotate-25 pointer-events-none" />

                {/* Content inside balloon */}
                <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-md font-baloo leading-tight">
                  {b.text}
                </span>
                <span className="text-xl sm:text-2xl mt-0.5 filter drop-shadow-xs">
                  {b.subtext}
                </span>
              </div>

              {/* Knot & String */}
              <div
                style={{ borderTopColor: b.color }}
                className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] -mt-0.5"
              />
              <div className="w-0.5 h-10 sm:h-12 bg-slate-400/80 -mt-0.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Hint Strip */}
      <div className="relative z-20 pb-3 text-center pointer-events-none">
        <span className="bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold text-amber-900 border border-amber-200 shadow-xs">
          👉 Tap or click any floating balloon to POP and hear the voice! 🎈
        </span>
      </div>
    </div>
  );
};
