import React, { useState, useEffect, useCallback } from 'react';
import { FloatingHeart } from '../types';

interface HeartClickerProps {
  colors: string[];
}

export const HeartClicker: React.FC<HeartClickerProps> = ({ colors }) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const createHeart = useCallback((x: number, y: number) => {
    // Fallback if colors is empty
    const palette = colors.length > 0 ? colors : ['text-red-500'];
    const randomColor = palette[Math.floor(Math.random() * palette.length)];
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: randomColor,
    };

    setHearts((prev) => [...prev, newHeart]);

    // Cleanup heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  }, [colors]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn heart if clicking on a button or interactive element
      if ((e.target as HTMLElement).closest('button')) return;
      createHeart(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [createHeart]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${heart.color} animate-float-up text-4xl`}
          style={{
            left: heart.x,
            top: heart.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};