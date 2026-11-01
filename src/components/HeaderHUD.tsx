import React from 'react';
import { Volume2, VolumeX, Sparkles, Home, ArrowLeft, Smartphone } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderHUDProps {
  currentTitle: string;
  currentSubtitle?: string;
  icon?: string;
  stars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  langMode: 'en' | 'hi' | 'dual';
  onChangeLangMode: (mode: 'en' | 'hi' | 'dual') => void;
  onGoHome: () => void;
  onBack?: () => void;
  extraControls?: React.ReactNode;
  onOpenAndroidPublish?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentTitle,
  currentSubtitle,
  icon,
  stars,
  isMuted,
  onToggleMute,
  langMode,
  onChangeLangMode,
  onGoHome,
  onBack,
  extraControls,
  onOpenAndroidPublish
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-sm px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 z-30 select-none">
      {/* Left zone: Navigation & Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {onBack && (
          <button
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-all active:scale-95 flex items-center justify-center shadow-xs"
            title="Go Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        <button
          onClick={() => {
            sound.playTap();
            onGoHome();
          }}
          className="p-2 sm:p-2.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 transition-all active:scale-95 flex items-center justify-center shadow-xs"
          title="Home Menu"
          aria-label="Home"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          {icon && <span className="text-2xl sm:text-3xl shrink-0">{icon}</span>}
          <div className="truncate">
            <h1 className="text-base sm:text-xl font-bold text-slate-800 tracking-tight leading-tight truncate">
              {currentTitle}
            </h1>
            {currentSubtitle && (
              <p className="text-xs text-amber-700/80 font-medium truncate hidden sm:block">
                {currentSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Middle zone: Extra submode controls if any */}
      {extraControls && (
        <div className="hidden lg:flex items-center gap-2">
          {extraControls}
        </div>
      )}

      {/* Right zone: Android guide, Language toggle, Star Reward count, Sound mute */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {onOpenAndroidPublish && (
          <button
            onClick={() => {
              sound.playTap();
              onOpenAndroidPublish();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold text-xs flex items-center gap-1 border border-emerald-300 shadow-xs active:scale-95 transition-all"
            title="Android App Install & Publish"
          >
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span className="hidden md:inline">Android App</span>
          </button>
        )}

        {/* Language selector for voice */}
        <div className="flex items-center bg-amber-100/90 rounded-xl p-1 border border-amber-200 shadow-xs">
          <button
            onClick={() => {
              sound.playTap();
              onChangeLangMode('en');
              sound.speak('English Voice', 'en-US');
            }}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
              langMode === 'en'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
            title="English Audio"
          >
            EN
          </button>
          <button
            onClick={() => {
              sound.playTap();
              onChangeLangMode('hi');
              sound.speak('हिंदी आवाज़', 'hi-IN');
            }}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
              langMode === 'hi'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
            title="Hindi Audio"
          >
            हिंदी
          </button>
          <button
            onClick={() => {
              sound.playTap();
              onChangeLangMode('dual');
              sound.speak('Both languages', 'en-US');
            }}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all hidden sm:inline-block ${
              langMode === 'dual'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
            title="Both English & Hindi"
          >
            Dual
          </button>
        </div>

        {/* Stars counter with sparkle */}
        <div 
          className="flex items-center gap-1.5 bg-yellow-100 border-2 border-yellow-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-xs"
          title="Earned Stars!"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-extrabold text-amber-900 text-sm sm:text-base font-mono tabular-nums">
            {stars}
          </span>
        </div>

        {/* Sound Mute Toggle */}
        <button
          onClick={() => {
            onToggleMute();
            if (isMuted) {
              sound.playTap();
            }
          }}
          className={`p-2 sm:p-2.5 rounded-xl border transition-all active:scale-95 flex items-center justify-center shadow-xs ${
            isMuted 
              ? 'bg-rose-100 text-rose-700 border-rose-300' 
              : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
          }`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>
    </header>
  );
};
