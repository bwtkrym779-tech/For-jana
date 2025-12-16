import React, { useState, useEffect } from 'react';
import { LoveLetterState, GeneratorStatus, ThemeConfig } from '../types';
import { generateLoveNote } from '../services/geminiService';
import { Heart3D } from './Heart3D';

interface LoveNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
}

export const LoveNoteModal: React.FC<LoveNoteModalProps> = ({ isOpen, onClose, theme }) => {
  const [state, setState] = useState<LoveLetterState>({
    status: GeneratorStatus.IDLE,
    content: '',
  });
  const [showAnimation, setShowAnimation] = useState(false);

  const handleGenerate = async () => {
    // Start animation and loading state
    setShowAnimation(true);
    setState({ status: GeneratorStatus.LOADING, content: '' });

    // Generate content
    const notePromise = generateLoveNote();
    
    // Wait for animation to likely finish (approx 2-3 seconds)
    const delayPromise = new Promise(resolve => setTimeout(resolve, 3000));

    const [note] = await Promise.all([notePromise, delayPromise]);

    setState({ status: GeneratorStatus.SUCCESS, content: note });
    // Switch view after the delay
    setShowAnimation(false);
  };

  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    } else {
      // Reset state when closed
      setShowAnimation(false);
      setState({ status: GeneratorStatus.IDLE, content: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in transition-all">
      <div className={`bg-white/95 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all border border-opacity-50 relative overflow-hidden min-h-[420px] flex flex-col items-center justify-center ${theme.buttonBorder.replace('border-', 'border-')}`}>
        
        <button 
          onClick={onClose} 
          className={`absolute top-4 right-4 ${theme.marqueeText} hover:${theme.accentText} transition-colors text-2xl z-20`}
        >
          &times;
        </button>

        {showAnimation ? (
          <div className="flex flex-col items-center justify-center animate-fade-in w-full">
            <Heart3D colorClass={theme.accentText} />
            <style>{`
              @keyframes stardust {
                0% { opacity: 0.5; letter-spacing: 0.05em; filter: brightness(100%); }
                50% { opacity: 1; letter-spacing: 0.15em; filter: brightness(120%); }
                100% { opacity: 0.5; letter-spacing: 0.05em; filter: brightness(100%); }
              }
              .animate-stardust {
                animation: stardust 3s ease-in-out infinite;
              }
            `}</style>
            <p className={`mt-6 ${theme.modalAccent} font-script text-xl animate-stardust`}>gathering stardust for you...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full animate-fade-in-up">
            <div className="mb-6">
               <h2 className={`text-xl font-serif-display ${theme.primaryText} font-bold`}>A Note for You</h2>
            </div>

            <div className="min-h-[100px] flex items-center justify-center text-center px-4 mb-6 relative">
               {/* Decorative quote marks */}
               <span className={`absolute -top-4 -left-2 text-6xl ${theme.marqueeText} font-serif-display opacity-50`}>“</span>
               <p className={`text-2xl md:text-3xl font-script ${theme.modalAccent} leading-relaxed z-10`}>
                {state.content}
               </p>
               <span className={`absolute -bottom-8 -right-2 text-6xl ${theme.marqueeText} font-serif-display opacity-50`}>”</span>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={state.status === GeneratorStatus.LOADING}
                className={`px-6 py-2 ${theme.buttonBgSlide} text-white rounded-full font-medium shadow-lg hover:brightness-110 hover:scale-105 active:scale-95 transition-all`}
              >
                Redraw Heart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};