import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw, Volume2, ArrowLeft, ArrowRight } from 'lucide-react';
import { FRUITS_DATA } from '../data/learningData';
import { sound } from '../utils/sound';

interface FallingFruit {
  id: number;
  emoji: string;
  name: string;
  hindiName: string;
  x: number; // percentage from left
  y: number; // percentage from top
  speed: number;
  color: string;
}

interface FruitCatcherGameProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

export const FruitCatcherGame: React.FC<FruitCatcherGameProps> = ({
  langMode,
  onAddStar
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [basketX, setBasketX] = useState(50); // percentage (10% to 90%)
  const [fallingFruits, setFallingFruits] = useState<FallingFruit[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const [lastCaughtFruit, setLastCaughtFruit] = useState<{ emoji: string; name: string } | null>(null);
  const nextFruitIdRef = useRef(1);
  const basketXRef = useRef(50);

  // Sync ref for animation loop
  useEffect(() => {
    basketXRef.current = basketX;
  }, [basketX]);

  // Spawn falling fruit
  const spawnFruit = () => {
    const randomFruit = FRUITS_DATA[Math.floor(Math.random() * FRUITS_DATA.length)];
    const newFruit: FallingFruit = {
      id: nextFruitIdRef.current++,
      emoji: randomFruit.emoji,
      name: randomFruit.name,
      hindiName: randomFruit.hindiName,
      x: 12 + Math.random() * 76,
      y: 5,
      speed: 0.35 + Math.random() * 0.2, // toddler friendly speed
      color: randomFruit.color
    };
    setFallingFruits((prev) => [...prev.slice(-4), newFruit]);
  };

  // Keyboard controls (Arrow keys or A/D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setBasketX((prev) => Math.max(12, prev - 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setBasketX((prev) => Math.min(88, prev + 8));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main game loop (Fruit physics & Catch detection)
  useEffect(() => {
    // Initial spawn
    spawnFruit();

    const gameInterval = setInterval(() => {
      setFallingFruits((prev) => {
        const nextList: FallingFruit[] = [];
        const currentBasket = basketXRef.current;

        for (const fruit of prev) {
          const nextY = fruit.y + fruit.speed;

          // Check if fruit has reached the basket height (approx 80% to 88%)
          if (nextY >= 78 && nextY <= 88) {
            const distance = Math.abs(fruit.x - currentBasket);
            if (distance < 15) {
              // CAUGHT!
              sound.playCatch();
              onAddStar();
              setCaughtCount((c) => c + 1);
              setLastCaughtFruit({ emoji: fruit.emoji, name: fruit.name });

              // Announce fruit
              if (langMode === 'hi') {
                sound.speak(`${fruit.hindiName}! बहुत बढ़िया!`, 'hi-IN', 0.9);
              } else if (langMode === 'en') {
                sound.speak(`${fruit.name}! Yummy!`, 'en-US', 0.95);
              } else {
                sound.speakBilingual(`${fruit.name}!`, fruit.hindiName);
              }

              try {
                confetti({
                  particleCount: 16,
                  spread: 55,
                  origin: { x: fruit.x / 100, y: 0.8 }
                });
              } catch {}

              continue; // remove caught fruit
            }
          }

          // If fruit passed bottom
          if (nextY < 95) {
            nextList.push({ ...fruit, y: nextY });
          }
        }
        return nextList;
      });
    }, 30);

    const spawnInterval = setInterval(() => {
      setFallingFruits((prev) => {
        if (prev.length < 3) {
          spawnFruit();
        }
        return prev;
      });
    }, 2200);

    return () => {
      clearInterval(gameInterval);
      clearInterval(spawnInterval);
    };
  }, [langMode, onAddStar]);

  // Touch/Mouse move on screen to position basket
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(12, Math.min(88, relativeX));
    setBasketX(clampedX);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      className="relative flex-1 w-full h-full overflow-hidden select-none bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 flex flex-col justify-between cursor-ew-resize touch-none"
    >
      {/* Sunny Orchard Sky with Sun & Clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-6 left-12 text-6xl animate-float">☁️</div>
        <div className="absolute top-10 right-16 text-7xl animate-float" style={{ animationDelay: '2s' }}>☁️</div>
        <div className="absolute top-4 right-1/3 text-6xl animate-pulse-gentle">☀️</div>
      </div>

      {/* Top HUD Cluster */}
      <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-amber-300 shadow-xs">
          <span className="text-2xl">🧺</span>
          <span className="font-extrabold text-amber-950 text-sm sm:text-base font-mono">
            Caught: {caughtCount} Fruits
          </span>
        </div>

        {lastCaughtFruit && (
          <div className="flex items-center gap-2 bg-amber-100/90 px-3 py-1.5 rounded-2xl border border-amber-300 animate-pop">
            <span className="text-xl">{lastCaughtFruit.emoji}</span>
            <span className="text-xs sm:text-sm font-black text-amber-900">
              {lastCaughtFruit.name} caught!
            </span>
          </div>
        )}

        <button
          onClick={() => {
            sound.playTap();
            setCaughtCount(0);
            setFallingFruits([]);
          }}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs flex items-center gap-1 shadow-xs active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Playfield Area: Falling Fruits */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {fallingFruits.map((fruit) => (
          <div
            key={fruit.id}
            style={{
              left: `${fruit.x}%`,
              top: `${fruit.y}%`
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none transition-all duration-75"
          >
            <span className="text-5xl sm:text-6xl filter drop-shadow-md animate-bounce">
              {fruit.emoji}
            </span>
            <span
              style={{ color: fruit.color }}
              className="text-xs font-black bg-white/90 px-2 py-0.5 rounded-full shadow-2xs mt-0.5 whitespace-nowrap"
            >
              {fruit.name}
            </span>
          </div>
        ))}

        {/* Woven Fruit Basket (Follows basketX) */}
        <div
          style={{
            left: `${basketX}%`,
            top: '84%'
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-30 transition-transform duration-75"
        >
          <div className="relative flex flex-col items-center">
            {/* Basket Emoji with glowing catcher aura */}
            <div className="w-24 h-16 sm:w-28 sm:h-18 rounded-b-3xl bg-amber-700 border-4 border-amber-900 shadow-xl flex items-center justify-center relative overflow-hidden">
              {/* Basket weave pattern */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:8px_8px]" />
              <span className="text-3xl sm:text-4xl filter drop-shadow-xs">🧺</span>
            </div>
            {/* Handle */}
            <div className="absolute -top-7 w-20 h-10 border-4 border-amber-800 rounded-t-full pointer-events-none" />
          </div>
        </div>

        {/* Friendly Meadow Grass Ground */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-emerald-400 border-t-4 border-emerald-500 flex items-center justify-between px-6 z-10">
          <span className="text-3xl">🌸</span>
          <span className="text-3xl">🐰</span>
          <span className="text-3xl">🌻</span>
          <span className="text-3xl">🦋</span>
          <span className="text-3xl">🌷</span>
        </div>
      </div>

      {/* Bottom Controls for Touch / Accessibility */}
      <div className="relative z-20 pb-2 px-4 flex items-center justify-between">
        <button
          onClick={() => setBasketX((prev) => Math.max(12, prev - 12))}
          className="p-3 sm:p-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-90 text-white shadow-lg flex items-center gap-1 font-black text-sm"
          title="Move Basket Left"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="hidden sm:inline">Left</span>
        </button>

        <span className="bg-white/90 backdrop-blur-xs px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold text-amber-950 border border-amber-200 shadow-xs text-center">
          👉 Slide your finger, mouse or arrows to move the basket & catch fruits!
        </span>

        <button
          onClick={() => setBasketX((prev) => Math.min(88, prev + 12))}
          className="p-3 sm:p-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-90 text-white shadow-lg flex items-center gap-1 font-black text-sm"
          title="Move Basket Right"
        >
          <span className="hidden sm:inline">Right</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
