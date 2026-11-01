import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, ChevronLeft, ChevronRight, Edit3, Sparkles } from 'lucide-react';
import { NUMBERS_1_TO_100, NumberItem } from '../data/learningData';
import { sound } from '../utils/sound';

interface Numbers100Props {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
  onOpenSlate: (numStr: string) => void;
}

export const Numbers100: React.FC<Numbers100Props> = ({
  langMode,
  onAddStar,
  onOpenSlate
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');
  const [currentNum, setCurrentNum] = useState(1);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [activeRange, setActiveRange] = useState<'1-10' | '11-20' | '21-50' | '51-100'>('1-10');
  const [tappedItemCount, setTappedItemCount] = useState<number[]>([]);

  const currentItem: NumberItem = NUMBERS_1_TO_100[currentNum - 1] || NUMBERS_1_TO_100[0];

  const playNumberAudio = (item: NumberItem = currentItem) => {
    sound.playTap();
    if (langMode === 'hi') {
      sound.speak(`${item.hindiWord}`, 'hi-IN', 0.85);
    } else if (langMode === 'en') {
      sound.speak(`${item.englishWord}! Number ${item.num}`, 'en-US', 0.9);
    } else {
      sound.speakBilingual(`Number ${item.num}, ${item.englishWord}`, `${item.hindiWord}`);
    }
  };

  useEffect(() => {
    playNumberAudio(currentItem);
    setTappedItemCount([]);
    onAddStar();
  }, [currentNum]);

  // Counting loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingUp) {
      timer = setInterval(() => {
        setCurrentNum((prev) => {
          if (prev >= 100) {
            setIsCountingUp(false);
            return 1;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isCountingUp]);

  const handlePrev = () => {
    sound.playTap();
    setCurrentNum((prev) => (prev > 1 ? prev - 1 : 100));
  };

  const handleNext = () => {
    sound.playTap();
    setCurrentNum((prev) => (prev < 100 ? prev + 1 : 1));
  };

  const filteredNumbers = NUMBERS_1_TO_100.filter((item) => {
    if (activeRange === '1-10') return item.num >= 1 && item.num <= 10;
    if (activeRange === '11-20') return item.num >= 11 && item.num <= 20;
    if (activeRange === '21-50') return item.num >= 21 && item.num <= 50;
    return item.num >= 51 && item.num <= 100;
  });

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top controls: Ranges & View Mode */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        {/* Range selectors */}
        <div className="flex items-center gap-1 bg-amber-100 p-1 rounded-2xl border border-amber-200 overflow-x-auto">
          {(['1-10', '11-20', '21-50', '51-100'] as const).map((rng) => (
            <button
              key={rng}
              onClick={() => {
                sound.playTap();
                setActiveRange(rng);
                const start = rng === '1-10' ? 1 : rng === '11-20' ? 11 : rng === '21-50' ? 21 : 51;
                setCurrentNum(start);
              }}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeRange === rng
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
            >
              {rng}
            </button>
          ))}
        </div>

        {/* View mode toggle (Card / Full 100 Grid) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playTap();
              setViewMode(viewMode === 'card' ? 'grid' : 'card');
            }}
            className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
          >
            {viewMode === 'card' ? 'Show 1-100 Chart' : 'Show Big Flashcard'}
          </button>

          {viewMode === 'card' && (
            <button
              onClick={() => {
                sound.playTap();
                setIsCountingUp(!isCountingUp);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 ${
                isCountingUp
                  ? 'bg-rose-500 text-white'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
              }`}
            >
              {isCountingUp ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isCountingUp ? 'Stop' : 'Count With Me'}</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playTap();
              onOpenSlate(currentNum.toString());
            }}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1"
            title="Trace number on slate"
          >
            <Edit3 className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Trace</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Either Card or 100 Grid */}
      {viewMode === 'card' ? (
        <div className="flex-1 flex items-center justify-center relative min-h-0 py-1">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Number"
            className="absolute left-0 sm:left-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
          </button>

          {/* Central Number Card */}
          <div
            onClick={() => playNumberAudio()}
            className="w-full max-w-md h-full max-h-[460px] sm:max-h-[500px] rounded-3xl border-4 border-amber-300 bg-amber-50/90 p-5 sm:p-7 flex flex-col items-center justify-between shadow-xl cursor-pointer"
          >
            {/* Header: English & Hindi digits */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-8xl font-black text-amber-600 font-mono tracking-tight">
                  {currentItem.num}
                </span>
                <span className="text-4xl sm:text-6xl font-black text-orange-500 font-baloo">
                  {currentItem.hindiNum}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playNumberAudio();
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-md flex items-center justify-center active:scale-95 transition-transform"
                title="Hear number"
              >
                <Volume2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Interactive Toddler Counting objects for 1-10 or visual representation */}
            <div className="my-auto py-2 flex flex-col items-center justify-center w-full">
              {currentItem.num <= 10 ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-bold text-amber-800/80">
                    Tap the items to count: ({tappedItemCount.length}/{currentItem.num})
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-[280px]">
                    {Array.from({ length: currentItem.num }).map((_, idx) => {
                      const isTapped = tappedItemCount.includes(idx);
                      return (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playPop();
                            if (!isTapped) {
                              setTappedItemCount((prev) => [...prev, idx]);
                              sound.speak(`${idx + 1}`, 'en-US', 1.0);
                              if (tappedItemCount.length + 1 === currentItem.num) {
                                sound.playSuccess();
                                onAddStar();
                              }
                            }
                          }}
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-2xl sm:text-3xl flex items-center justify-center border-2 transition-all active:scale-90 ${
                            isTapped
                              ? 'bg-amber-400 border-amber-500 shadow-inner scale-110'
                              : 'bg-white border-amber-200 hover:bg-amber-100 shadow-sm'
                          }`}
                        >
                          {currentItem.itemsEmoji || '⭐'}
                        </button>
                      );
                    })}
                  </div>
                  {currentItem.itemsLabel && (
                    <span className="text-sm font-bold text-amber-900 mt-1">
                      {currentItem.itemsLabel}
                    </span>
                  )}
                </div>
              ) : (
                /* For 11-100, visual tens blocks / cheerful badge */
                <div className="flex flex-col items-center gap-3">
                  <div className="grid grid-cols-5 gap-1.5 p-3 bg-white/80 rounded-2xl border border-amber-200">
                    {Array.from({ length: Math.min(currentItem.num, 25) }).map((_, idx) => (
                      <span key={idx} className="text-lg">
                        🌟
                      </span>
                    ))}
                    {currentItem.num > 25 && (
                      <span className="col-span-5 text-xs font-bold text-amber-800 text-center">
                        + {currentItem.num - 25} more stars!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Words in English & Hindi */}
            <div className="w-full text-center bg-white/95 rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-200">
              <div className="text-2xl sm:text-4xl font-extrabold text-slate-800">
                {currentItem.englishWord}
              </div>
              <div className="text-lg sm:text-2xl font-bold text-amber-800 font-baloo mt-0.5">
                {currentItem.hindiWord}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tap card to repeat audio</span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next Number"
            className="absolute right-0 sm:right-2 z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg border-2 border-amber-200 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
          </button>
        </div>
      ) : (
        /* Full 100 Grid Chart View */
        <div className="flex-1 overflow-y-auto bg-white/80 p-3 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-inner">
          <p className="text-xs sm:text-sm font-bold text-amber-900 mb-2 text-center">
            Tap any number to hear its sound in English & Hindi (1 to 100):
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
            {NUMBERS_1_TO_100.map((item) => {
              const isSelected = item.num === currentNum;
              return (
                <button
                  key={item.num}
                  onClick={() => {
                    setCurrentNum(item.num);
                    playNumberAudio(item);
                  }}
                  className={`p-1.5 sm:p-2 rounded-xl flex flex-col items-center justify-center border-2 transition-all active:scale-90 ${
                    isSelected
                      ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-105'
                      : 'bg-amber-50/80 hover:bg-amber-100 border-amber-200 text-slate-800'
                  }`}
                >
                  <span className="text-sm sm:text-base font-extrabold font-mono leading-none">
                    {item.num}
                  </span>
                  <span className="text-xs font-bold opacity-80 font-baloo leading-tight">
                    {item.hindiNum}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Jump Rail for Current Range */}
      {viewMode === 'card' && (
        <div className="mt-2 w-full">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 no-scrollbar">
            {filteredNumbers.map((item) => {
              const isSelected = item.num === currentNum;
              return (
                <button
                  key={item.num}
                  onClick={() => {
                    sound.playTap();
                    setCurrentNum(item.num);
                  }}
                  className={`min-w-[42px] h-10 sm:min-w-[48px] sm:h-11 rounded-xl font-black text-sm sm:text-base border-2 shadow-xs transition-all shrink-0 active:scale-90 flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-amber-500 border-amber-600 text-white scale-105 shadow-md'
                      : 'bg-white hover:bg-amber-50 border-amber-200 text-slate-700'
                  }`}
                >
                  <span className="font-mono leading-tight">{item.num}</span>
                  <span className="text-[10px] font-baloo leading-none">{item.hindiNum}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
