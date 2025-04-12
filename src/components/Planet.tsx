
import React from 'react';
import { cn } from '@/lib/utils';

interface PlanetProps {
  name: string;
  size: number;
  color: string;
  orbitClass: string;
  orbitPosition?: number;
  hasRings?: boolean;
  className?: string;
}

const Planet: React.FC<PlanetProps> = ({
  name,
  size,
  color,
  orbitClass,
  orbitPosition = 0,
  hasRings = false,
  className
}) => {
  return (
    <div className={cn("absolute", orbitClass)}>
      <div 
        className={cn(
          "rounded-full planet-shadow relative flex items-center justify-center",
          hasRings && "before:absolute before:content-[''] before:w-[150%] before:h-[20%] before:bg-white/20 before:rounded-full before:rotate-12",
          className
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: `rotate(${orbitPosition}deg)`,
        }}
        title={name}
      >
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
};

export default Planet;
