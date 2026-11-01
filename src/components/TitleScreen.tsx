import React, { useEffect } from 'react';
import { Play, Sparkles, Volume2, VolumeX, Smartphone, Download } from 'lucide-react';
import { sound } from '../utils/sound';

interface TitleScreenProps {
  onStartGame: (mode?: string) => void;
  stars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAndroidPublish: () => void;
  isInstallable?: boolean;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  stars,
  isMuted,
  onToggleMute,
  onOpenAndroidPublish,
  isInstallable
}) => {
  // Listen for Enter or Space key to start game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        sound.playSuccess();
        onStartGame('abc');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 select-none overflow-y-auto bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
      {/* Background Animated Sky & Playful Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 z-0">
        <div className="absolute top-6 left-8 text-5xl sm:text-7xl animate-float">☁️</div>
        <div className="absolute top-16 right-12 text-6xl sm:text-8xl animate-float" style={{ animationDelay: '1.8s' }}>☁️</div>
        <div className="absolute bottom-16 left-12 text-5xl sm:text-6xl animate-wiggle">🎈</div>
        <div className="absolute bottom-20 right-16 text-5xl sm:text-6xl animate-wiggle" style={{ animationDelay: '1s' }}>🪁</div>
      </div>

      {/* Top Perimeter HUD */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border-2 border-amber-300 shadow-sm">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-extrabold text-amber-900 text-sm sm:text-base font-mono tabular-nums">
            Stars: {stars} ⭐
          </span>
        </div>

        {/* Android App Publish / Install CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playTap();
              onOpenAndroidPublish();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all border-2 border-emerald-300"
            title="Install on Android or Publish to Play Store"
          >
            <Smartphone className="w-4 h-4" />
            <span>Android App (Publish / Install)</span>
            {isInstallable && (
              <span className="bg-amber-300 text-amber-950 text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-black">
                Ready
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onToggleMute();
              if (isMuted) sound.playTap();
            }}
            className={`p-2 sm:p-2.5 rounded-2xl border-2 transition-all active:scale-95 shadow-sm ${
              isMuted
                ? 'bg-rose-100 text-rose-700 border-rose-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Hero Centerpiece: Bespoke SVG Title Lockup */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-4 max-w-2xl">
        {/* Inline SVG Bespoke Logo Lockup */}
        <div className="relative flex items-center justify-center mb-1">
          <svg className="w-64 sm:w-80 h-24" viewBox="0 0 320 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="50%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
              <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {/* Playful smiling sun */}
            <circle cx="45" cy="42" r="22" fill="url(#sunGrad)" />
            <circle cx="40" cy="38" r="2.5" fill="#78350F" />
            <circle cx="50" cy="38" r="2.5" fill="#78350F" />
            <path d="M 39 46 Q 45 52 51 46" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Title text */}
            <text x="76" y="52" fontFamily="'Baloo 2', sans-serif" fontWeight="900" fontSize="38" fill="url(#titleGrad)" letterSpacing="1">
              बाल Vidyalaya
            </text>
            <text x="80" y="74" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="13" fill="#92400E" letterSpacing="2">
              KIDS LEARNING ADVENTURE
            </text>
          </svg>
        </div>

        <p className="text-sm sm:text-base font-bold text-amber-900/80 mb-5 max-w-md">
          Learn ABC, हिंदी वर्णमाला, 1 to 100 counting, delicious fruits & playful games!
        </p>

        {/* Primary Start CTA Button */}
        <button
          onClick={() => {
            sound.playSuccess();
            onStartGame('abc');
          }}
          className="group relative px-8 sm:px-12 py-3.5 sm:py-4 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-3 border-amber-300 cursor-pointer animate-pulse-gentle"
        >
          <Play className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
          <span>Start Adventure! (शुरू करें)</span>
        </button>

        {/* Interactive Hero Preview Cards (Hover/tap for fun sounds) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mt-6 w-full max-w-md">
          {[
            { label: 'A a', sub: 'Apple', emoji: '🍎', color: '#EF4444', mode: 'abc' },
            { label: 'अ क', sub: 'वर्णमाला', emoji: '🕊️', color: '#3B82F6', mode: 'hindi' },
            { label: '1 2 3', sub: '1 to 100', emoji: '🔢', color: '#10B981', mode: 'numbers' },
            { label: 'आम', sub: 'Fruits', emoji: '🥭', color: '#F59E0B', mode: 'fruits' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                sound.playSuccess();
                onStartGame(item.mode);
              }}
              className="p-2 sm:p-3 rounded-2xl bg-white/90 hover:bg-white border-2 border-amber-200 hover:border-amber-400 shadow-md flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-2xl sm:text-3xl mb-0.5">{item.emoji}</span>
              <span className="font-black text-xs sm:text-sm text-slate-800 font-baloo leading-tight">
                {item.label}
              </span>
              <span className="text-[10px] font-bold text-amber-700 leading-tight">
                {item.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Launchpad to all 8 modules */}
      <div className="relative z-10 w-full max-w-4xl bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-2 border-amber-200/90 shadow-lg">
        <p className="text-xs font-black text-amber-900/80 mb-2 text-center uppercase tracking-wider">
          Or Choose What You Want to Learn & Play Today:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'abc', title: 'ABC Alphabet', icon: '🔤', desc: 'Phonics & words' },
            { id: 'hindi', title: 'हिंदी वर्णमाला', icon: '🕉️', desc: 'स्वर व व्यंजन' },
            { id: 'numbers', title: '1 to 100 Numbers', icon: '🔢', desc: 'गिनती और तारे' },
            { id: 'fruits', title: 'Yummy Fruits', icon: '🍉', desc: 'फलों के नाम' },
            { id: 'english', title: 'Colors & Animals', icon: '🎨', desc: 'रंग, जानवर, गीत' },
            { id: 'balloon', title: 'Balloon Pop Game', icon: '🎈', desc: 'गुब्बारे फोड़ो' },
            { id: 'quiz', title: 'Find & Tap Quiz', icon: '🎯', desc: 'पहचानो खेल' },
            { id: 'slate', title: 'Magic Slate', icon: '✏️', desc: 'जादुई स्लेट' }
          ].map((card) => (
            <button
              key={card.id}
              onClick={() => {
                sound.playSuccess();
                onStartGame(card.id);
              }}
              className="p-2 sm:p-2.5 rounded-2xl bg-amber-50/90 hover:bg-amber-100/90 border border-amber-200 hover:border-amber-400 text-left transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span className="text-2xl sm:text-3xl shrink-0">{card.icon}</span>
              <div className="min-w-0">
                <span className="font-extrabold text-xs sm:text-sm text-slate-800 block truncate font-baloo leading-tight">
                  {card.title}
                </span>
                <span className="text-[10px] font-semibold text-amber-800/80 block truncate">
                  {card.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Flat Control Hint Line required by game guidelines */}
      <div className="relative z-10 mt-3 text-center text-xs font-bold text-amber-900/70">
        <span>Tap / Click to Play · Press Space to Hear Sound · Esc for Menu</span>
      </div>
    </div>
  );
};
