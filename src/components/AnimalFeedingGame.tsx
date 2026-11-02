import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, Heart, RefreshCw, Trophy } from 'lucide-react';
import { sound } from '../utils/sound';

interface AnimalFriend {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  favoriteFood: string;
  foodEmoji: string;
  foodHindi: string;
  dialogueEn: string;
  dialogueHi: string;
  color: string;
}

const ANIMALS_TO_FEED: AnimalFriend[] = [
  {
    id: 'monkey',
    name: 'Mischievous Monkey',
    hindiName: 'बंदर (Bandar)',
    emoji: '🐵',
    favoriteFood: 'Banana',
    foodEmoji: '🍌',
    foodHindi: 'केला (Kela)',
    dialogueEn: 'I am hungry! Can you feed me a sweet Banana?',
    dialogueHi: 'मुझे भूख लगी है! क्या मुझे मीठा केला दोगे?',
    color: '#F59E0B'
  },
  {
    id: 'elephant',
    name: 'Gentle Elephant',
    hindiName: 'हाथी (Haathi)',
    emoji: '🐘',
    favoriteFood: 'Sugarcane',
    foodEmoji: '🎋',
    foodHindi: 'ईख / गन्ना (Eekh)',
    dialogueEn: 'I love crunchy sweet Sugarcane! Please give me one!',
    dialogueHi: 'मुझे मीठा गन्ना (ईख) बहुत पसंद है!',
    color: '#3B82F6'
  },
  {
    id: 'rabbit',
    name: 'Fluffy Bunny',
    hindiName: 'खरगोश (Khargosh)',
    emoji: '🐰',
    favoriteFood: 'Carrot',
    foodEmoji: '🥕',
    foodHindi: 'गाजर (Gaajar)',
    dialogueEn: 'Hop hop! I want a crunchy red Carrot!',
    dialogueHi: 'मुझे कुरकुरी लाल गाजर खाना है!',
    color: '#EC4899'
  },
  {
    id: 'cow',
    name: 'Happy Cow',
    hindiName: 'गौ माता (Gaay)',
    emoji: '🐮',
    favoriteFood: 'Green Apple',
    foodEmoji: '🍏',
    foodHindi: 'हरा सेब (Seb)',
    dialogueEn: 'Moo! Feed me a juicy green Apple, please!',
    dialogueHi: 'मुझे रसीला सेब खाना बहुत अच्छा लगता है!',
    color: '#10B981'
  },
  {
    id: 'cat',
    name: 'Playful Kitty',
    hindiName: 'बिल्ली (Billi)',
    emoji: '🐱',
    favoriteFood: 'Tasty Fish',
    foodEmoji: '🐟',
    foodHindi: 'मछली (Machhli)',
    dialogueEn: 'Meow! I would love a yummy Fish!',
    dialogueHi: 'म्याऊँ! मुझे स्वादिष्ट मछली खाना पसंद है!',
    color: '#8B5CF6'
  },
  {
    id: 'bear',
    name: 'Cuddly Bear',
    hindiName: 'भालू (Bhaalu)',
    emoji: '🐻',
    favoriteFood: 'Strawberry',
    foodEmoji: '🍓',
    foodHindi: 'स्ट्रॉबेरी (Strawberry)',
    dialogueEn: 'Grrr! Give me sweet red Strawberries!',
    dialogueHi: 'मुझे मीठी लाल स्ट्रॉबेरी बहुत भाती है!',
    color: '#92400E'
  }
];

const ALL_FOOD_CHOICES = [
  { name: 'Banana', emoji: '🍌', hindi: 'केला' },
  { name: 'Sugarcane', emoji: '🎋', hindi: 'ईख' },
  { name: 'Carrot', emoji: '🥕', hindi: 'गाजर' },
  { name: 'Green Apple', emoji: '🍏', hindi: 'सेब' },
  { name: 'Tasty Fish', emoji: '🐟', hindi: 'मछली' },
  { name: 'Strawberry', emoji: '🍓', hindi: 'स्ट्रॉबेरी' }
];

interface AnimalFeedingGameProps {
  langMode: 'en' | 'hi' | 'dual';
  onAddStar: () => void;
}

export const AnimalFeedingGame: React.FC<AnimalFeedingGameProps> = ({
  langMode,
  onAddStar
}) => {
  const [animalIndex, setAnimalIndex] = useState(0);
  const [foodOptions, setFoodOptions] = useState<typeof ALL_FOOD_CHOICES>([]);
  const [isEating, setIsEating] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'happy' | 'wrong'>('idle');
  const [fedCount, setFedCount] = useState(0);

  const currentAnimal = ANIMALS_TO_FEED[animalIndex];

  // Setup question food choices (1 correct + 3 random decoys)
  const setupAnimal = (idx: number) => {
    const animal = ANIMALS_TO_FEED[idx];
    const correctFood = ALL_FOOD_CHOICES.find((f) => f.name === animal.favoriteFood)!;
    const decoys = ALL_FOOD_CHOICES.filter((f) => f.name !== animal.favoriteFood).sort(
      () => 0.5 - Math.random()
    );
    const options = [correctFood, decoys[0], decoys[1], decoys[2]].sort(() => 0.5 - Math.random());
    setFoodOptions(options);
    setFeedbackState('idle');
    setIsEating(false);

    // Speak animal's desire
    setTimeout(() => {
      if (langMode === 'hi') {
        sound.speak(`${animal.hindiName}. ${animal.dialogueHi}`, 'hi-IN', 0.88);
      } else if (langMode === 'en') {
        sound.speak(`${animal.name}! ${animal.dialogueEn}`, 'en-US', 0.9);
      } else {
        sound.speakBilingual(animal.dialogueEn, animal.dialogueHi);
      }
    }, 200);
  };

  useEffect(() => {
    setupAnimal(animalIndex);
  }, [animalIndex]);

  const handleFeed = (food: (typeof ALL_FOOD_CHOICES)[0]) => {
    if (isEating) return;

    if (food.name === currentAnimal.favoriteFood) {
      // SUCCESS: Feed animal!
      setIsEating(true);
      setFeedbackState('happy');
      sound.playMunch();
      onAddStar();
      setFedCount((c) => c + 1);

      try {
        confetti({
          particleCount: 25,
          spread: 70,
          origin: { y: 0.5 }
        });
      } catch {}

      if (langMode === 'hi') {
        sound.speak('वाह! स्वादिष्ट! धन्यवाद!', 'hi-IN', 0.9);
      } else {
        sound.speak('Yum yum! Delicious! Thank you!', 'en-US', 0.95);
      }

      // Next animal after eating animation
      setTimeout(() => {
        setAnimalIndex((prev) => (prev + 1) % ANIMALS_TO_FEED.length);
      }, 1800);
    } else {
      // WRONG FOOD: Friendly reminder
      setFeedbackState('wrong');
      sound.playEncouragingWobble();

      if (langMode === 'hi') {
        sound.speak(`नहीं, मुझे ${currentAnimal.foodHindi} पसंद है!`, 'hi-IN', 0.88);
      } else {
        sound.speak(`Not this one! I want ${currentAnimal.favoriteFood}!`, 'en-US', 0.9);
      }

      setTimeout(() => {
        setFeedbackState('idle');
      }, 1200);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 bg-amber-100 px-3 py-1.5 rounded-2xl border border-amber-300">
          <span className="text-xl">🥗</span>
          <span className="font-extrabold text-amber-950 text-xs sm:text-sm font-mono">
            Fed: {fedCount} Animals ⭐
          </span>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            setAnimalIndex((prev) => (prev + 1) % ANIMALS_TO_FEED.length);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs shadow-xs active:scale-95 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Next Animal</span>
        </button>
      </div>

      {/* Main Animal Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-0 py-2">
        {/* Animal Character Card */}
        <div
          style={{ borderColor: currentAnimal.color }}
          className={`w-full max-w-md bg-white/95 rounded-3xl border-4 p-5 sm:p-7 flex flex-col items-center justify-between shadow-xl transition-all duration-300 ${
            feedbackState === 'happy'
              ? 'scale-105 bg-emerald-50 border-emerald-400'
              : feedbackState === 'wrong'
              ? 'animate-wiggle border-rose-400'
              : ''
          }`}
        >
          {/* Animal dialogue speech bubble */}
          <div className="w-full bg-amber-100/90 rounded-2xl p-3 border border-amber-300 shadow-xs text-center relative mb-2">
            <p className="text-sm sm:text-base font-black text-slate-800 leading-tight">
              {langMode === 'hi' ? currentAnimal.dialogueHi : currentAnimal.dialogueEn}
            </p>
            {langMode === 'dual' && (
              <p className="text-xs font-bold text-amber-800 font-baloo mt-0.5">
                {currentAnimal.dialogueHi}
              </p>
            )}
            {/* Bubble arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-300" />
          </div>

          {/* Huge Animated Animal Face with Open/Close mouth effect */}
          <div className="my-2 relative flex flex-col items-center">
            <span
              className={`text-8xl sm:text-9xl transition-transform filter drop-shadow-md ${
                isEating ? 'scale-120 animate-bounce' : 'animate-wiggle'
              }`}
            >
              {currentAnimal.emoji}
            </span>

            {/* Heart celebrations when fed */}
            {feedbackState === 'happy' && (
              <div className="absolute -top-4 -right-4 flex items-center text-rose-500 animate-bounce">
                <Heart className="w-8 h-8 fill-rose-500" />
                <span className="text-3xl ml-1">😋</span>
              </div>
            )}
          </div>

          {/* Animal Name & Food request */}
          <div className="text-center mt-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {currentAnimal.name}
            </h3>
            <span className="text-xs sm:text-sm font-bold text-amber-800 font-baloo">
              {currentAnimal.hindiName} · Craves {currentAnimal.favoriteFood} ({currentAnimal.foodEmoji})
            </span>
          </div>
        </div>
      </div>

      {/* Food Choices (Tap to Feed) */}
      <div className="mt-2 w-full">
        <p className="text-xs sm:text-sm font-bold text-amber-950 text-center mb-2">
          👉 Tap the right yummy food to feed the {currentAnimal.name}!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {foodOptions.map((food) => (
            <button
              key={food.name}
              onClick={() => handleFeed(food)}
              disabled={isEating}
              className="p-3 rounded-2xl bg-white hover:bg-amber-50 border-3 border-amber-200 hover:border-amber-400 shadow-md hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer disabled:opacity-50"
            >
              <span className="text-4xl sm:text-5xl mb-1 filter drop-shadow-xs">{food.emoji}</span>
              <span className="font-extrabold text-sm sm:text-base text-slate-800">{food.name}</span>
              <span className="text-xs font-bold text-amber-800 font-baloo">{food.hindi}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
