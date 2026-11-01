import React, { useState, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { FRUITS_DATA, FruitItem } from '../data/learningData';
import { sound } from '../utils/sound';

interface FruitsLearnProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

export const FruitsLearn: React.FC<FruitsLearnProps> = ({
  langMode,
  onAddStar
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [viewGrid, setViewGrid] = useState(false);

  const currentFruit: FruitItem = FRUITS_DATA[currentIndex];

  const playFruitAudio = (fruit: FruitItem = currentFruit) => {
    sound.playTap();
    setBounce(true);
    setTimeout(() => setBounce(false), 300);

    const enText = `${fruit.name}! ${fruit.taste}`;
    const hiText = `${fruit.name}, हिंदी में ${fruit.hindiName}! ${fruit.funFact}`;

    if (langMode === 'hi') {
      sound.speak(hiText, 'hi-IN', 0.85);
    } else if (langMode === 'en') {
      sound.speak(enText, 'en-US', 0.9);
    } else {
      sound.speakBilingual(enText, `${fruit.hindiName}! ${fruit.funFact}`);
    }
  };

  useEffect(() => {
    playFruitAudio(currentFruit);
    onAddStar();
  }, [currentIndex]);

  const handlePrev = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev === 0 ? FRUITS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev + 1) % FRUITS_DATA.length);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top toggle bar */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200">
          फल और स्वाद (Yummy Fruits · {currentIndex + 1}/{FRUITS_DATA.length})
        </span>

        <button
          onClick={() => {
            sound.playTap();
            setViewGrid(!viewGrid);
          }}
          className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
        >
          {viewGrid ? 'Show Big Card' : 'Show All Fruits Basket 🧺'}
        </button>
      </div>

      {/* Main Container */}
      {!viewGrid ? (
        <div className="flex-1 flex items-center justify-center relative min-h-0 py-1">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Fruit"
            className="absolute left-0 sm:left-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
          </button>

          {/* Central Card */}
          <div
            onClick={() => playFruitAudio()}
            style={{
              backgroundColor: currentFruit.bgLight,
              borderColor: currentFruit.color
            }}
            className={`w-full max-w-md h-full max-h-[460px] sm:max-h-[500px] rounded-3xl border-4 p-5 sm:p-8 flex flex-col items-center justify-between shadow-xl cursor-pointer transition-transform duration-200 ${
              bounce ? 'scale-105' : 'scale-100'
            }`}
          >
            {/* Header: English name & speak button */}
            <div className="w-full flex items-center justify-between">
              <div>
                <h2
                  style={{ color: currentFruit.color }}
                  className="text-4xl sm:text-5xl font-black tracking-tight"
                >
                  {currentFruit.name}
                </h2>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-baloo mt-0.5">
                  {currentFruit.hindiName} ({currentFruit.hindiRoman})
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playFruitAudio();
                }}
                style={{ backgroundColor: currentFruit.color }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white shadow-md flex items-center justify-center active:scale-95 transition-transform"
                title="Speak fruit name"
              >
                <Volume2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Huge Fruit illustration */}
            <div className="my-auto py-2 sm:py-4 flex flex-col items-center justify-center">
              <span className="text-8xl sm:text-9xl animate-wiggle filter drop-shadow-md">
                {currentFruit.emoji}
              </span>
            </div>

            {/* Bottom details card */}
            <div className="w-full text-center bg-white/95 rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-200/60">
              <div className="flex items-center justify-center gap-1.5 text-rose-500 font-bold text-sm">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>{currentFruit.taste}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-700 mt-1">
                {currentFruit.funFact}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tap card to hear pronunciation</span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next Fruit"
            className="absolute right-0 sm:right-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
          </button>
        </div>
      ) : (
        /* Full Fruit Basket Grid View */
        <div className="flex-1 overflow-y-auto bg-white/80 p-3 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-inner">
          <p className="text-xs sm:text-sm font-bold text-amber-900 mb-3 text-center">
            Tap any fruit in your fruit basket to learn its name in English & Hindi!
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FRUITS_DATA.map((fruit, idx) => (
              <button
                key={fruit.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewGrid(false);
                  playFruitAudio(fruit);
                }}
                style={{ backgroundColor: fruit.bgLight, borderColor: fruit.color }}
                className="p-3 rounded-2xl border-2 flex flex-col items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span className="text-5xl sm:text-6xl mb-1">{fruit.emoji}</span>
                <span className="font-extrabold text-slate-800 text-base">{fruit.name}</span>
                <span className="font-bold text-amber-800 text-sm font-baloo">{fruit.hindiName}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom quick fruit selector */}
      {!viewGrid && (
        <div className="mt-2 w-full">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1 no-scrollbar">
            {FRUITS_DATA.map((fruit, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={fruit.id}
                  onClick={() => {
                    sound.playTap();
                    setCurrentIndex(idx);
                  }}
                  className={`min-w-[50px] h-12 rounded-xl border-2 flex items-center justify-center text-2xl transition-all shrink-0 active:scale-90 ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 scale-105 shadow-md'
                      : 'bg-white border-amber-200 hover:bg-amber-50'
                  }`}
                  title={`${fruit.name} - ${fruit.hindiName}`}
                >
                  {fruit.emoji}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
