import React, { useState } from 'react';
import { Background } from './components/Background';
import { HeartClicker } from './components/HeartClicker';
import { LoveNoteModal } from './components/LoveNoteModal';
import { InteractiveTitle } from './components/InteractiveTitle';
import { ThemeConfig } from './types';

// Define available themes
const themes: ThemeConfig[] = [
  {
    id: 'rose',
    label: 'Rose',
    bgBase: 'bg-rose-50',
    bgGradient: 'bg-gradient-to-b from-transparent via-rose-50/50 to-rose-100/80',
    marqueeText: 'text-rose-200',
    primaryText: 'text-rose-900',
    secondaryText: 'text-rose-800',
    accentText: 'text-rose-500',
    buttonBorder: 'border-rose-500',
    buttonBgSlide: 'bg-rose-600',
    buttonTextInitial: 'text-rose-500',
    heartColors: ['text-red-500', 'text-pink-500', 'text-rose-400', 'text-purple-400'],
    selection: 'selection:bg-rose-200',
    swatchColor: 'bg-rose-500',
    modalAccent: 'text-rose-600'
  },
  {
    id: 'midnight',
    label: 'Midnight',
    bgBase: 'bg-slate-950',
    bgGradient: 'bg-gradient-to-b from-transparent via-slate-900/50 to-indigo-950/80',
    marqueeText: 'text-slate-800',
    primaryText: 'text-indigo-100',
    secondaryText: 'text-indigo-200',
    accentText: 'text-indigo-400',
    buttonBorder: 'border-indigo-400',
    buttonBgSlide: 'bg-indigo-500',
    buttonTextInitial: 'text-indigo-400',
    heartColors: ['text-indigo-400', 'text-violet-400', 'text-purple-500', 'text-fuchsia-400'],
    selection: 'selection:bg-indigo-500 selection:text-white',
    swatchColor: 'bg-slate-800',
    modalAccent: 'text-indigo-600'
  },
  {
    id: 'sunset',
    label: 'Sunset',
    bgBase: 'bg-orange-50',
    bgGradient: 'bg-gradient-to-b from-transparent via-orange-50/50 to-amber-100/80',
    marqueeText: 'text-orange-200',
    primaryText: 'text-orange-900',
    secondaryText: 'text-orange-800',
    accentText: 'text-orange-500',
    buttonBorder: 'border-orange-500',
    buttonBgSlide: 'bg-orange-500',
    buttonTextInitial: 'text-orange-500',
    heartColors: ['text-orange-500', 'text-amber-500', 'text-red-400', 'text-yellow-500'],
    selection: 'selection:bg-orange-200',
    swatchColor: 'bg-orange-500',
    modalAccent: 'text-orange-600'
  },
  {
    id: 'ocean',
    label: 'Ocean',
    bgBase: 'bg-cyan-50',
    bgGradient: 'bg-gradient-to-b from-transparent via-cyan-50/50 to-blue-100/80',
    marqueeText: 'text-cyan-200',
    primaryText: 'text-cyan-900',
    secondaryText: 'text-cyan-800',
    accentText: 'text-cyan-500',
    buttonBorder: 'border-cyan-500',
    buttonBgSlide: 'bg-cyan-600',
    buttonTextInitial: 'text-cyan-500',
    heartColors: ['text-cyan-500', 'text-blue-500', 'text-sky-400', 'text-teal-400'],
    selection: 'selection:bg-cyan-200',
    swatchColor: 'bg-cyan-500',
    modalAccent: 'text-cyan-600'
  }
];

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themes[0]);

  return (
    <div className={`relative w-full h-screen overflow-hidden ${currentTheme.bgBase} ${currentTheme.selection} transition-colors duration-700`}>
      <Background theme={currentTheme} />
      <HeartClicker colors={currentTheme.heartColors} />

      <main className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="bg-white/30 backdrop-blur-md p-8 md:p-12 rounded-full md:rounded-3xl shadow-xl border border-white/50 animate-fade-in-up max-w-2xl mx-auto transition-all duration-700">
          <div className="mb-4">
            <span className="text-6xl animate-pulse">❤️</span>
          </div>
          
          <InteractiveTitle theme={currentTheme} />
          
          <p className={`text-lg md:text-xl ${currentTheme.secondaryText} mb-8 font-light tracking-wide max-w-md mx-auto leading-relaxed transition-colors duration-700`}>
            Jana, you are the poetry my heart was always waiting to write.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 ${currentTheme.buttonBorder} rounded-full shadow-lg hover:shadow-lg group`}
          >
            <span className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full ${currentTheme.buttonBgSlide} group-hover:translate-x-0 ease`}>
              {/* Heart Icon appearing on hover */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </span>
            <span className={`absolute flex items-center justify-center w-full h-full ${currentTheme.buttonTextInitial} transition-all duration-300 transform group-hover:translate-x-full ease bg-white text-xl font-bold tracking-wider`}>
              OPEN
            </span>
            <span className="relative invisible text-xl font-bold tracking-wider">OPEN</span>
          </button>
        </div>
      </main>

      {/* Theme Switcher */}
      <div className="absolute top-4 left-4 z-40 flex gap-2 p-2 bg-white/20 backdrop-blur-sm rounded-full shadow-sm border border-white/20">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setCurrentTheme(theme)}
            className={`w-8 h-8 rounded-full ${theme.swatchColor} border-2 transition-all duration-300 hover:scale-110 ${currentTheme.id === theme.id ? 'border-white scale-110 shadow-md ring-2 ring-white/50' : 'border-transparent opacity-80 hover:opacity-100'}`}
            title={theme.label}
            aria-label={`Select ${theme.label} theme`}
          />
        ))}
      </div>

      <LoveNoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        theme={currentTheme}
      />

      {/* Footer Info */}
      <footer className="absolute bottom-4 w-full text-center z-20">
        <p className={`${currentTheme.secondaryText} opacity-40 text-xs uppercase tracking-widest font-semibold transition-colors duration-700`}>
          Infinite Love Wall
        </p>
      </footer>
    </div>
  );
};

export default App;