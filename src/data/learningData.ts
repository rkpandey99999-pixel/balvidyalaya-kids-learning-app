/**
 * Educational curriculum dataset for toddlers and young learners
 * Covers: English ABC, Hindi Varnamala, 1-100 Numbers, Fruits, Colors, Animals, Shapes & Rhymes
 */

export interface AlphabetItem {
  letter: string;
  upper: string;
  lower: string;
  word: string;
  hindiWord: string;
  phonics: string;
  emoji: string;
  color: string;
  bgLight: string;
  borderColor: string;
}

export interface HindiLetterItem {
  letter: string;
  roman: string;
  type: 'swar' | 'vyanjan';
  word: string;
  wordRoman: string;
  meaning: string;
  emoji: string;
  color: string;
  bgLight: string;
  borderColor: string;
}

export interface NumberItem {
  num: number;
  hindiNum: string;
  englishWord: string;
  hindiWord: string;
  itemsEmoji?: string;
  itemsLabel?: string;
}

export interface FruitItem {
  id: string;
  name: string;
  hindiName: string;
  hindiRoman: string;
  emoji: string;
  color: string;
  bgLight: string;
  taste: string;
  funFact: string;
}

export interface AnimalItem {
  name: string;
  hindiName: string;
  sound: string;
  soundText: string;
  emoji: string;
  fact: string;
}

export interface ColorItem {
  name: string;
  hindiName: string;
  hex: string;
  example: string;
  emoji: string;
}

export interface ShapeItem {
  name: string;
  hindiName: string;
  sides: number;
  example: string;
  svgPath: string;
  color: string;
}

export interface RhymeItem {
  title: string;
  hindiTitle: string;
  lines: string[];
  emoji: string;
  category: 'english' | 'hindi';
}

// 1. English ABC
export const ALPHABET_DATA: AlphabetItem[] = [
  { letter: 'A', upper: 'A', lower: 'a', word: 'Apple', hindiWord: 'सेब (Seb)', phonics: 'A for Apple · ऐ-पल', emoji: '🍎', color: '#EF4444', bgLight: '#FEF2F2', borderColor: '#FCA5A5' },
  { letter: 'B', upper: 'B', lower: 'b', word: 'Ball', hindiWord: 'गेंद (Gend)', phonics: 'B for Ball · बॉ-ल', emoji: '⚽', color: '#3B82F6', bgLight: '#EFF6FF', borderColor: '#93C5FD' },
  { letter: 'C', upper: 'C', lower: 'c', word: 'Cat', hindiWord: 'बिल्ली (Billi)', phonics: 'C for Cat · कै-ट', emoji: '🐱', color: '#F59E0B', bgLight: '#FFFBEB', borderColor: '#FCD34D' },
  { letter: 'D', upper: 'D', lower: 'd', word: 'Dog', hindiWord: 'कुत्ता (Kutta)', phonics: 'D for Dog · डॉ-ग', emoji: '🐶', color: '#10B981', bgLight: '#ECFDF5', borderColor: '#6EE7B7' },
  { letter: 'E', upper: 'E', lower: 'e', word: 'Elephant', hindiWord: 'हाथी (Haathi)', phonics: 'E for Elephant · ए-लिफ़ैंट', emoji: '🐘', color: '#8B5CF6', bgLight: '#F5F3FF', borderColor: '#C4B5FD' },
  { letter: 'F', upper: 'F', lower: 'f', word: 'Fish', hindiWord: 'मछली (Machhli)', phonics: 'F for Fish · फि-श', emoji: '🐟', color: '#06B6D4', bgLight: '#ECFEFF', borderColor: '#67E8F9' },
  { letter: 'G', upper: 'G', lower: 'g', word: 'Grapes', hindiWord: 'अंगूर (Angoor)', phonics: 'G for Grapes · ग्रे-प्स', emoji: '🍇', color: '#84CC16', bgLight: '#F7FEE7', borderColor: '#BEF264' },
  { letter: 'H', upper: 'H', lower: 'h', word: 'Horse', hindiWord: 'घोड़ा (Ghoda)', phonics: 'H for Horse · हॉ-र्स', emoji: '🐴', color: '#D97706', bgLight: '#FFFBEB', borderColor: '#FDE68A' },
  { letter: 'I', upper: 'I', lower: 'i', word: 'Ice Cream', hindiWord: 'आइसक्रीम', phonics: 'I for Ice Cream · आ-इस क्रीम', emoji: '🍦', color: '#EC4899', bgLight: '#FDF2F8', borderColor: '#F472B6' },
  { letter: 'J', upper: 'J', lower: 'j', word: 'Juice', hindiWord: 'रस (Ras)', phonics: 'J for Juice · जू-स', emoji: '🧃', color: '#F97316', bgLight: '#FFF7ED', borderColor: '#FDBA74' },
  { letter: 'K', upper: 'K', lower: 'k', word: 'Kite', hindiWord: 'पतंग (Patang)', phonics: 'K for Kite · का-इट', emoji: '🪁', color: '#6366F1', bgLight: '#EEF2FF', borderColor: '#A5B4FC' },
  { letter: 'L', upper: 'L', lower: 'l', word: 'Lion', hindiWord: 'शेर (Sher)', phonics: 'L for Lion · ला-यन', emoji: '🦁', color: '#EAB308', bgLight: '#FEFCE8', borderColor: '#FDE047' },
  { letter: 'M', upper: 'M', lower: 'm', word: 'Mango', hindiWord: 'आम (Aam)', phonics: 'M for Mango · मैं-गो', emoji: '🥭', color: '#F59E0B', bgLight: '#FFFBEB', borderColor: '#FCD34D' },
  { letter: 'N', upper: 'N', lower: 'n', word: 'Nest', hindiWord: 'घोंसला (Ghonsla)', phonics: 'N for Nest · ने-स्ट', emoji: '🪺', color: '#14B8A6', bgLight: '#F0FDFA', borderColor: '#99F6E4' },
  { letter: 'O', upper: 'O', lower: 'o', word: 'Orange', hindiWord: 'संतरा (Santara)', phonics: 'O for Orange · ऑ-रेंज', emoji: '🍊', color: '#FB923C', bgLight: '#FFF7ED', borderColor: '#FDBA74' },
  { letter: 'P', upper: 'P', lower: 'p', word: 'Parrot', hindiWord: 'तोता (Tota)', phonics: 'P for Parrot · पै-रट', emoji: '🦜', color: '#22C55E', bgLight: '#F0FDF4', borderColor: '#86EFAC' },
  { letter: 'Q', upper: 'Q', lower: 'q', word: 'Queen', hindiWord: 'रानी (Rani)', phonics: 'Q for Queen · क्वी-न', emoji: '👑', color: '#A855F7', bgLight: '#FAF5FF', borderColor: '#D8B4FE' },
  { letter: 'R', upper: 'R', lower: 'r', word: 'Rabbit', hindiWord: 'खरगोश (Khargosh)', phonics: 'R for Rabbit · रै-बिट', emoji: '🐰', color: '#F43F5E', bgLight: '#FFF1F2', borderColor: '#FDA4AF' },
  { letter: 'S', upper: 'S', lower: 's', word: 'Sun', hindiWord: 'सूरज (Sooraj)', phonics: 'S for Sun · स-न', emoji: '☀️', color: '#FBBF24', bgLight: '#FFFBEB', borderColor: '#FDE68A' },
  { letter: 'T', upper: 'T', lower: 't', word: 'Tiger', hindiWord: 'बाघ (Baagh)', phonics: 'T for Tiger · टा-इगर', emoji: '🐯', color: '#EA580C', bgLight: '#FFF7ED', borderColor: '#FDBA74' },
  { letter: 'U', upper: 'U', lower: 'u', word: 'Umbrella', hindiWord: 'छाता (Chhata)', phonics: 'U for Umbrella · अम-ब्रेला', emoji: '☂️', color: '#0284C7', bgLight: '#F0F9FF', borderColor: '#7DD3FC' },
  { letter: 'V', upper: 'V', lower: 'v', word: 'Van', hindiWord: 'गाड़ी (Gaadi)', phonics: 'V for Van · वै-न', emoji: '🚐', color: '#7C3AED', bgLight: '#F5F3FF', borderColor: '#C4B5FD' },
  { letter: 'W', upper: 'W', lower: 'w', word: 'Watch', hindiWord: 'घड़ी (Ghadi)', phonics: 'W for Watch · वॉ-च', emoji: '⌚', color: '#0D9488', bgLight: '#F0FDFA', borderColor: '#5EEAD4' },
  { letter: 'X', upper: 'X', lower: 'x', word: 'Xylophone', hindiWord: 'जाइलोफ़ोन', phonics: 'X for Xylophone · ज़ा-इलोफ़ोन', emoji: '🎵', color: '#DB2777', bgLight: '#FDF2F8', borderColor: '#F472B6' },
  { letter: 'Y', upper: 'Y', lower: 'y', word: 'Yak', hindiWord: 'याक (पहाड़ी बैल)', phonics: 'Y for Yak · या-क', emoji: '🐂', color: '#78350F', bgLight: '#FEF3C7', borderColor: '#FCD34D' },
  { letter: 'Z', upper: 'Z', lower: 'z', word: 'Zebra', hindiWord: 'ज़ेबरा (धारीदार घोड़ा)', phonics: 'Z for Zebra · ज़े-ब्रा', emoji: '🦓', color: '#475569', bgLight: '#F8FAFC', borderColor: '#CBD5E1' }
];

// 2. Hindi Varnamala (स्वर & व्यंजन)
export const HINDI_SWAR_DATA: HindiLetterItem[] = [
  { letter: 'अ', roman: 'A', type: 'swar', word: 'अनार', wordRoman: 'Anaar', meaning: 'Pomegranate', emoji: '🔴', color: '#EF4444', bgLight: '#FEF2F2', borderColor: '#FCA5A5' },
  { letter: 'आ', roman: 'Aa', type: 'swar', word: 'आम', wordRoman: 'Aam', meaning: 'Mango', emoji: '🥭', color: '#F59E0B', bgLight: '#FFFBEB', borderColor: '#FCD34D' },
  { letter: 'इ', roman: 'I', type: 'swar', word: 'इमली', wordRoman: 'Imli', meaning: 'Tamarind', emoji: '🫘', color: '#B45309', bgLight: '#FEF3C7', borderColor: '#FDE68A' },
  { letter: 'ई', roman: 'Ee', type: 'swar', word: 'ईख', wordRoman: 'Eekh', meaning: 'Sugarcane', emoji: '🎋', color: '#10B981', bgLight: '#ECFDF5', borderColor: '#6EE7B7' },
  { letter: 'उ', roman: 'U', type: 'swar', word: 'उल्लू', wordRoman: 'Ullu', meaning: 'Owl', emoji: '🦉', color: '#6366F1', bgLight: '#EEF2FF', borderColor: '#A5B4FC' },
  { letter: 'ऊ', roman: 'Oo', type: 'swar', word: 'ऊन', wordRoman: 'Oon', meaning: 'Wool', emoji: '🧶', color: '#EC4899', bgLight: '#FDF2F8', borderColor: '#F472B6' },
  { letter: 'ऋ', roman: 'Ri', type: 'swar', word: 'ऋषि', wordRoman: 'Rishi', meaning: 'Sage', emoji: '🧘', color: '#F97316', bgLight: '#FFF7ED', borderColor: '#FDBA74' },
  { letter: 'ए', roman: 'E', type: 'swar', word: 'एड़ी', wordRoman: 'Edee', meaning: 'Heel', emoji: '🦶', color: '#8B5CF6', bgLight: '#F5F3FF', borderColor: '#C4B5FD' },
  { letter: 'ऐ', roman: 'Ai', type: 'swar', word: 'ऐनक', wordRoman: 'Ainak', meaning: 'Spectacles', emoji: '👓', color: '#06B6D4', bgLight: '#ECFEFF', borderColor: '#67E8F9' },
  { letter: 'ओ', roman: 'O', type: 'swar', word: 'ओखली', wordRoman: 'Okhli', meaning: 'Mortar', emoji: '🥣', color: '#D97706', bgLight: '#FFFBEB', borderColor: '#FDE68A' },
  { letter: 'औ', roman: 'Au', type: 'swar', word: 'औरत', wordRoman: 'Aurat', meaning: 'Woman', emoji: '👩', color: '#E11D48', bgLight: '#FFF1F2', borderColor: '#FDA4AF' },
  { letter: 'अं', roman: 'Am', type: 'swar', word: 'अंगूर', wordRoman: 'Angoor', meaning: 'Grapes', emoji: '🍇', color: '#7C3AED', bgLight: '#F5F3FF', borderColor: '#C4B5FD' },
  { letter: 'अः', roman: 'Ah', type: 'swar', word: 'खाली', wordRoman: 'Khaali', meaning: 'Blank / Sound Ah', emoji: '✨', color: '#64748B', bgLight: '#F8FAFC', borderColor: '#CBD5E1' },
];

export const HINDI_VYANJAN_DATA: HindiLetterItem[] = [
  // क वर्ग
  { letter: 'क', roman: 'Ka', type: 'vyanjan', word: 'कबूतर', wordRoman: 'Kabootar', meaning: 'Pigeon', emoji: '🕊️', color: '#3B82F6', bgLight: '#EFF6FF', borderColor: '#93C5FD' },
  { letter: 'ख', roman: 'Kha', type: 'vyanjan', word: 'खरगोश', wordRoman: 'Khargosh', meaning: 'Rabbit', emoji: '🐰', color: '#F43F5E', bgLight: '#FFF1F2', borderColor: '#FDA4AF' },
  { letter: 'ग', roman: 'Ga', type: 'vyanjan', word: 'गमला', wordRoman: 'Gamla', meaning: 'Flower pot', emoji: '🪴', color: '#10B981', bgLight: '#ECFDF5', borderColor: '#6EE7B7' },
  { letter: 'घ', roman: 'Gha', type: 'vyanjan', word: 'घड़ी', wordRoman: 'Ghadi', meaning: 'Clock / Watch', emoji: '⏰', color: '#F59E0B', bgLight: '#FFFBEB', borderColor: '#FCD34D' },
  { letter: 'ङ', roman: 'Nga', type: 'vyanjan', word: 'खाली', wordRoman: 'Khaali', meaning: 'Blank', emoji: '🌸', color: '#8B5CF6', bgLight: '#F5F3FF', borderColor: '#C4B5FD' },

  // च वर्ग
  { letter: 'च', roman: 'Cha', type: 'vyanjan', word: 'चम्मच', wordRoman: 'Chammach', meaning: 'Spoon', emoji: '🥄', color: '#EC4899', bgLight: '#FDF2F8', borderColor: '#F472B6' },
  { letter: 'छ', roman: 'Chha', type: 'vyanjan', word: 'छतरी', wordRoman: 'Chhatri', meaning: 'Umbrella', emoji: '☂️', color: '#06B6D4', bgLight: '#ECFEFF', borderColor: '#67E8F9' },
  { letter: 'ज', roman: 'Ja', type: 'vyanjan', word: 'जहाज', wordRoman: 'Jahaaz', meaning: 'Ship', emoji: '🚢', color: '#2563EB', bgLight: '#EFF6FF', borderColor: '#93C5FD' },
  { letter: 'झ', roman: 'Jha', type: 'vyanjan', word: 'झंडा', wordRoman: 'Jhanda', meaning: 'Flag', emoji: '🚩', color: '#EA580C', bgLight: '#FFF7ED', borderColor: '#FDBA74' },
  { letter: 'ञ', roman: 'Nya', type: 'vyanjan', word: 'खाली', wordRoman: 'Khaali', meaning: 'Blank', emoji: '🌼', color: '#14B8A6', bgLight: '#F0FDFA', borderColor: '#99F6E4' },

  // ट वर्ग
  { letter: 'ट', roman: 'Ta', type: 'vyanjan', word: 'टमाटर', wordRoman: 'Tamaatar', meaning: 'Tomato', emoji: '🍅', color: '#EF4444', bgLight: '#FEF2F2', borderColor: '#FCA5A5' },
  { letter: 'ठ', roman: 'Tha', type: 'vyanjan', word: 'ठठेरा', wordRoman: 'Thathera', meaning: 'Utensil Maker', emoji: '🪣', color: '#D97706', bgLight: '#FFFBEB', borderColor: '#FDE68A' },
  { letter: 'ड', roman: 'Da', type: 'vyanjan', word: 'डमरू', wordRoman: 'Damru', meaning: 'Pellet drum', emoji: '🥁', color: '#84CC16', bgLight: '#F7FEE7', borderColor: '#BEF264' },
  { letter: 'ढ', roman: 'Dha', type: 'vyanjan', word: 'ढक्कन', wordRoman: 'Dhakkan', meaning: 'Lid', emoji: '🍲', color: '#6366F1', bgLight: '#EEF2FF', borderColor: '#A5B4FC' },
  { letter: 'ण', roman: 'Na', type: 'vyanjan', word: 'खाली', wordRoman: 'Khaali', meaning: 'Blank', emoji: '⭐', color: '#A855F7', bgLight: '#FAF5FF', borderColor: '#D8B4FE' },

  // त वर्ग
  { letter: 'त', roman: 'Ta', type: 'vyanjan', word: 'तरबूज', wordRoman: 'Tarbooz', meaning: 'Watermelon', emoji: '🍉', color: '#10B981', bgLight: '#ECFDF5', borderColor: '#6EE7B7' },
  { letter: 'थ', roman: 'Tha', type: 'vyanjan', word: 'थर्मस', wordRoman: 'Thermos', meaning: 'Thermos Flask', emoji: '🍶', color: '#0284C7', bgLight: '#F0F9FF', borderColor: '#7DD3FC' },
  { letter: 'द', roman: 'Da', type: 'vyanjan', word: 'दवात', wordRoman: 'Dawaat', meaning: 'Inkpot', emoji: '✒️', color: '#7C3AED', bgLight: '#F5F3FF', borderColor: '#C4B5FD' },
  { letter: 'ध', roman: 'Dha', type: 'vyanjan', word: 'धनुष', wordRoman: 'Dhanush', meaning: 'Bow', emoji: '🏹', color: '#F97316', bgLight: '#FFF7ED', borderColor: '#FDBA74' },
  { letter: 'न', roman: 'Na', type: 'vyanjan', word: 'नल', wordRoman: 'Nal', meaning: 'Water Tap', emoji: '🚰', color: '#06B6D4', bgLight: '#ECFEFF', borderColor: '#67E8F9' },

  // प वर्ग
  { letter: 'प', roman: 'Pa', type: 'vyanjan', word: 'पतंग', wordRoman: 'Patang', meaning: 'Kite', emoji: '🪁', color: '#E11D48', bgLight: '#FFF1F2', borderColor: '#FDA4AF' },
  { letter: 'फ', roman: 'Pha', type: 'vyanjan', word: 'फल', wordRoman: 'Phal', meaning: 'Fruits', emoji: '🍎', color: '#16A34A', bgLight: '#F0FDF4', borderColor: '#86EFAC' },
  { letter: 'ब', roman: 'Ba', type: 'vyanjan', word: 'बत्तख', wordRoman: 'Batthak', meaning: 'Duck', emoji: '🦆', color: '#FBBF24', bgLight: '#FFFBEB', borderColor: '#FDE68A' },
  { letter: 'भ', roman: 'Bha', type: 'vyanjan', word: 'भालू', wordRoman: 'Bhaalu', meaning: 'Bear', emoji: '🐻', color: '#92400E', bgLight: '#FEF3C7', borderColor: '#FCD34D' },
  { letter: 'म', roman: 'Ma', type: 'vyanjan', word: 'मछली', wordRoman: 'Machhli', meaning: 'Fish', emoji: '🐟', color: '#0284C7', bgLight: '#F0F9FF', borderColor: '#7DD3FC' },

  // य वर्ग
  { letter: 'य', roman: 'Ya', type: 'vyanjan', word: 'यज्ञ', wordRoman: 'Yagya', meaning: 'Sacred fire', emoji: '🔥', color: '#EA580C', bgLight: '#FFF7ED', borderColor: '#FDBA74' },
  { letter: 'र', roman: 'Ra', type: 'vyanjan', word: 'रथ', wordRoman: 'Rath', meaning: 'Chariot', emoji: '🎠', color: '#8B5CF6', bgLight: '#F5F3FF', borderColor: '#C4B5FD' },
  { letter: 'ल', roman: 'La', type: 'vyanjan', word: 'लट्टू', wordRoman: 'Lattoo', meaning: 'Spinning Top', emoji: '🪀', color: '#EC4899', bgLight: '#FDF2F8', borderColor: '#F472B6' },
  { letter: 'व', roman: 'Va', type: 'vyanjan', word: 'वक', wordRoman: 'Vak', meaning: 'Heron / Crane', emoji: '🦩', color: '#14B8A6', bgLight: '#F0FDFA', borderColor: '#99F6E4' },

  // श वर्ग & संयुक्त व्यंजन
  { letter: 'श', roman: 'Sha', type: 'vyanjan', word: 'शलजम', wordRoman: 'Shaljam', meaning: 'Turnip', emoji: '🥗', color: '#6366F1', bgLight: '#EEF2FF', borderColor: '#A5B4FC' },
  { letter: 'ष', roman: 'Shha', type: 'vyanjan', word: 'षट्कोण', wordRoman: 'Shatkon', meaning: 'Hexagon', emoji: '⬡', color: '#F59E0B', bgLight: '#FFFBEB', borderColor: '#FCD34D' },
  { letter: 'स', roman: 'Sa', type: 'vyanjan', word: 'सपेरा', wordRoman: 'Sapera', meaning: 'Snake charmer', emoji: '🐍', color: '#10B981', bgLight: '#ECFDF5', borderColor: '#6EE7B7' },
  { letter: 'ह', roman: 'Ha', type: 'vyanjan', word: 'हाथी', wordRoman: 'Haathi', meaning: 'Elephant', emoji: '🐘', color: '#64748B', bgLight: '#F8FAFC', borderColor: '#CBD5E1' },
  { letter: 'क्ष', roman: 'Ksh', type: 'vyanjan', word: 'क्षत्रिय', wordRoman: 'Kshatriya', meaning: 'Warrior', emoji: '⚔️', color: '#DC2626', bgLight: '#FEF2F2', borderColor: '#FCA5A5' },
  { letter: 'त्र', roman: 'Tra', type: 'vyanjan', word: 'त्रिशूल', wordRoman: 'Trishool', meaning: 'Trident', emoji: '🔱', color: '#D97706', bgLight: '#FFFBEB', borderColor: '#FDE68A' },
  { letter: 'ज्ञ', roman: 'Gya', type: 'vyanjan', word: 'ज्ञानी', wordRoman: 'Gyani', meaning: 'Wise scholar', emoji: '📖', color: '#2563EB', bgLight: '#EFF6FF', borderColor: '#93C5FD' },
];

export const ALL_HINDI_DATA = [...HINDI_SWAR_DATA, ...HINDI_VYANJAN_DATA];

// 3. 1 to 100 Numbers
const HINDI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toHindiDigits(n: number): string {
  return n.toString().split('').map(d => HINDI_DIGITS[parseInt(d, 10)] || d).join('');
}

export const HINDI_NUMBER_NAMES: Record<number, string> = {
  1: 'एक (Ek)', 2: 'दो (Do)', 3: 'तीन (Teen)', 4: 'चार (Chaar)', 5: 'पाँच (Paanch)',
  6: 'छह (Chhah)', 7: 'सात (Saat)', 8: 'आठ (Aath)', 9: 'नौ (Nau)', 10: 'दस (Das)',
  11: 'ग्यारह (Gyarah)', 12: 'बारह (Barah)', 13: 'तेरह (Terah)', 14: 'चौदह (Chaudah)', 15: 'पंद्रह (Pandrah)',
  16: 'सोलह (Solah)', 17: 'सत्रह (Satrah)', 18: 'अठारह (Atharah)', 19: 'उन्नीस (Unnees)', 20: 'बीस (Bees)',
  25: 'पच्चीस (Pachchees)', 30: 'तीस (Tees)', 40: 'चालीस (Chaalees)', 50: 'पचास (Pachaas)',
  60: 'साठ (Saath)', 70: 'सत्तर (Sattar)', 80: 'अस्सी (Assi)', 90: 'नब्बे (Nabbi)', 100: 'एक सौ (Sau)'
};

const NUMBER_WORDS_1_TO_20 = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'
];

const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

export function getEnglishNumberWord(n: number): string {
  if (n <= 20) return NUMBER_WORDS_1_TO_20[n];
  if (n < 100) {
    const ten = Math.floor(n / 10);
    const rem = n % 10;
    return rem === 0 ? TENS[ten] : `${TENS[ten]}-${NUMBER_WORDS_1_TO_20[rem]}`;
  }
  if (n === 100) return 'One Hundred';
  return n.toString();
}

export function getHindiNumberWord(n: number): string {
  if (HINDI_NUMBER_NAMES[n]) return HINDI_NUMBER_NAMES[n];
  return `${toHindiDigits(n)} (${n})`;
}

// Toddler 1-10 counting objects
export const TODDLER_COUNTING_OBJECTS = [
  { num: 1, emoji: '☀️', label: '1 Bright Sun' },
  { num: 2, emoji: '👟', label: '2 Little Shoes' },
  { num: 3, emoji: '🦋', label: '3 Butterflies' },
  { num: 4, emoji: '🍎', label: '4 Red Apples' },
  { num: 5, emoji: '⭐', label: '5 Golden Stars' },
  { num: 6, emoji: '🌸', label: '6 Pink Flowers' },
  { num: 7, emoji: '🌈', label: '7 Rainbow Colors' },
  { num: 8, emoji: '🍭', label: '8 Sweet Candies' },
  { num: 9, emoji: '🎈', label: '9 Flying Balloons' },
  { num: 10, emoji: '✏️', label: '10 Rainbow Pencils' },
];

export const NUMBERS_1_TO_100: NumberItem[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const toddlerObj = TODDLER_COUNTING_OBJECTS.find(o => o.num === num);
  return {
    num,
    hindiNum: toHindiDigits(num),
    englishWord: getEnglishNumberWord(num),
    hindiWord: getHindiNumberWord(num),
    itemsEmoji: toddlerObj ? toddlerObj.emoji : undefined,
    itemsLabel: toddlerObj ? toddlerObj.label : undefined
  };
});

// 4. Fruits
export const FRUITS_DATA: FruitItem[] = [
  { id: 'mango', name: 'Mango', hindiName: 'आम', hindiRoman: 'Aam', emoji: '🥭', color: '#F59E0B', bgLight: '#FFFBEB', taste: 'Sweet & juicy!', funFact: 'The King of Fruits / फलों का राजा!' },
  { id: 'apple', name: 'Apple', hindiName: 'सेब', hindiRoman: 'Seb', emoji: '🍎', color: '#EF4444', bgLight: '#FEF2F2', taste: 'Crisp & sweet', funFact: 'An apple a day keeps the doctor away!' },
  { id: 'banana', name: 'Banana', hindiName: 'केला', hindiRoman: 'Kela', emoji: '🍌', color: '#EAB308', bgLight: '#FEFCE8', taste: 'Soft & energy-packed', funFact: 'Monkeys love bananas! Great for energy.' },
  { id: 'orange', name: 'Orange', hindiName: 'संतरा', hindiRoman: 'Santara', emoji: '🍊', color: '#F97316', bgLight: '#FFF7ED', taste: 'Tangy and sweet', funFact: 'Packed with Vitamin C to make you strong!' },
  { id: 'grapes', name: 'Grapes', hindiName: 'अंगूर', hindiRoman: 'Angoor', emoji: '🍇', color: '#8B5CF6', bgLight: '#F5F3FF', taste: 'Juicy bite-sized bursts', funFact: 'Can be green, red, or purple!' },
  { id: 'strawberry', name: 'Strawberry', hindiName: 'स्ट्रॉबेरी', hindiRoman: 'Strawberry', emoji: '🍓', color: '#F43F5E', bgLight: '#FFF1F2', taste: 'Berry sweet & fragrant', funFact: 'The only fruit with seeds on the outside!' },
  { id: 'watermelon', name: 'Watermelon', hindiName: 'तरबूज', hindiRoman: 'Tarbooz', emoji: '🍉', color: '#10B981', bgLight: '#ECFDF5', taste: 'Cool & super refreshing', funFact: '92% water, keeps you hydrated on sunny days!' },
  { id: 'papaya', name: 'Papaya', hindiName: 'पपीता', hindiRoman: 'Papeeta', emoji: '🍈', color: '#FB923C', bgLight: '#FFF7ED', taste: 'Gentle & honey-sweet', funFact: 'Full of natural enzymes for happy tummy!' },
  { id: 'pineapple', name: 'Pineapple', hindiName: 'अनानास', hindiRoman: 'Ananaas', emoji: '🍍', color: '#CA8A04', bgLight: '#FEFCE8', taste: 'Zesty tropical goodness', funFact: 'Wears a little green crown on top!' },
  { id: 'guava', name: 'Guava', hindiName: 'अमरूद', hindiRoman: 'Amrood', emoji: '🍏', color: '#84CC16', bgLight: '#F7FEE7', taste: 'Crunchy sweet aroma', funFact: 'Has 4 times more vitamin C than an orange!' },
  { id: 'pomegranate', name: 'Pomegranate', hindiName: 'अनार', hindiRoman: 'Anaar', emoji: '🔴', color: '#DC2626', bgLight: '#FEF2F2', taste: 'Sweet ruby sparkles', funFact: 'Full of hundreds of shiny healthy seeds!' },
  { id: 'cherry', name: 'Cherry', hindiName: 'चेरी', hindiRoman: 'Cheri', emoji: '🍒', color: '#BE123C', bgLight: '#FFF1F2', taste: 'Tiny juicy drops', funFact: 'Cherries grow in cute cheerful pairs!' },
  { id: 'kiwi', name: 'Kiwi', hindiName: 'कीवी', hindiRoman: 'Kiwi', emoji: '🥝', color: '#65A30D', bgLight: '#F7FEE7', taste: 'Tangy emerald treasure', funFact: 'Fuzzy on the outside, bright green inside!' },
  { id: 'coconut', name: 'Coconut', hindiName: 'नारियल', hindiRoman: 'Naariyal', emoji: '🥥', color: '#78350F', bgLight: '#FEF3C7', taste: 'Sweet fresh water', funFact: 'Grows high up on tall palm trees!' },
  { id: 'lemon', name: 'Lemon', hindiName: 'नींबू', hindiRoman: 'Neembu', emoji: '🍋', color: '#EAB308', bgLight: '#FEFCE8', taste: 'Zesty sour lemon twist', funFact: 'Makes delicious refreshing lemonade!' },
  { id: 'peach', name: 'Peach', hindiName: 'आड़ू', hindiRoman: 'Aadoo', emoji: '🍑', color: '#FB7185', bgLight: '#FFF1F2', taste: 'Soft, velvety & fragrant', funFact: 'Has smooth fuzzy skin like a plush toy!' }
];

// 5. English Learning Basics: Colors, Animals, Shapes & Rhymes
export const COLORS_DATA: ColorItem[] = [
  { name: 'Red', hindiName: 'लाल (Laal)', hex: '#EF4444', example: 'Red Apple 🍎', emoji: '❤️' },
  { name: 'Blue', hindiName: 'नीला (Neela)', hex: '#3B82F6', example: 'Blue Sky 🌊', emoji: '💙' },
  { name: 'Green', hindiName: 'हरा (Hara)', hex: '#10B981', example: 'Green Grass 🌿', emoji: '💚' },
  { name: 'Yellow', hindiName: 'पीला (Peela)', hex: '#F59E0B', example: 'Yellow Sun ☀️', emoji: '💛' },
  { name: 'Orange', hindiName: 'नारंगी (Naarangi)', hex: '#F97316', example: 'Juicy Orange 🍊', emoji: '🧡' },
  { name: 'Purple', hindiName: 'बैंगनी (Baingani)', hex: '#8B5CF6', example: 'Purple Grapes 🍇', emoji: '💜' },
  { name: 'Pink', hindiName: 'गुलाबी (Gulaabi)', hex: '#EC4899', example: 'Pink Flower 🌸', emoji: '💗' },
  { name: 'Brown', hindiName: 'भूरा (Bhoora)', hex: '#78350F', example: 'Brown Teddy Bear 🧸', emoji: '🤎' },
  { name: 'White', hindiName: 'सफ़ेद (Safed)', hex: '#F8FAFC', example: 'White Cloud ☁️', emoji: '🤍' },
  { name: 'Black', hindiName: 'काला (Kaala)', hex: '#1E293B', example: 'Night Sky 🌌', emoji: '🖤' }
];

export const ANIMALS_DATA: AnimalItem[] = [
  { name: 'Lion', hindiName: 'शेर (Sher)', sound: 'Roaaar!', soundText: 'दहाड़ता है!', emoji: '🦁', fact: 'The brave King of the Jungle!' },
  { name: 'Dog', hindiName: 'कुत्ता (Kutta)', sound: 'Woof! Woof!', soundText: 'भौंकता है!', emoji: '🐶', fact: "Human's most loyal best friend!" },
  { name: 'Cat', hindiName: 'बिल्ली (Billi)', sound: 'Meow! Purr!', soundText: 'म्याऊँ!', emoji: '🐱', fact: 'Loves drinking milk and soft cuddles.' },
  { name: 'Elephant', hindiName: 'हाथी (Haathi)', sound: 'Paaawooo!', soundText: 'चिंघाड़ता है!', emoji: '🐘', fact: 'Has a long trunk and big gentle ears!' },
  { name: 'Cow', hindiName: 'गाय (Gaay)', sound: 'Mooo!', soundText: 'रंभाती है!', emoji: '🐮', fact: 'Gives us fresh healthy milk every day.' },
  { name: 'Monkey', hindiName: 'बंदर (Bandar)', sound: 'Ooh ooh aah aah!', soundText: 'खी-खी करता है!', emoji: '🐵', fact: 'Loves swinging on trees and eating bananas.' },
  { name: 'Duck', hindiName: 'बत्तख (Batthak)', sound: 'Quack! Quack!', soundText: 'क्वाक-क्वाक!', emoji: '🦆', fact: 'Splashes and swims happily in the pond.' },
  { name: 'Sheep', hindiName: 'भेड़ (Bhed)', sound: 'Baa! Baa!', soundText: 'में-में!', emoji: '🐑', fact: 'Has soft fluffy white wool for warm sweaters.' },
  { name: 'Horse', hindiName: 'घोड़ा (Ghoda)', sound: 'Neigh! Clip-clop!', soundText: 'हिनहिनाता है!', emoji: '🐴', fact: 'Runs super fast with powerful gallops.' },
  { name: 'Frog', hindiName: 'मेंढक (Mendhak)', sound: 'Ribbit! Croak!', soundText: 'टर्-टर्!', emoji: '🐸', fact: 'Jumps high and catches flies with long tongue.' }
];

export const SHAPES_DATA: ShapeItem[] = [
  { name: 'Circle', hindiName: 'वृत्त / गोल (Gol)', sides: 0, example: 'Round like a coin 🪙', svgPath: 'circle', color: '#EF4444' },
  { name: 'Square', hindiName: 'वर्ग (Varg)', sides: 4, example: 'Like a building block 🧱', svgPath: 'square', color: '#3B82F6' },
  { name: 'Triangle', hindiName: 'त्रिकोण (Trikon)', sides: 3, example: 'Like a slice of pizza 🍕', svgPath: 'triangle', color: '#10B981' },
  { name: 'Star', hindiName: 'तारा (Taara)', sides: 5, example: 'Twinkling in the night sky ⭐', svgPath: 'star', color: '#F59E0B' },
  { name: 'Heart', hindiName: 'दिल (Dil)', sides: 0, example: 'Shows love and hug ❤️', svgPath: 'heart', color: '#EC4899' },
  { name: 'Rectangle', hindiName: 'आयत (Aayat)', sides: 4, example: 'Like a storybook 📖', svgPath: 'rectangle', color: '#8B5CF6' }
];

export const NURSERY_RHYMES: RhymeItem[] = [
  {
    title: 'Twinkle Twinkle Little Star',
    hindiTitle: 'ट्विंकल ट्विंकल लिटिल स्टार',
    lines: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!',
      'Up above the world so high,',
      'Like a diamond in the sky!'
    ],
    emoji: '⭐',
    category: 'english'
  },
  {
    title: 'ABC Alphabet Song',
    hindiTitle: 'एबीसी वर्णमाला गीत',
    lines: [
      'A B C D E F G,',
      'H I J K L M N O P,',
      'Q R S, T U V,',
      'W X, Y and Z!',
      'Now I know my ABCs,',
      'Next time won’t you sing with me!'
    ],
    emoji: '🔤',
    category: 'english'
  },
  {
    title: 'Lakdi Ki Kathi (लकड़ी की काठी)',
    hindiTitle: 'लकड़ी की काठी, काठी पे घोड़ा',
    lines: [
      'लकड़ी की काठी, काठी पे घोड़ा,',
      'घोड़े की दुम पे जो मारा हथौड़ा,',
      'दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा!',
      'घोड़ा पहुँचा चौक में, चौक में था नाई!'
    ],
    emoji: '🐴',
    category: 'hindi'
  },
  {
    title: 'Machhli Jal Ki Rani Hai (मछली जल की रानी है)',
    hindiTitle: 'मछली जल की रानी है',
    lines: [
      'मछली जल की रानी है,',
      'जीवन उसका पानी है,',
      'हाथ लगाओ तो डर जाएगी,',
      'बाहर निकालो तो मर जाएगी!'
    ],
    emoji: '🐟',
    category: 'hindi'
  },
  {
    title: 'Baa Baa Black Sheep',
    hindiTitle: 'बा बा ब्लैक शीप',
    lines: [
      'Baa, baa, black sheep, have you any wool?',
      'Yes, sir, yes, sir, three bags full!',
      'One for the master, and one for the dame,',
      'And one for the little boy who lives down the lane!'
    ],
    emoji: '🐑',
    category: 'english'
  }
];
