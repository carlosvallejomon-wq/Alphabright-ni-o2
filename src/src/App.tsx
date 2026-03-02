import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Gamepad2, Settings as SettingsIcon, Star } from 'lucide-react';
import Dashboard from './components/Dashboard';
import KidsZone from './components/KidsZone';
import Settings from './components/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'kids' | 'settings'>('dashboard');
  const [progress, setProgress] = useState({
    currentPhase: 1,
    currentWeek: 1,
    completedDays: 0,
    stickers: [],
    avatar: '🦁'
  });

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{progress.avatar}</span>
            <div>
              <h1 className="font-bold text-stone-900">AlphaBright</h1>
              <p className="text-xs text-stone-500 font-medium tracking-wider uppercase">Fase {progress.currentPhase}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-700 text-sm">{progress.stickers.length}</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard progress={progress} />}
          {activeTab === 'kids' && <KidsZone progress={progress} setProgress={setProgress} />}
          {activeTab === 'settings' && <Settings progress={progress} setProgress={setProgress} />}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-6 py-3 z-20">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-stone-400'}`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Inicio</span>
          </button>
          <button onClick={() => setActiveTab('kids')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'kids' ? 'text-indigo-600' : 'text-stone-400'}`}>
            <Gamepad2 className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Jugar</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-indigo-600' : 'text-stone-400'}`}>
            <SettingsIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Ajustes</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
