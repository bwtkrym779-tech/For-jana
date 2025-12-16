import React, { useEffect, useState } from 'react';

interface Heart3DProps {
  colorClass: string;
}

export const Heart3D: React.FC<Heart3DProps> = ({ colorClass }) => {
  const [assembled, setAssembled] = useState(false);
  const layers = Array.from({ length: 20 }); // 20 layers for density

  useEffect(() => {
    // Trigger animation shortly after mount
    const timer = setTimeout(() => setAssembled(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-64 w-64 perspective-1000">
      <div className="relative w-32 h-32 transform-style-3d animate-spin-slow-3d">
        {layers.map((_, i) => {
          // Z-axis distribution: -40px to 40px
          const zIndex = (i - layers.length / 2) * 4;
          // Shape curve: Make middle layers largest to form a volume
          const normalizedPos = Math.abs(i - layers.length / 2) / (layers.length / 2);
          const scale = 1 - Math.pow(normalizedPos, 2.5) * 0.8;
          
          return (
            <div
              key={i}
              className={`absolute inset-0 ${colorClass} transition-all duration-1000 ease-out`}
              style={{
                opacity: assembled ? 0.8 : 0,
                transform: assembled 
                  ? `translateZ(${zIndex}px) scale(${scale})` 
                  : `translateZ(0px) scale(0)`,
                transitionDelay: `${i * 50}ms`, // Staggered build effect
              }}
            >
              <svg viewBox="0 0 32 29.6" className="w-full h-full drop-shadow-sm fill-current">
                <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                  c6.1-9.3,16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z"/>
              </svg>
            </div>
          );
        })}
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .animate-spin-slow-3d { animation: spin3d 15s infinite linear; }
        @keyframes spin3d {
          0% { transform: rotateY(0deg) rotateX(10deg); }
          100% { transform: rotateY(360deg) rotateX(10deg); }
        }
      `}</style>
    </div>
  );
};