import React, { useState, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Play, Pause, Edit3, Sparkles } from 'lucide-react';
import { HINDI_SWAR_DATA, HINDI_VYANJAN_DATA, HindiLetterItem } from '../data/learningData';
import { sound } from '../utils/sound';

interface HindiVarnamalaProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
  onOpenSlate: (letter: string) => void;
}

export const HindiVarnamala: React.FC<HindiVarnamalaProps> = ({
  langMode,
  onAddStar,
  onOpenSlate
}) => {
  const [section, setSection] = useState<'swar' | 'vyanjan'>('swar');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [bounceCard, setBounceCard] = useState(false);

  const dataList: HindiLetterItem[] = section === 'swar' ? HINDI_SWAR_DATA : HINDI_VYANJAN_DATA;
  const currentItem = dataList[currentIndex] || dataList[0];

  const playHindiAudio = (item: HindiLetterItem = currentItem) => {
    sound.playTap();
    setBounceCard(true);
    setTimeout(() => setBounceCard(false), 300);

    const hindiSpeech = `${item.letter} से ${item.word}`;
    const enSpeech = `${item.letter}. ${item.wordRoman}, meaning ${item.meaning}`;

    if (langMode === 'hi') {
      sound.speak(hindiSpeech, 'hi-IN', 0.85);
    } else if (langMode === 'en') {
      sound.speak(enSpeech, 'en-US', 0.9);
    } else {
      sound.speakBilingual(enSpeech, hindiSpeech);
    }
  };

  useEffect(() => {
    playHindiAudio(currentItem);
    onAddStar();
  }, [currentIndex, section]);

  // Autoplay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % dataList.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, dataList.length]);

  const handlePrev = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev === 0 ? dataList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    sound.playTap();
    setCurrentIndex((prev) => (prev + 1) % dataList.length);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top Bar: Section Toggle (स्वर / व्यंजन) & Controls */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        {/* Section Tabs */}
        <div className="flex items-center bg-amber-100 p-1 rounded-2xl border border-amber-200">
          <button
            onClick={() => {
              sound.playTap();
              setSection('swar');
              setCurrentIndex(0);
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
              section === 'swar'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            स्वर (Vowels · 13)
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setSection('vyanjan');
              setCurrentIndex(0);
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
              section === 'vyanjan'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            व्यंजन (Consonants · 36)
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playTap();
              setIsAutoPlaying(!isAutoPlaying);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 ${
              isAutoPlaying
                ? 'bg-rose-500 text-white'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
            }`}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              onOpenSlate(currentItem.letter);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
          >
            <Edit3 className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">स्लेट पर लिखें</span>
            <span className="sm:hidden">Trace</span>
          </button>
        </div>
      </div>

      {/* Main Hindi Flashcard */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 py-1">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Hindi Letter"
          className="absolute left-0 sm:left-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
        </button>

        {/* Center Card */}
        <div
          onClick={() => playHindiAudio()}
          style={{
            backgroundColor: currentItem.bgLight,
            borderColor: currentItem.borderColor
          }}
          className={`w-full max-w-md h-full max-h-[460px] sm:max-h-[500px] rounded-3xl border-4 p-5 sm:p-8 flex flex-col items-center justify-between shadow-xl cursor-pointer transition-transform duration-200 ${
            bounceCard ? 'scale-105' : 'scale-100'
          }`}
        >
          {/* Card Top: Hindi Letter & Sound */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span
                style={{ color: currentItem.color }}
                className="text-7xl sm:text-9xl font-black font-baloo tracking-tight"
              >
                {currentItem.letter}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-500 font-mono">
                ({currentItem.roman})
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                playHindiAudio();
              }}
              style={{ backgroundColor: currentItem.color }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white shadow-md flex items-center justify-center active:scale-95 transition-transform"
              title="Speak Hindi Sound"
            >
              <Volume2 className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Card Center: Emoji Illustration */}
          <div className="my-auto py-2 sm:py-4 flex flex-col items-center justify-center">
            <span className="text-7xl sm:text-9xl animate-wiggle filter drop-shadow-md">
              {currentItem.emoji}
            </span>
          </div>

          {/* Card Bottom: Hindi Word, Roman transliteration, English Meaning */}
          <div className="w-full text-center bg-white/90 backdrop-blur-xs rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-200/50">
            <div className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight font-baloo">
              {currentItem.letter} से {currentItem.word}
            </div>
            <div className="text-sm sm:text-lg font-bold text-amber-800 mt-1">
              {currentItem.wordRoman} · {currentItem.meaning}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tap card to hear Hindi pronunciation</span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Hindi Letter"
          className="absolute right-0 sm:right-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
        </button>
      </div>

      {/* Bottom Hindi Akshar Rail */}
      <div className="mt-2 w-full">
        <p className="text-xs font-bold text-amber-800/70 mb-1 px-1">
          {section === 'swar' ? 'स्वर चुनिए (Swar):' : 'व्यंजन चुनिए (Vyanjan):'} ({currentIndex + 1}/{dataList.length})
        </p>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 no-scrollbar">
          {dataList.map((item, idx) => {
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
                className={`min-w-[40px] h-10 sm:min-w-[46px] sm:h-11 rounded-xl font-black text-lg sm:text-xl border-2 shadow-xs transition-all shrink-0 active:scale-90 flex items-center justify-center font-baloo ${
                  isSelected ? 'scale-105 shadow-md' : 'hover:bg-amber-50'
                }`}
              >
                {item.letter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
