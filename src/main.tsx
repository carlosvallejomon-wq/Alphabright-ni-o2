import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Sparkles, RefreshCw } from 'lucide-react';
import { UserProgress } from '../types';

const WORDS = [
  { word: 'GATO', syllables: ['GA', 'TO'], image: '🐱' },
  { word: 'CASA', syllables: ['CA', 'SA'], image: '🏠' },
  { word: 'PATO', syllables: ['PA', 'TO'], image: '🦆' },
  { word: 'LUNA', syllables: ['LU', 'NA'], image: '🌙' },
  { word: 'SOL', syllables: ['SOL'], image: '☀️' },
];

export default function SyllableGame({ onBack, setProgress }: { onBack: () => void, setProgress: React.Dispatch<React.SetStateAction<UserProgress>> }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [won, setWon] = useState(false);

  const current = WORDS[currentIdx];

  const handleSyllable = (s: string) => {
    const newSelected = [...selected, s];
    setSelected(newSelected);
    
    if (newSelected.join('') === current.word) {
      setWon(true);
      setProgress(prev => ({
        ...prev,
        stickers: [...prev.stickers, '⭐']
      }));
    } else if (newSelected.length >= current.syllables.length) {
      setTimeout(() => setSelected([]), 500);
    }
  };

  const nextWord = () => {
    setCurrentIdx((currentIdx + 1) % WORDS.length);
    setSelected([]);
    setWon(false);
  };

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-500 font-bold">
        <ChevronLeft className="w-5 h-5" />
        Volver
      </button>

      <div className="text-center space-y-6">
        <div className="text-8xl mb-4">{current.image}</div>
        
        <div className="flex justify-center gap-4">
          {current.syllables.map((_, i) => (
            <div key={i} className="w-16 h-16 border-4 border-dashed border-stone-200 rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-600 bg-white">
              {selected[i] || ''}
            </div>
          ))}
        </div>

        {won ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="space-y-4">
            <h3 className="text-2xl font-black text-emerald-600 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" /> ¡MUY BIEN! <Sparkles className="w-6 h-6" />
            </h3>
            <button onClick={nextWord} className="kids-button bg-emerald-600 text-white px-12">
              Siguiente Palabra
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto pt-8">
            {current.syllables.sort().map((s, i) => (
              <button 
                key={i}
                onClick={() => handleSyllable(s)}
                className="kids-button bg-white border-2 border-stone-100 text-2xl py-6 hover:border-indigo-500 hover:text-indigo-600"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
