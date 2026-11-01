import React from 'react';
import { Play, RotateCcw, Home, Volume2, VolumeX, Sparkles, X, Smartphone } from 'lucide-react';
import { sound } from '../utils/sound';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onGoHome: () => void;
  stars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAndroidPublish?: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onGoHome,
  stars,
  isMuted,
  onToggleMute,
  onOpenAndroidPublish
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-sm bg-white rounded-3xl border-4 border-amber-300 p-6 shadow-2xl flex flex-col items-center text-center animate-pop relative">
        {/* Close corner */}
        <button
          onClick={() => {
            sound.playTap();
            onResume();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl mb-2">
          ⏸️
        </div>

        <h2 className="text-2xl font-black text-slate-800 font-baloo">
          Game Paused
        </h2>
        <p className="text-xs font-bold text-amber-800 mb-4">
          खेल रुका हुआ है · Have a quick sip of water!
        </p>

        {/* Stars collected */}
        <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 px-4 py-2 rounded-2xl mb-5 w-full justify-center">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span className="font-extrabold text-slate-800 font-mono text-base">
            Total Stars Earned: {stars} ⭐
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={() => {
              sound.playTap();
              onResume();
            }}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-lg shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Resume (खेल जारी रखें)</span>
          </button>

          {onOpenAndroidPublish && (
            <button
              onClick={() => {
                sound.playTap();
                onOpenAndroidPublish();
              }}
              className="w-full py-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-sm shadow-xs flex items-center justify-center gap-2 border border-emerald-300 active:scale-95 transition-transform"
            >
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>Android App (Publish / Install)</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playTap();
              onGoHome();
            }}
            className="w-full py-3 rounded-2xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-base shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Home className="w-5 h-5" />
            <span>Main Menu (मुख्य पृष्ठ)</span>
          </button>

          <button
            onClick={() => {
              onToggleMute();
              sound.playTap();
            }}
            className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-transform"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? 'Unmute Sound' : 'Mute Sound'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
