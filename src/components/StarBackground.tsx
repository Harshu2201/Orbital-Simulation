
import React, { useEffect, useRef } from 'react';

interface StarBackgroundProps {
  starCount?: number;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ starCount = 200 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2.5;
      
      star.className = 'star';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      
      // Add twinkling animation to some stars
      if (Math.random() > 0.7) {
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 5}s`;
      }
      
      container.appendChild(star);
    }
  }, [starCount]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    ></div>
  );
};

export default StarBackground;
