import React, { useRef, useEffect } from 'react';

export const HeartTurtle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = 600;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    // Background color "black"
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    // Setup coordinate system to match Turtle (Center 0,0)
    ctx.translate(width / 2, height / 2);
    ctx.scale(1, -1); // Flip Y so positive Y is up
    
    // Set drawing style
    ctx.strokeStyle = '#ff0000'; // Red color
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Helper functions implementing the exact python logic provided
    // def heart1(M): return 15*math.sin(M)**3
    const heart1 = (M: number) => 15 * Math.pow(Math.sin(M), 3);
    
    // def heart2(M): return 12*math.cos(M)-5*math.cos(2*M)-math.cos(3*M)-math.cos(4*M)
    const heart2 = (M: number) => 12 * Math.cos(M) - 5 * Math.cos(2 * M) - Math.cos(3 * M) - Math.cos(4 * M);

    const DRAW_SCALE = 12; // Adjusted scale to fit nicely
    
    // To "complete the heart shape", we interpret the loop as degrees 0..360
    // The python range(300) leaves a gap, so we extend to 360.
    const TOTAL_STEPS = 360; 

    // Initial position (i=0)
    // M=0 -> sin(0)=0 -> x=0
    // M=0 -> cos(0)=1 -> 12(1)-5(1)-1(1)-1(1) = 5 -> y=5
    let i = 0;
    let prevX = heart1(0) * DRAW_SCALE;
    let prevY = heart2(0) * DRAW_SCALE;

    // Move to start without drawing line from 0,0 (Turtle goto implies pen down usually, but standard start is often lifted)
    // However, the python code executes goto inside the loop. 
    // If we assume pen is down from (0,0), we'd draw a line from center. 
    // Usually aesthetic hearts start clean. Let's start at the first point.
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);

    const animate = () => {
      // End condition
      if (i > TOTAL_STEPS) {
        // Final step from python code: goto(0, 0)
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(0, 0);
        ctx.stroke();
        return; 
      }

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);

      // Draw 4 steps per frame for smooth speed (~1.5s total)
      for (let step = 0; step < 4; step++) {
        if (i > TOTAL_STEPS) break;
        
        // Convert degrees to radians for math functions
        const M = i * (Math.PI / 180);
        
        const x = heart1(M) * DRAW_SCALE;
        const y = heart2(M) * DRAW_SCALE;
        
        ctx.lineTo(x, y);
        
        prevX = x;
        prevY = y;
        i++;
      }
      
      ctx.stroke();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

  }, []);

  return (
    <div className="flex items-center justify-center bg-black rounded-xl overflow-hidden border-2 border-rose-900/50 shadow-[0_0_40px_rgba(220,20,60,0.6)] animate-fade-in scale-100">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full max-w-[300px] max-h-[300px] md:max-w-[350px] md:max-h-[350px]"
        style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
      />
    </div>
  );
};