
import React, { useEffect, useRef } from 'react';

interface StarBackgroundProps {
  starCount?: number;
  shootingStarCount?: number;
}

const StarBackground: React.FC<StarBackgroundProps> = ({ 
  starCount = 250, 
  shootingStarCount = 8 
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
    
    // Create a nebula effect
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    container.appendChild(nebula);
    
    // Create stars with different sizes and animation speeds
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3;
      const brightness = Math.random() * 0.5 + 0.5;
      
      star.className = 'star';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${brightness}`;
      
      // Add twinkling animation to most stars with varied timing
      if (Math.random() > 0.3) {
        const duration = Math.random() * 4 + 2;
        star.style.animation = `twinkle ${duration}s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 5}s`;
      }
      
      container.appendChild(star);
    }
    
    // Create distant galaxies
    for (let i = 0; i < 3; i++) {
      const galaxy = document.createElement('div');
      galaxy.className = 'distant-galaxy';
      galaxy.style.left = `${Math.random() * 90 + 5}%`;
      galaxy.style.top = `${Math.random() * 90 + 5}%`;
      galaxy.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      galaxy.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`;
      container.appendChild(galaxy);
    }
    
    // Create shooting stars with varied paths and timing
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random position, timing, and angle
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 70}%`;
      shootingStar.style.animationDelay = `${Math.random() * 15}s`;
      shootingStar.style.animationDuration = `${Math.random() * 1.5 + 1}s`;
      
      // Random angle for shooting star path
      const angle = Math.random() * 50 + 20; // Between 20 and 70 degrees
      shootingStar.style.transform = `rotate(${angle}deg)`;
      
      container.appendChild(shootingStar);
    }

    // CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.1; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
        100% { opacity: 0.1; transform: scale(0.8); }
      }
      
      @keyframes shooting-star {
        0% {
          transform: translateX(0) translateY(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        100% {
          transform: translateX(500px) translateY(500px);
          opacity: 0;
        }
      }
      
      @keyframes nebula-shift {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
      
      @keyframes galaxy-pulse {
        0% { transform: scale(1) rotate(0deg); opacity: 0.6; }
        50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(1) rotate(360deg); opacity: 0.6; }
      }
      
      .milky-way {
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: 
          radial-gradient(ellipse at center, rgba(58, 40, 96, 0.3) 0%, transparent 70%),
          radial-gradient(ellipse at 20% 30%, rgba(120, 100, 220, 0.2) 0%, transparent 70%);
        opacity: 0.7;
        animation: nebula-shift 120s ease-in-out infinite;
      }
      
      .nebula {
        position: absolute;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(ellipse at 70% 65%, rgba(90, 30, 160, 0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 30% 25%, rgba(60, 20, 130, 0.15) 0%, transparent 60%);
        animation: nebula-shift 180s ease-in-out infinite reverse;
      }
      
      .star {
        position: absolute;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
      }
      
      .shooting-star {
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%,rgba(255,255,255,0) 100%);
        box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        animation: shooting-star 5s linear infinite;
        opacity: 0;
      }
      
      .distant-galaxy {
        position: absolute;
        width: 120px;
        height: 120px;
        background: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(120,100,220,0.1) 50%, transparent 70%);
        border-radius: 50%;
        filter: blur(8px);
        animation: galaxy-pulse 30s ease-in-out infinite;
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
