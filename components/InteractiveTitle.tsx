import React, { useRef, useState, MouseEvent } from 'react';
import { ThemeConfig } from '../types';

interface InteractiveTitleProps {
  theme: ThemeConfig;
}

export const InteractiveTitle: React.FC<InteractiveTitleProps> = ({ theme }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
    if (!titleRef.current) return;

    const rect = titleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on cursor position relative to center
    // Max rotation: approx 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15; // Invert Y axis for natural tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <div className="perspective-500 inline-block relative z-20 p-4">
      <h1
        ref={titleRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={`
          text-5xl md:text-8xl font-serif-display font-bold 
          text-transparent bg-clip-text bg-gradient-to-r 
          ${theme.primaryText.replace('text-', 'from-').replace('900', '500')} 
          ${theme.modalAccent.replace('text-', 'to-')} 
          mb-2 tracking-tight 
          transition-all duration-100 ease-out
          cursor-pointer select-none
          ${!isHovered ? 'animate-subtle-pulse' : ''}
        `}
        style={{
          transform: `
            perspective(1000px) 
            rotateX(${isHovered ? rotation.x : 0}deg) 
            rotateY(${isHovered ? rotation.y : 0}deg) 
            scale(${isClicked ? 0.95 : isHovered ? 1.05 : 1})
          `,
          // Dynamic shadow that moves opposite to the light source/tilt
          filter: isHovered 
            ? `drop-shadow(${rotation.y * -0.5}px ${rotation.x * 0.5 + 10}px 8px rgba(0,0,0,0.2))` 
            : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
        }}
      >
        I Love You, Jana
      </h1>
      <style>{`
        .perspective-500 { perspective: 500px; }
      `}</style>
    </div>
  );
};