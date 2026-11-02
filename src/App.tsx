import React, { useState, useEffect, useCallback } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { HeaderHUD } from './components/HeaderHUD';
import { AlphabetLearn } from './components/AlphabetLearn';
import { HindiVarnamala } from './components/HindiVarnamala';
import { Numbers100 } from './components/Numbers100';
import { FruitsLearn } from './components/FruitsLearn';
import { EnglishBasics } from './components/EnglishBasics';
import { BalloonPopGame } from './components/BalloonPopGame';
import { QuizAdventure } from './components/QuizAdventure';
import { MagicSlate } from './components/MagicSlate';
import { MemoryMatchGame } from './components/MemoryMatchGame';
import { FruitCatcherGame } from './components/FruitCatcherGame';
import { AnimalFeedingGame } from './components/AnimalFeedingGame';
import { ToddlerPianoGame } from './components/ToddlerPianoGame';
import { PauseModal } from './components/PauseModal';
import { AndroidPublishModal } from './components/AndroidPublishModal';
import { usePWAInstall } from './utils/usePWAInstall';
import { sound } from './utils/sound';

export type GameMode =
  | 'abc'
  | 'hindi'
  | 'numbers'
  | 'fruits'
  | 'english'
  | 'balloon'
  | 'catcher'
  | 'feeding'
  | 'piano'
  | 'quiz'
  | 'slate'
  | 'memory';

export default function App() {
  const [gameState, setGameState] = useState<'TITLE' | 'PLAYING'>('TITLE');
  const [activeModule, setActiveModule] = useState<GameMode>('abc');
  const [langMode, setLangMode] = useState<'en' | 'hi' | 'dual'>('dual');
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [traceChar, setTraceChar] = useState<string>('A');
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);

  // PWA Install hook for Android
  const { isInstallable, install } = usePWAInstall();

  // Star rewards with persistent memory
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bal_stars');
      return saved ? parseInt(saved, 10) : 10;
    } catch {
      return 10;
    }
  });

  const addStar = useCallback(() => {
    setStars((prev) => {
      const updated = prev + 1;
      try {
        localStorage.setItem('bal_stars', updated.toString());
      } catch {}
      return updated;
    });
  }, []);

  const toggleMute = useCallback(() => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  const handleStartGame = (mode: string = 'abc') => {
    setActiveModule(mode as GameMode);
    setGameState('PLAYING');
    setIsPaused(false);
  };

  const handleGoHome = () => {
    sound.playTap();
    setGameState('TITLE');
    setIsPaused(false);
  };

  const handleOpenSlate = (char: string) => {
    setTraceChar(char);
    setActiveModule('slate');
  };

  // Keyboard controls: Esc to pause, Space to repeat or start
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isAndroidModalOpen) {
          setIsAndroidModalOpen(false);
        } else if (gameState === 'PLAYING') {
          setIsPaused((p) => !p);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isAndroidModalOpen]);

  // Module meta info
  const getModuleMeta = () => {
    switch (activeModule) {
      case 'abc':
        return { title: 'ABC Alphabet Phonics', sub: 'Learn letters & sounds', icon: '🔤' };
      case 'hindi':
        return { title: 'हिंदी वर्णमाला', sub: 'स्वर और व्यंजन सीखें', icon: '🕉️' };
      case 'numbers':
        return { title: '1 to 100 Numbers & Counting', sub: 'गिनती और तारे', icon: '🔢' };
      case 'fruits':
        return { title: 'Yummy Fruits (फलों के नाम)', sub: 'Sweet, juicy & healthy', icon: '🍎' };
      case 'english':
        return { title: 'Colors, Animals & Rhymes', sub: 'English basics for kids', icon: '🎨' };
      case 'balloon':
        return { title: 'Balloon Pop Party', sub: 'Tap to pop & listen', icon: '🎈' };
      case 'catcher':
        return { title: 'Fruit Basket Catch', sub: 'फल टोकरी में पकड़ो', icon: '🧺' };
      case 'feeding':
        return { title: 'Feed Hungry Animals', sub: 'जानवरों को खाना खिलाओ', icon: '🐵' };
      case 'piano':
        return { title: 'Toddler Rainbow Piano', sub: 'जादुई पियानो व सुर संगम', icon: '🎹' };
      case 'quiz':
        return { title: 'Find & Tap Quiz', sub: 'Audio question game', icon: '🎯' };
      case 'slate':
        return { title: 'Magic Slate & Tracing', sub: 'Rainbow chalk drawing', icon: '✏️' };
      case 'memory':
        return { title: 'Memory Match Cards', sub: 'Find matching pairs', icon: '🃏' };
    }
  };

  const currentMeta = getModuleMeta();

  return (
    <div className="relative w-screen h-screen max-w-full max-h-screen overflow-hidden flex flex-col bg-amber-50 font-baloo text-slate-800">
      {/* 1. TITLE SCREEN */}
      {gameState === 'TITLE' ? (
        <TitleScreen
          onStartGame={handleStartGame}
          stars={stars}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onOpenAndroidPublish={() => setIsAndroidModalOpen(true)}
          isInstallable={isInstallable}
        />
      ) : (
        /* 2. ACTIVE PLAY VIEW (Game Shell) */
        <div className="relative flex-1 flex flex-col w-full h-full overflow-hidden">
          {/* Top Low-Occlusion Game HUD */}
          <HeaderHUD
            currentTitle={currentMeta.title}
            currentSubtitle={currentMeta.sub}
            icon={currentMeta.icon}
            stars={stars}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            langMode={langMode}
            onChangeLangMode={setLangMode}
            onGoHome={handleGoHome}
            onOpenAndroidPublish={() => setIsAndroidModalOpen(true)}
            extraControls={
              /* Quick module switcher rail */
              <div className="flex items-center gap-1 bg-amber-100/70 p-1 rounded-2xl border border-amber-200 overflow-x-auto no-scrollbar max-w-[280px]">
                {(
                  [
                    'abc',
                    'hindi',
                    'numbers',
                    'fruits',
                    'english',
                    'balloon',
                    'catcher',
                    'feeding',
                    'piano',
                    'quiz',
                    'slate',
                    'memory'
                  ] as const
                ).map((m) => {
                  const icons: Record<GameMode, string> = {
                    abc: '🔤',
                    hindi: '🕉️',
                    numbers: '🔢',
                    fruits: '🍎',
                    english: '🎨',
                    balloon: '🎈',
                    catcher: '🧺',
                    feeding: '🐵',
                    piano: '🎹',
                    quiz: '🎯',
                    slate: '✏️',
                    memory: '🃏'
                  };
                  const isSelected = activeModule === m;
                  return (
                    <button
                      key={m}
                      onClick={() => {
                        sound.playTap();
                        setActiveModule(m);
                      }}
                      className={`p-1.5 rounded-xl text-sm sm:text-base transition-all ${
                        isSelected ? 'bg-amber-500 shadow-xs scale-110' : 'hover:bg-amber-200/60'
                      }`}
                      title={m.toUpperCase()}
                    >
                      {icons[m]}
                    </button>
                  );
                })}
              </div>
            }
          />

          {/* Active Learning Module Playfield */}
          <main className="flex-1 flex flex-col w-full h-full overflow-hidden relative">
            {activeModule === 'abc' && (
              <AlphabetLearn
                langMode={langMode}
                onAddStar={addStar}
                onOpenSlate={handleOpenSlate}
              />
            )}

            {activeModule === 'hindi' && (
              <HindiVarnamala
                langMode={langMode}
                onAddStar={addStar}
                onOpenSlate={handleOpenSlate}
              />
            )}

            {activeModule === 'numbers' && (
              <Numbers100
                langMode={langMode}
                onAddStar={addStar}
                onOpenSlate={handleOpenSlate}
              />
            )}

            {activeModule === 'fruits' && (
              <FruitsLearn
                langMode={langMode}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'english' && (
              <EnglishBasics
                langMode={langMode}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'balloon' && (
              <BalloonPopGame
                langMode={langMode}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'catcher' && (
              <FruitCatcherGame
                langMode={langMode}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'feeding' && (
              <AnimalFeedingGame
                langMode={langMode}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'piano' && (
              <ToddlerPianoGame
                langMode={langMode}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'quiz' && (
              <QuizAdventure
                langMode={langMode}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'slate' && (
              <MagicSlate
                traceChar={traceChar}
                onClose={() => setActiveModule('abc')}
                onAddStar={addStar}
              />
            )}

            {activeModule === 'memory' && (
              <MemoryMatchGame
                langMode={langMode}
                onAddStar={addStar}
              />
            )}
          </main>

          {/* Bottom Persistent Activity Dock for Toddlers */}
          <nav className="w-full bg-white/95 backdrop-blur-md border-t-2 border-amber-200/80 px-2 py-1.5 flex items-center justify-around gap-1 z-30 shrink-0 overflow-x-auto no-scrollbar">
            {[
              { id: 'abc', label: 'ABC', icon: '🔤' },
              { id: 'hindi', label: 'वर्णमाला', icon: '🕉️' },
              { id: 'numbers', label: '123', icon: '🔢' },
              { id: 'fruits', label: 'Fruits', icon: '🍎' },
              { id: 'catcher', label: 'Catch', icon: '🧺' },
              { id: 'feeding', label: 'Feed', icon: '🐵' },
              { id: 'piano', label: 'Piano', icon: '🎹' },
              { id: 'balloon', label: 'Balloons', icon: '🎈' },
              { id: 'quiz', label: 'Quiz', icon: '🎯' },
              { id: 'slate', label: 'Slate', icon: '✏️' },
              { id: 'memory', label: 'Pairs', icon: '🃏' }
            ].map((tab) => {
              const isSelected = activeModule === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playTap();
                    setActiveModule(tab.id as GameMode);
                  }}
                  className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2 rounded-xl transition-all active:scale-95 cursor-pointer shrink-0 min-w-[44px] ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-xs font-black scale-105'
                      : 'text-slate-600 hover:bg-amber-100 font-bold'
                  }`}
                >
                  <span className="text-xl sm:text-2xl leading-none">{tab.icon}</span>
                  <span className="text-[10px] sm:text-xs leading-tight mt-0.5 whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Pause Modal */}
      <PauseModal
        isOpen={isPaused}
        onResume={() => setIsPaused(false)}
        onGoHome={handleGoHome}
        stars={stars}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenAndroidPublish={() => setIsAndroidModalOpen(true)}
      />

      {/* Android App Publish & Install Modal */}
      <AndroidPublishModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        onTriggerPWAInstall={install}
        isInstallable={isInstallable}
      />
    </div>
  );
}
