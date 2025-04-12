
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PLANET_DATA } from '@/data/planetData';

interface PlanetNavigatorProps {
  activePlanet: string | null;
  setActivePlanet: (planet: string | null) => void;
}

const PlanetNavigator: React.FC<PlanetNavigatorProps> = ({
  activePlanet,
  setActivePlanet
}) => {
  return (
    <div className="glass-card p-2 rounded-lg mb-4 overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "text-xs",
            activePlanet === null && "bg-cosmic-glow/20"
          )}
          onClick={() => setActivePlanet(null)}
        >
          All Planets
        </Button>
        
        {PLANET_DATA.map((planet) => (
          <Button
            key={planet.name}
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs",
              activePlanet === planet.name && "bg-cosmic-glow/20"
            )}
            onClick={() => setActivePlanet(planet.name)}
          >
            {planet.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PlanetNavigator;
