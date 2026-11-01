import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, Star, CheckCircle, HelpCircle } from 'lucide-react';
import { ALPHABET_DATA, HINDI_SWAR_DATA, HINDI_VYANJAN_DATA, NUMBERS_1_TO_100, FRUITS_DATA } from '../data/learningData';
import { sound } from '../utils/sound';

interface QuizOption {
  id: string;
  display: string;
  subDisplay: string;
  label: string;
  color: string;
}

interface QuizQuestion {
  promptEn: string;
  promptHi: string;
  targetId: string;
  options: QuizOption[];
}

interface QuizAdventureProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

export const QuizAdventure: React.FC<QuizAdventureProps> = ({
  langMode,
  onAddStar
}) => {
  const [topic, setTopic] = useState<'all' | 'abc' | 'hindi' | 'numbers' | 'fruits'>('all');
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // Generate a random question based on topic
  const generateQuestion = (): QuizQuestion => {
    let chosenTopic = topic;
    if (topic === 'all') {
      const topics: ('abc' | 'hindi' | 'numbers' | 'fruits')[] = ['abc', 'hindi', 'numbers', 'fruits'];
      chosenTopic = topics[Math.floor(Math.random() * topics.length)];
    }

    if (chosenTopic === 'abc') {
      // Pick 3 random letters
      const shuffled = [...ALPHABET_DATA].sort(() => 0.5 - Math.random());
      const target = shuffled[0];
      const options: QuizOption[] = shuffled.slice(0, 3).map((item) => ({
        id: item.letter,
        display: item.upper,
        subDisplay: item.emoji,
        label: item.word,
        color: item.color
      })).sort(() => 0.5 - Math.random());

      return {
        promptEn: `Where is letter '${target.upper}' for ${target.word}?`,
        promptHi: `'${target.upper}' ढूँढो! ${target.word} के लिए`,
        targetId: target.letter,
        options
      };
    }

    if (chosenTopic === 'hindi') {
      const allHindi = [...HINDI_SWAR_DATA, ...HINDI_VYANJAN_DATA];
      const shuffled = allHindi.sort(() => 0.5 - Math.random());
      const target = shuffled[0];
      const options: QuizOption[] = shuffled.slice(0, 3).map((item) => ({
        id: item.letter,
        display: item.letter,
        subDisplay: item.emoji,
        label: item.word,
        color: item.color
      })).sort(() => 0.5 - Math.random());

      return {
        promptEn: `Find the Hindi letter '${target.letter}' (${target.wordRoman})!`,
        promptHi: `'${target.letter}' कहाँ है? ${target.letter} से ${target.word}`,
        targetId: target.letter,
        options
      };
    }

    if (chosenTopic === 'numbers') {
      const pool = NUMBERS_1_TO_100.slice(0, 20); // 1-20
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const target = shuffled[0];
      const options: QuizOption[] = shuffled.slice(0, 3).map((item) => ({
        id: item.num.toString(),
        display: item.num.toString(),
        subDisplay: item.hindiNum,
        label: item.englishWord,
        color: '#F59E0B'
      })).sort(() => 0.5 - Math.random());

      return {
        promptEn: `Tap the Number ${target.num} (${target.englishWord})!`,
        promptHi: `संख्या ${target.hindiWord} कहाँ है?`,
        targetId: target.num.toString(),
        options
      };
    }

    // fruits
    const shuffled = [...FRUITS_DATA].sort(() => 0.5 - Math.random());
    const target = shuffled[0];
    const options: QuizOption[] = shuffled.slice(0, 3).map((item) => ({
      id: item.id,
      display: item.emoji,
      subDisplay: item.hindiName,
      label: item.name,
      color: item.color
    })).sort(() => 0.5 - Math.random());

    return {
      promptEn: `Can you find the delicious ${target.name}?`,
      promptHi: `स्वादिष्ट ${target.hindiName} (${target.name}) कहाँ है?`,
      targetId: target.id,
      options
    };
  };

  const speakPrompt = (q: QuizQuestion) => {
    if (langMode === 'hi') {
      sound.speak(q.promptHi, 'hi-IN', 0.88);
    } else if (langMode === 'en') {
      sound.speak(q.promptEn, 'en-US', 0.9);
    } else {
      sound.speakBilingual(q.promptEn, q.promptHi);
    }
  };

  const nextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswerCorrect(null);
    const q = generateQuestion();
    setCurrentQuestion(q);
    speakPrompt(q);
  };

  useEffect(() => {
    nextQuestion();
  }, [topic]);

  const handleOptionClick = (optionId: string) => {
    if (isAnswerCorrect === true || !currentQuestion) return;

    setSelectedOptionId(optionId);
    if (optionId === currentQuestion.targetId) {
      // Correct!
      setIsAnswerCorrect(true);
      sound.playSuccess();
      onAddStar();
      setScore((s) => s + 1);

      try {
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }

      if (langMode === 'hi') {
        sound.speak('बहुत बढ़िया! शाबाश!', 'hi-IN', 0.9);
      } else {
        sound.speak('Great job! Wonderful!', 'en-US', 0.95);
      }

      setTimeout(() => {
        nextQuestion();
      }, 1600);
    } else {
      // Incorrect, gentle encourage
      setIsAnswerCorrect(false);
      sound.playEncouragingWobble();
      if (langMode === 'hi') {
        sound.speak('कोई बात नहीं, फिर से कोशिश करो!', 'hi-IN', 0.88);
      } else {
        sound.speak('Try again, you can do it!', 'en-US', 0.9);
      }
      setTimeout(() => {
        setIsAnswerCorrect(null);
        setSelectedOptionId(null);
      }, 1200);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top Topics Filter */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div className="flex items-center gap-1 bg-amber-100 p-1 rounded-2xl border border-amber-200 overflow-x-auto no-scrollbar">
          {(['all', 'abc', 'hindi', 'numbers', 'fruits'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                sound.playTap();
                setTopic(t);
              }}
              className={`px-3 py-1 rounded-xl font-black text-xs sm:text-sm capitalize transition-all ${
                topic === t ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-700'
              }`}
            >
              {t === 'all' ? '🌟 Mixed' : t === 'abc' ? '🔤 ABC' : t === 'hindi' ? 'अ क हिंदी' : t === 'numbers' ? '🔢 123' : '🍎 Fruits'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1.5 rounded-2xl border border-amber-300">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span className="font-extrabold text-amber-900 text-sm sm:text-base font-mono">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Question Prompt Card */}
      {currentQuestion && (
        <div className="bg-white/95 rounded-3xl border-4 border-amber-300 p-4 sm:p-6 shadow-md flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-2xl shrink-0 shadow-xs">
              🎯
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-800 leading-tight">
                {langMode === 'hi' ? currentQuestion.promptHi : currentQuestion.promptEn}
              </h2>
              {langMode === 'dual' && (
                <p className="text-xs sm:text-sm font-bold text-amber-800 mt-0.5 font-baloo">
                  {currentQuestion.promptHi}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => speakPrompt(currentQuestion)}
            className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-md flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            title="Repeat voice question"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* 3 Large Choice Cards for Toddlers */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-0 items-center justify-center">
        {currentQuestion?.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = isAnswerCorrect === true && isSelected;
          const isWrong = isAnswerCorrect === false && isSelected;

          return (
            <button
              key={opt.id}
              onClick={() => handleOptionClick(opt.id)}
              className={`h-full max-h-[220px] sm:max-h-[280px] rounded-3xl border-4 p-4 sm:p-6 flex flex-col items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer relative overflow-hidden ${
                isCorrect
                  ? 'bg-emerald-100 border-emerald-500 scale-105 shadow-emerald-200'
                  : isWrong
                  ? 'bg-rose-100 border-rose-400 animate-wiggle'
                  : 'bg-white hover:bg-amber-50/80 border-amber-200 hover:border-amber-400'
              }`}
            >
              <span className="text-6xl sm:text-7xl font-black text-slate-800 font-baloo filter drop-shadow-xs">
                {opt.display}
              </span>
              <span className="text-3xl sm:text-4xl">{opt.subDisplay}</span>
              <span className="font-extrabold text-sm sm:text-base text-slate-600 font-baloo">
                {opt.label}
              </span>

              {isCorrect && (
                <div className="absolute top-2 right-2 text-emerald-600">
                  <CheckCircle className="w-8 h-8 fill-emerald-100" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom control bar */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          onClick={nextQuestion}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Skip / Next Question</span>
        </button>
      </div>
    </div>
  );
};
