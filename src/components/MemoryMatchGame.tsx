import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Star, Trophy, Sparkles } from 'lucide-react';
import { FRUITS_DATA, ANIMALS_DATA, ALPHABET_DATA } from '../data/learningData';
import { sound } from '../utils/sound';

interface CardItem {
  uid: number;
  id: string;
  display: string;
  label: string;
  hindiLabel: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchGameProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({
  langMode,
  onAddStar
}) => {
  const [category, setCategory] = useState<'fruits' | 'animals' | 'abc'>('fruits');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchesWon, setMatchesWon] = useState(0);

  const initDeck = (cat: 'fruits' | 'animals' | 'abc' = category) => {
    let source: { id: string; display: string; label: string; hindiLabel: string }[] = [];
    if (cat === 'fruits') {
      source = FRUITS_DATA.slice(0, 6).map((f) => ({
        id: f.id,
        display: f.emoji,
        label: f.name,
        hindiLabel: f.hindiName
      }));
    } else if (cat === 'animals') {
      source = ANIMALS_DATA.slice(0, 6).map((a) => ({
        id: a.name,
        display: a.emoji,
        label: a.name,
        hindiLabel: a.hindiName
      }));
    } else {
      source = ALPHABET_DATA.slice(0, 6).map((item) => ({
        id: item.letter,
        display: item.upper,
        label: item.word,
        hindiLabel: item.hindiWord
      }));
    }

    // Duplicate for pairs
    const deck: CardItem[] = [...source, ...source]
      .sort(() => 0.5 - Math.random())
      .map((item, idx) => ({
        uid: idx,
        id: item.id,
        display: item.display,
        label: item.label,
        hindiLabel: item.hindiLabel,
        isFlipped: false,
        isMatched: false
      }));

    setCards(deck);
    setFlippedUids([]);
    setIsLocked(false);
    setMatchesWon(0);
  };

  useEffect(() => {
    initDeck(category);
  }, [category]);

  const handleCardClick = (card: CardItem) => {
    if (isLocked || card.isFlipped || card.isMatched) return;

    sound.playTap();
    const newCards = cards.map((c) => (c.uid === card.uid ? { ...c, isFlipped: true } : c));
    setCards(newCards);

    const newFlipped = [...flippedUids, card.uid];
    setFlippedUids(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const firstCard = cards.find((c) => c.uid === newFlipped[0])!;
      const secondCard = card;

      if (firstCard.id === secondCard.id) {
        // Matched!
        setTimeout(() => {
          sound.playSuccess();
          onAddStar();
          if (langMode === 'hi') {
            sound.speak(`${firstCard.hindiLabel}! शाबाश!`, 'hi-IN', 0.9);
          } else {
            sound.speak(`Matched! ${firstCard.label}!`, 'en-US', 0.95);
          }

          setCards((prev) =>
            prev.map((c) => (c.id === firstCard.id ? { ...c, isMatched: true } : c))
          );
          setFlippedUids([]);
          setIsLocked(false);
          setMatchesWon((m) => {
            const nextM = m + 1;
            if (nextM === 6) {
              // Game Won!
              try {
                confetti({ particleCount: 50, spread: 80, origin: { y: 0.5 } });
              } catch {}
            }
            return nextM;
          });
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          sound.playEncouragingWobble();
          setCards((prev) =>
            prev.map((c) =>
              c.uid === newFlipped[0] || c.uid === newFlipped[1]
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedUids([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top filter bar */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div className="flex items-center gap-1 bg-amber-100 p-1 rounded-2xl border border-amber-200">
          {(['fruits', 'animals', 'abc'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playTap();
                setCategory(cat);
              }}
              className={`px-3 py-1 rounded-xl font-black text-xs sm:text-sm capitalize transition-all ${
                category === cat ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              {cat === 'fruits' ? '🍎 Fruits' : cat === 'animals' ? '🦁 Animals' : '🔤 ABC'}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playTap();
            initDeck(category);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>New Game</span>
        </button>
      </div>

      {/* Grid of 12 Cards (6 Pairs) */}
      <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-4 min-h-0 items-center justify-center p-2">
        {cards.map((card) => {
          const showFront = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(card)}
              disabled={showFront || isLocked}
              className={`h-full max-h-[140px] sm:max-h-[160px] rounded-2xl sm:rounded-3xl border-3 sm:border-4 flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden ${
                showFront
                  ? 'bg-white border-amber-400 shadow-md rotate-0'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 shadow-md hover:scale-102'
              } ${card.isMatched ? 'opacity-85 ring-2 ring-emerald-400' : ''}`}
            >
              {showFront ? (
                <div className="flex flex-col items-center justify-center animate-pop">
                  <span className="text-4xl sm:text-5xl">{card.display}</span>
                  <span className="text-xs sm:text-sm font-black text-slate-700 font-baloo mt-1 truncate max-w-[80px]">
                    {card.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <span className="text-3xl sm:text-4xl filter drop-shadow-xs">🎁</span>
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-90 mt-1">
                    Flip!
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Status / Win Celebration */}
      <div className="mt-2 text-center">
        {matchesWon === 6 ? (
          <div className="bg-emerald-100 border-2 border-emerald-400 p-2.5 rounded-2xl flex items-center justify-center gap-2 text-emerald-900 font-black text-sm sm:text-base">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Hurray! All pairs matched! You did it! 🎉</span>
          </div>
        ) : (
          <span className="text-xs sm:text-sm font-bold text-amber-900/80">
            Pairs found: {matchesWon} / 6 ⭐
          </span>
        )}
      </div>
    </div>
  );
};
