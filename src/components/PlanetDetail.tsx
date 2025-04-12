
import React from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { PLANET_DATA } from '@/data/planetData';

interface PlanetDetailProps {
  activePlanet: string | null;
}

const PlanetDetail: React.FC<PlanetDetailProps> = ({ activePlanet }) => {
  if (!activePlanet) return null;
  
  const planetData = PLANET_DATA.find(p => p.name === activePlanet);
  if (!planetData) return null;

  return (
    <Collapsible defaultOpen={true} className="absolute bottom-4 right-4 max-w-xs">
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm" className="w-full flex items-center justify-between mb-2">
          <span>{activePlanet} Details</span>
          <Info className="h-4 w-4 ml-2" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="glass-card p-4">
          {planetData.description && (
            <p className="text-sm text-gray-300 mb-2">
              {planetData.description}
            </p>
          )}
          
          <div className="mt-2">
            <h3 className="text-sm font-semibold mb-1">Quick Facts:</h3>
            <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
              {planetData.facts?.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PlanetDetail;
