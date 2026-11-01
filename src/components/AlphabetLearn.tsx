import React, { useState, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Play, Pause, Edit3, Sparkles } from 'lucide-react';
import { ALPHABET_DATA, AlphabetItem } from '../data/learningData';
import { sound } from '../utils/sound';

interface AlphabetLearnProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
  onOpenSlate: (letter: string) => void;
}

export const AlphabetLearn: React.FC<AlphabetLearnProps> = ({
  langMode,
  onAddStar,
  onOpenSlate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [bounceCard, setBounceCard] = useState(false);

  const currentItem: AlphabetItem = ALPHABET_DATA[currentIndex];

  const playLetterAudio = (item: AlphabetItem = currentItem) => {
    sound.playTap();
    setBounceCard(true);
    setTimeout(() => setBounceCard(false), 300);

    if (langMode === 'en') {
      sound.speak(`${item.letter}. ${item.word}!`, 'en-US');
    } else if (langMode === 'hi') {
      sound.speak(`${item.letter}. ${item.hindiWord}`, 'hi-IN');
    } else {
      sound.speakBilingual(`${item.letter} for ${item.word}`, `${item.hindiWord}`);
    }
  };

  // Play audio when letter changes
  useEffect(() => {
    playLetterAudio(currentItem);
    onAddStar();
  }, [currentIndex]);

  // Autoplay timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % ALPHABET_DATA.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev === 0 ? ALPHABET_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev + 1) % ALPHABET_DATA.length);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top action strip: Autoplay & Slate trace */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <button
          onClick={() => {
            sound.playTap();
            setIsAutoPlaying(!isAutoPlaying);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 ${
            isAutoPlaying
              ? 'bg-rose-500 text-white'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
          }`}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isAutoPlaying ? 'Pause Slideshow' : 'Auto Play'}</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onOpenSlate(currentItem.upper);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
        >
          <Edit3 className="w-4 h-4 text-purple-600" />
          <span>Trace on Slate</span>
        </button>
      </div>

      {/* Main Flashcard Container */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 py-1">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Letter"
          className="absolute left-0 sm:left-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
        </button>

        {/* Center Card */}
        <div
          onClick={() => playLetterAudio()}
          style={{
            backgroundColor: currentItem.bgLight,
            borderColor: currentItem.borderColor
          }}
          className={`w-full max-w-md h-full max-h-[460px] sm:max-h-[500px] rounded-3xl border-4 p-5 sm:p-8 flex flex-col items-center justify-between shadow-xl cursor-pointer transition-transform duration-200 ${
            bounceCard ? 'scale-105' : 'scale-100'
          }`}
        >
          {/* Card Top: Letter big & Phonics */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span
                style={{ color: currentItem.color }}
                className="text-6xl sm:text-8xl font-black tracking-tight"
              >
                {currentItem.upper}
              </span>
              <span
                style={{ color: currentItem.color }}
                className="text-4xl sm:text-6xl font-bold opacity-80"
              >
                {currentItem.lower}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playLetterAudio();
              }}
              style={{ backgroundColor: currentItem.color }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white shadow-md flex items-center justify-center active:scale-95 transition-transform"
              title="Speak"
            >
              <Volume2 className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Card Center: Huge illustration emoji */}
          <div className="my-auto py-2 sm:py-4 flex flex-col items-center justify-center">
            <span className="text-7xl sm:text-9xl animate-wiggle filter drop-shadow-md">
              {currentItem.emoji}
            </span>
          </div>

          {/* Card Bottom: Word, Hindi Meaning, Phonics hint */}
          <div className="w-full text-center bg-white/90 backdrop-blur-xs rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-200/50">
            <div className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              {currentItem.word}
            </div>
            <div className="text-base sm:text-xl font-bold text-amber-800 mt-0.5">
              {currentItem.hindiWord}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentItem.phonics}</span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Letter"
          className="absolute right-0 sm:right-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
        </button>
      </div>

      {/* Bottom Alphabet Quick Rail */}
      <div className="mt-2 w-full">
        <p className="text-xs font-bold text-amber-800/70 mb-1 px-1">
          Pick any letter ({currentIndex + 1}/26):
        </p>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 no-scrollbar">
          {ALPHABET_DATA.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.letter}
                onClick={() => {
                  sound.playTap();
                  setCurrentIndex(idx);
                }}
                style={{
                  backgroundColor: isSelected ? item.color : '#ffffff',
                  color: isSelected ? '#ffffff' : '#334155',
                  borderColor: isSelected ? item.color : '#fed7aa'
                }}
                className={`min-w-[38px] h-10 sm:min-w-[42px] sm:h-11 rounded-xl font-extrabold text-sm sm:text-base border-2 shadow-xs transition-all shrink-0 active:scale-90 flex items-center justify-center ${
                  isSelected ? 'scale-105 shadow-md' : 'hover:bg-amber-50'
                }`}
              >
                {item.upper}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
