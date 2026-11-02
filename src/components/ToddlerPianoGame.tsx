import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Music, Play, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';

interface KeyConfig {
  note: string;
  solfege: string;
  hindiSur: string;
  num: number;
  freq: number;
  color: string;
  bgLight: string;
  animal: { emoji: string; name: string; soundText: string };
  abcLetter: string;
}

const PIANO_KEYS: KeyConfig[] = [
  { note: 'C4', solfege: 'Do', hindiSur: 'सा', num: 1, freq: 261.63, color: '#EF4444', bgLight: '#FEF2F2', animal: { emoji: '🐶', name: 'Dog', soundText: 'Woof!' }, abcLetter: 'A' },
  { note: 'D4', solfege: 'Re', hindiSur: 'रे', num: 2, freq: 293.66, color: '#F97316', bgLight: '#FFF7ED', animal: { emoji: '🐱', name: 'Cat', soundText: 'Meow!' }, abcLetter: 'B' },
  { note: 'E4', solfege: 'Mi', hindiSur: 'ग', num: 3, freq: 329.63, color: '#F59E0B', bgLight: '#FFFBEB', animal: { emoji: '🐮', name: 'Cow', soundText: 'Moo!' }, abcLetter: 'C' },
  { note: 'F4', solfege: 'Fa', hindiSur: 'म', num: 4, freq: 349.23, color: '#10B981', bgLight: '#ECFDF5', animal: { emoji: '🐸', name: 'Frog', soundText: 'Ribbit!' }, abcLetter: 'D' },
  { note: 'G4', solfege: 'Sol', hindiSur: 'प', num: 5, freq: 392.00, color: '#06B6D4', bgLight: '#ECFEFF', animal: { emoji: '🦆', name: 'Duck', soundText: 'Quack!' }, abcLetter: 'E' },
  { note: 'A4', solfege: 'La', hindiSur: 'ध', num: 6, freq: 440.00, color: '#3B82F6', bgLight: '#EFF6FF', animal: { emoji: '🦁', name: 'Lion', soundText: 'Roar!' }, abcLetter: 'F' },
  { note: 'B4', solfege: 'Ti', hindiSur: 'नी', num: 7, freq: 493.88, color: '#8B5CF6', bgLight: '#F5F3FF', animal: { emoji: '🐑', name: 'Sheep', soundText: 'Baa!' }, abcLetter: 'G' },
  { note: 'C5', solfege: 'High Do', hindiSur: 'सां', num: 8, freq: 523.25, color: '#EC4899', bgLight: '#FDF2F8', animal: { emoji: '🐴', name: 'Horse', soundText: 'Neigh!' }, abcLetter: 'H' },
];

const SIMPLE_SONGS = [
  {
    title: 'Twinkle Twinkle',
    notes: [1, 1, 5, 5, 6, 6, 5],
    lyrics: 'Twin-kle twin-kle lit-tle star'
  },
  {
    title: 'Old MacDonald',
    notes: [5, 5, 5, 2, 3, 3, 2],
    lyrics: 'Old Mac-Don-ald had a farm'
  },
  {
    title: 'Do Re Mi',
    notes: [1, 2, 3, 4, 5, 6, 7, 8],
    lyrics: 'Do Re Mi Fa Sol La Ti Do'
  }
];

interface ToddlerPianoGameProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

export const ToddlerPianoGame: React.FC<ToddlerPianoGameProps> = ({
  langMode,
  onAddStar
}) => {
  const [instrumentMode, setInstrumentMode] = useState<'bells' | 'animals' | 'abc'>('bells');
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(null);
  const [songStep, setSongStep] = useState(0);

  const currentSong = selectedSongIndex !== null ? SIMPLE_SONGS[selectedSongIndex] : null;
  const targetNote = currentSong ? currentSong.notes[songStep] : null;

  const handleKeyPress = (key: KeyConfig) => {
    setActiveKey(key.num);
    setTimeout(() => setActiveKey(null), 250);

    // Audio based on instrument mode
    if (instrumentMode === 'bells') {
      sound.playNote(key.freq, 0.5);
    } else if (instrumentMode === 'animals') {
      sound.playNote(key.freq, 0.3);
      sound.speak(key.animal.soundText, 'en-US', 1.2);
    } else {
      sound.playNote(key.freq, 0.3);
      sound.speak(`${key.abcLetter}!`, 'en-US', 1.1);
    }

    onAddStar();

    // Guided song playback progression
    if (currentSong && targetNote !== null) {
      if (key.num === targetNote) {
        const nextStep = songStep + 1;
        if (nextStep >= currentSong.notes.length) {
          // Song completed!
          sound.playSuccess();
          try {
            confetti({ particleCount: 35, spread: 75, origin: { y: 0.6 } });
          } catch {}
          setSongStep(0);
        } else {
          setSongStep(nextStep);
        }
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top Instrument Mode Switcher & Song Guide */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        {/* Mode tabs */}
        <div className="flex items-center gap-1 bg-amber-100 p-1 rounded-2xl border border-amber-200">
          <button
            onClick={() => {
              sound.playTap();
              setInstrumentMode('bells');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
              instrumentMode === 'bells' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
            }`}
          >
            🔔 Magic Bells
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setInstrumentMode('animals');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
              instrumentMode === 'animals' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
            }`}
          >
            🐶 Animal Choir
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setInstrumentMode('abc');
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
              instrumentMode === 'abc' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
            }`}
          >
            🔤 ABC Melody
          </button>
        </div>

        {/* Guided Songs Dropdown */}
        <div className="flex items-center gap-1">
          {SIMPLE_SONGS.map((s, idx) => (
            <button
              key={s.title}
              onClick={() => {
                sound.playTap();
                if (selectedSongIndex === idx) {
                  setSelectedSongIndex(null);
                  setSongStep(0);
                } else {
                  setSelectedSongIndex(idx);
                  setSongStep(0);
                }
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                selectedSongIndex === idx
                  ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                  : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
              }`}
            >
              🎵 {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Guided Song Prompt Banner if active */}
      {currentSong && (
        <div className="bg-amber-100/90 rounded-2xl p-2.5 border-2 border-amber-300 text-center mb-2 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span className="font-extrabold text-amber-950 text-xs sm:text-sm">
              Playing: {currentSong.title} — Tap the key with glowing star!
            </span>
          </div>
          <span className="text-xs font-bold text-amber-800">
            {songStep + 1} / {currentSong.notes.length}
          </span>
        </div>
      )}

      {/* Main Rainbow Xylophone Keys */}
      <div className="flex-1 flex items-center justify-center min-h-0 py-2">
        <div className="w-full h-full max-h-[380px] sm:max-h-[440px] bg-slate-900/90 p-3 sm:p-5 rounded-3xl border-4 border-amber-700 shadow-2xl flex items-stretch gap-1.5 sm:gap-2.5 justify-center">
          {PIANO_KEYS.map((k) => {
            const isGuideTarget = targetNote === k.num;
            const isBeingPressed = activeKey === k.num;

            return (
              <button
                key={k.note}
                onClick={() => handleKeyPress(k)}
                style={{
                  backgroundColor: k.color,
                  height: `${75 + k.num * 3}%` // graduated xylophone bar length
                }}
                className={`flex-1 rounded-2xl flex flex-col items-center justify-between py-3 sm:py-5 text-white transition-all transform active:scale-95 cursor-pointer relative shadow-lg ${
                  isBeingPressed ? 'brightness-125 scale-102 ring-4 ring-white' : 'hover:brightness-110'
                } ${isGuideTarget ? 'ring-4 ring-yellow-300 animate-pulse' : ''}`}
              >
                {/* Solfege / Note Name */}
                <span className="text-sm sm:text-base font-black tracking-tight drop-shadow-xs">
                  {k.solfege}
                </span>

                {/* Center Item (Animal / ABC / Number) */}
                <div className="my-auto flex flex-col items-center">
                  {instrumentMode === 'animals' ? (
                    <span className="text-3xl sm:text-5xl filter drop-shadow-md animate-wiggle">
                      {k.animal.emoji}
                    </span>
                  ) : instrumentMode === 'abc' ? (
                    <span className="text-3xl sm:text-5xl font-black font-baloo filter drop-shadow-md">
                      {k.abcLetter}
                    </span>
                  ) : (
                    <span className="text-3xl sm:text-5xl font-black font-mono filter drop-shadow-md">
                      {k.num}
                    </span>
                  )}
                </div>

                {/* Bottom Indian Classical Sur & Digit */}
                <div className="flex flex-col items-center leading-none">
                  <span className="text-sm sm:text-base font-black font-baloo">
                    {k.hindiSur}
                  </span>
                  <span className="text-[11px] font-bold opacity-80 mt-0.5">
                    {k.note}
                  </span>
                </div>

                {/* Target Star Glow */}
                {isGuideTarget && (
                  <div className="absolute -top-3 text-2xl animate-bounce">
                    ⭐
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="mt-2 text-center text-xs font-bold text-amber-900/80">
        🎹 Tap the colorful piano keys to create cheerful music, animal sounds, or learn song melodies!
      </div>
    </div>
  );
};
