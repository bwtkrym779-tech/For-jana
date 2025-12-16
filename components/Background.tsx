import React from 'react';
import { ThemeConfig } from '../types';

const REPEAT_COUNT = 20;

const MarqueeRow: React.FC<{ reverse?: boolean; text: string; opacity: string; colorClass: string }> = ({ reverse, text, opacity, colorClass }) => {
  const content = Array(REPEAT_COUNT).fill(text).join(' \u00A0\u00A0\u00A0\u2665\u00A0\u00A0\u00A0 ');
  
  return (
    <div className={`overflow-hidden whitespace-nowrap py-4 select-none ${opacity}`}>
      <div className={`inline-block ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        <span className={`text-4xl md:text-6xl font-serif-display italic font-bold tracking-tighter ${colorClass} px-4`}>
          {content}
        </span>
        <span className={`text-4xl md:text-6xl font-serif-display italic font-bold tracking-tighter ${colorClass} px-4`}>
          {content}
        </span>
      </div>
    </div>
  );
};

interface BackgroundProps {
  theme: ThemeConfig;
}

export const Background: React.FC<BackgroundProps> = ({ theme }) => {
  return (
    <div className={`fixed inset-0 z-0 flex flex-col justify-center ${theme.bgBase} overflow-hidden pointer-events-none transition-colors duration-700 ease-in-out`}>
      <div className={`absolute inset-0 ${theme.bgGradient} z-10 transition-colors duration-700`} />
      
      {/* Rotated Container for visual interest */}
      <div className="transform -rotate-6 scale-110 flex flex-col justify-between h-[120%] -mt-10">
        <MarqueeRow text="I Love You" opacity="opacity-30" colorClass={theme.marqueeText} />
        <MarqueeRow text="Je t'aime" reverse opacity="opacity-20" colorClass={theme.marqueeText} />
        <MarqueeRow text="Te Amo" opacity="opacity-30" colorClass={theme.marqueeText} />
        <MarqueeRow text="Ich liebe dich" reverse opacity="opacity-20" colorClass={theme.marqueeText} />
        <MarqueeRow text="I Love You" opacity="opacity-40" colorClass={theme.marqueeText} />
        <MarqueeRow text="Mahal Kita" reverse opacity="opacity-20" colorClass={theme.marqueeText} />
        <MarqueeRow text="Ti Amo" opacity="opacity-30" colorClass={theme.marqueeText} />
        <MarqueeRow text="I Love You" reverse opacity="opacity-50" colorClass={theme.marqueeText} />
        <MarqueeRow text="Saranghae" opacity="opacity-20" colorClass={theme.marqueeText} />
        <MarqueeRow text="I Love You" reverse opacity="opacity-40" colorClass={theme.marqueeText} />
      </div>
    </div>
  );
};