import React, { useState } from 'react';
import { Volume2, Music, Sparkles, Play } from 'lucide-react';
import {
  COLORS_DATA,
  ANIMALS_DATA,
  SHAPES_DATA,
  NURSERY_RHYMES,
  ColorItem,
  AnimalItem,
  ShapeItem,
  RhymeItem
} from '../data/learningData';
import { sound } from '../utils/sound';

interface EnglishBasicsProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

export const EnglishBasics: React.FC<EnglishBasicsProps> = ({
  langMode,
  onAddStar
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'animals' | 'shapes' | 'rhymes'>('colors');
  const [selectedRhymeIndex, setSelectedRhymeIndex] = useState(0);
  const [isSinging, setIsSinging] = useState(false);
  const [singingLineIndex, setSingingLineIndex] = useState(-1);

  // Sound handlers
  const handleColorClick = (color: ColorItem) => {
    sound.playTap();
    onAddStar();
    if (langMode === 'hi') {
      sound.speak(`${color.hindiName}. ${color.example}`, 'hi-IN', 0.85);
    } else if (langMode === 'en') {
      sound.speak(`${color.name}! ${color.example}`, 'en-US', 0.9);
    } else {
      sound.speakBilingual(`${color.name} color! ${color.example}`, `${color.hindiName}`);
    }
  };

  const handleAnimalClick = (animal: AnimalItem) => {
    sound.playTap();
    onAddStar();
    const enText = `${animal.name}! ${animal.name} says ${animal.sound}`;
    const hiText = `${animal.hindiName}! ${animal.soundText}`;
    if (langMode === 'hi') {
      sound.speak(hiText, 'hi-IN', 0.85);
    } else if (langMode === 'en') {
      sound.speak(enText, 'en-US', 0.9);
    } else {
      sound.speakBilingual(enText, hiText);
    }
  };

  const handleShapeClick = (shape: ShapeItem) => {
    sound.playTap();
    onAddStar();
    const enText = `${shape.name} shape! ${shape.example}`;
    const hiText = `${shape.hindiName}!`;
    if (langMode === 'hi') {
      sound.speak(hiText, 'hi-IN', 0.85);
    } else if (langMode === 'en') {
      sound.speak(enText, 'en-US', 0.9);
    } else {
      sound.speakBilingual(enText, hiText);
    }
  };

  // Play rhyme line by line
  const handlePlayRhyme = (rhyme: RhymeItem) => {
    sound.playTap();
    setIsSinging(true);
    setSingingLineIndex(0);

    const speakLine = (lineIdx: number) => {
      if (lineIdx >= rhyme.lines.length) {
        setIsSinging(false);
        setSingingLineIndex(-1);
        sound.playSuccess();
        onAddStar();
        return;
      }
      setSingingLineIndex(lineIdx);
      const lineText = rhyme.lines[lineIdx];
      const lang = rhyme.category === 'hindi' ? 'hi-IN' : 'en-US';
      sound.speak(lineText, lang, 0.82);

      // Estimate time per line
      const duration = Math.max(2200, lineText.length * 90);
      setTimeout(() => {
        speakLine(lineIdx + 1);
      }, duration);
    };

    speakLine(0);
  };

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Sub tabs: Colors, Animals, Shapes, Nursery Rhymes */}
      <div className="flex items-center gap-1 sm:gap-2 bg-amber-100 p-1 rounded-2xl border border-amber-200 mb-3 overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('colors');
          }}
          className={`flex-1 py-1.5 sm:py-2 px-3 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'colors'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          🎨 Colors (रंग)
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('animals');
          }}
          className={`flex-1 py-1.5 sm:py-2 px-3 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'animals'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          🦁 Animals (जानवर)
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('shapes');
          }}
          className={`flex-1 py-1.5 sm:py-2 px-3 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'shapes'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          📐 Shapes (आकृतियाँ)
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('rhymes');
          }}
          className={`flex-1 py-1.5 sm:py-2 px-3 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all ${
            activeTab === 'rhymes'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          🎵 Rhymes (गीत)
        </button>
      </div>

      {/* Main Content Area based on tab */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-white/80 p-3 sm:p-5 rounded-3xl border-2 border-amber-200 shadow-inner">
        {/* 1. COLORS TAB */}
        {activeTab === 'colors' && (
          <div>
            <p className="text-xs sm:text-sm font-bold text-amber-900 mb-3 text-center">
              Tap any color to hear its name and fun example!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {COLORS_DATA.map((col) => (
                <button
                  key={col.name}
                  onClick={() => handleColorClick(col)}
                  className="p-3 sm:p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-between cursor-pointer"
                >
                  <div
                    style={{ backgroundColor: col.hex }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-inner border border-black/10 flex items-center justify-center text-2xl"
                  >
                    {col.emoji}
                  </div>
                  <div className="text-center mt-2">
                    <span className="font-black text-base sm:text-lg text-slate-800 block">
                      {col.name}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-amber-700 font-baloo block">
                      {col.hindiName}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
                      {col.example}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. ANIMALS TAB */}
        {activeTab === 'animals' && (
          <div>
            <p className="text-xs sm:text-sm font-bold text-amber-900 mb-3 text-center">
              Tap any animal to hear its cheerful sound!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {ANIMALS_DATA.map((animal) => (
                <button
                  key={animal.name}
                  onClick={() => handleAnimalClick(animal)}
                  className="p-3 sm:p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-100 shadow-xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-between cursor-pointer"
                >
                  <span className="text-5xl sm:text-6xl my-1 animate-wiggle">
                    {animal.emoji}
                  </span>
                  <div className="text-center mt-1">
                    <span className="font-black text-base sm:text-lg text-slate-800 block">
                      {animal.name}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-amber-800 font-baloo block">
                      {animal.hindiName}
                    </span>
                    <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {animal.sound}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. SHAPES TAB */}
        {activeTab === 'shapes' && (
          <div>
            <p className="text-xs sm:text-sm font-bold text-amber-900 mb-3 text-center">
              Explore shapes with cute toddler examples!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SHAPES_DATA.map((shape) => (
                <button
                  key={shape.name}
                  onClick={() => handleShapeClick(shape)}
                  className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-between cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center my-1">
                    {shape.svgPath === 'circle' && (
                      <div className="w-14 h-14 rounded-full bg-rose-500 shadow-md" />
                    )}
                    {shape.svgPath === 'square' && (
                      <div className="w-14 h-14 rounded-xl bg-blue-500 shadow-md" />
                    )}
                    {shape.svgPath === 'triangle' && (
                      <div
                        className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[52px] border-b-emerald-500 filter drop-shadow-md"
                      />
                    )}
                    {shape.svgPath === 'star' && (
                      <span className="text-6xl text-amber-400">⭐</span>
                    )}
                    {shape.svgPath === 'heart' && (
                      <span className="text-6xl text-pink-500">❤️</span>
                    )}
                    {shape.svgPath === 'rectangle' && (
                      <div className="w-18 h-12 rounded-lg bg-purple-500 shadow-md" />
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <span className="font-black text-lg sm:text-xl text-slate-800 block">
                      {shape.name}
                    </span>
                    <span className="font-bold text-sm text-amber-800 font-baloo block">
                      {shape.hindiName}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 mt-1 block">
                      {shape.example}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. RHYMES TAB */}
        {activeTab === 'rhymes' && (
          <div className="flex flex-col gap-4">
            {/* Rhyme selector pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {NURSERY_RHYMES.map((rhyme, idx) => (
                <button
                  key={rhyme.title}
                  onClick={() => {
                    sound.playTap();
                    setSelectedRhymeIndex(idx);
                    setIsSinging(false);
                    setSingingLineIndex(-1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all shrink-0 ${
                    selectedRhymeIndex === idx
                      ? 'bg-amber-500 border-amber-600 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50 border-amber-200 text-slate-700'
                  }`}
                >
                  <span className="mr-1">{rhyme.emoji}</span>
                  <span>{rhyme.title}</span>
                </button>
              ))}
            </div>

            {/* Active Rhyme Player Card */}
            {(() => {
              const rhyme = NURSERY_RHYMES[selectedRhymeIndex];
              return (
                <div className="bg-amber-50/90 rounded-2xl border-2 border-amber-300 p-4 sm:p-6 flex flex-col items-center">
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl">{rhyme.emoji}</span>
                      <div>
                        <h3 className="font-black text-lg sm:text-2xl text-slate-800">
                          {rhyme.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-amber-800 font-baloo">
                          {rhyme.hindiTitle}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayRhyme(rhyme)}
                      disabled={isSinging}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all"
                    >
                      {isSinging ? (
                        <>
                          <Music className="w-4 h-4 animate-bounce" />
                          <span>Singing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-white" />
                          <span>Sing Rhyme!</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Lyrics lines with karaoke bounce highlighting */}
                  <div className="w-full bg-white rounded-xl p-4 sm:p-5 border border-amber-200 flex flex-col gap-2.5">
                    {rhyme.lines.map((line, lIdx) => {
                      const isActive = singingLineIndex === lIdx;
                      return (
                        <div
                          key={lIdx}
                          className={`p-2.5 rounded-lg text-center font-bold text-base sm:text-xl transition-all ${
                            isActive
                              ? 'bg-amber-200 text-amber-950 scale-102 shadow-xs'
                              : 'text-slate-700'
                          }`}
                        >
                          {line}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
