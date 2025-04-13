
import React, { useEffect, useRef } from 'react';

interface StarBackgroundProps {
  starCount?: number;
  shootingStarCount?: number;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ 
  starCount = 200, 
  shootingStarCount = 5 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    // Create the milky way background
    const milkyWay = document.createElement('div');
    milkyWay.className = 'milky-way';
    container.appendChild(milkyWay);
    
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
      if (Math.random() > 0.5) {
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 5}s`;
      }
      
      container.appendChild(star);
    }
    
    // Create shooting stars
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random position and timing
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 50}%`;
      shootingStar.style.animationDelay = `${Math.random() * 10}s`;
      shootingStar.style.animationDuration = `${Math.random() * 2 + 1}s`;
      
      container.appendChild(shootingStar);
    }

    // CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.2; }
        50% { opacity: 1; }
        100% { opacity: 0.2; }
      }
      
      @keyframes shooting-star {
        0% {
          transform: translateX(0) translateY(0) rotate(315deg);
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        100% {
          transform: translateX(500px) translateY(500px) rotate(315deg);
          opacity: 0;
        }
      }
      
      .milky-way {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at center, rgba(58, 40, 96, 0.2) 0%, transparent 60%),
                    radial-gradient(ellipse at 20% 30%, rgba(120, 100, 170, 0.1) 0%, transparent 70%);
        opacity: 0.6;
      }
      
      .star {
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
      }
      
      .shooting-star {
        position: absolute;
        width: 3px;
        height: 3px;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%,rgba(255,255,255,0) 100%);
        box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        animation: shooting-star 5s linear infinite;
        opacity: 0;
        animation-delay: 5s;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [starCount, shootingStarCount]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    ></div>
  );
};

export default StarBackground;
