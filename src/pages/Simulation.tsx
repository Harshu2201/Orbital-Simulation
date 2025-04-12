
import React from 'react';
import StarBackground from '@/components/StarBackground';
import Navbar from '@/components/Navbar';
import SolarSystem from '@/components/SolarSystem';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, Settings, Maximize, Minimize } from 'lucide-react';

const Simulation = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground starCount={500} />
      <Navbar />
      
      <main className="container mx-auto pt-24 pb-12 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main simulation area */}
          <div className="md:w-3/4">
            <Card className="glass-card border-white/10 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Solar System Simulation</h1>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="h-[500px] relative rounded-lg overflow-hidden">
                <SolarSystem />
              </div>
            </Card>
            
            <Card className="glass-card border-white/10 p-6">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-black/20">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="controls">Controls</TabsTrigger>
                  <TabsTrigger value="facts">Fun Facts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="text-gray-300">
                  <h2 className="text-xl font-bold mb-3">About This Simulation</h2>
                  <p className="mb-4">
                    This interactive model shows the planets of our solar system orbiting around the Sun. 
                    The simulation is not to scale—if it were, you wouldn't be able to see the planets!
                  </p>
                  <p>
                    You can control the simulation speed using the controls above the simulation. 
                    Explore and enjoy the cosmic dance of our planetary neighbors!
                  </p>
                </TabsContent>
                
                <TabsContent value="controls" className="text-gray-300">
                  <h2 className="text-xl font-bold mb-3">Simulation Controls</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Play/Pause:</strong> Start or stop the orbital motion</li>
                    <li><strong>Speed Control:</strong> Adjust how fast the planets orbit</li>
                    <li><strong>Fullscreen:</strong> Expand the simulation to fill your screen</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="facts" className="text-gray-300">
                  <h2 className="text-xl font-bold mb-3">Solar System Facts</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>The Sun makes up 99.86% of the mass in the solar system</li>
                    <li>A day on Venus is longer than a year on Venus</li>
                    <li>Jupiter has the shortest day of all the planets</li>
                    <li>The Great Red Spot on Jupiter is a storm that has lasted over 300 years</li>
                    <li>If Saturn were placed in water, it would float</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Card className="glass-card border-white/10 p-6 mb-6">
              <div className="flex items-center mb-4">
                <Info className="h-5 w-5 mr-2 text-cosmic-glow" />
                <h2 className="text-xl font-bold">Planet Info</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Mercury</h3>
                  <p className="text-sm text-gray-400">The smallest and innermost planet in the Solar System.</p>
                </div>
                
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Venus</h3>
                  <p className="text-sm text-gray-400">The hottest planet with a toxic atmosphere of carbon dioxide.</p>
                </div>
                
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Earth</h3>
                  <p className="text-sm text-gray-400">Our home planet, the only known planet with life.</p>
                </div>
                
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Mars</h3>
                  <p className="text-sm text-gray-400">Known as the Red Planet due to iron oxide on its surface.</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Jupiter</h3>
                  <p className="text-sm text-gray-400">The largest planet in our solar system, a gas giant.</p>
                </div>
              </div>
            </Card>
            
            <Card className="glass-card border-white/10 p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-5 w-5 mr-2 text-cosmic-glow" />
                <h2 className="text-xl font-bold">Settings</h2>
              </div>
              
              <div className="space-y-4 text-sm text-gray-300">
                <p>Simulation settings coming soon:</p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Gravity adjustments</li>
                  <li>Planet customization</li>
                  <li>Orbital path visualization</li>
                  <li>Realistic scaling option</li>
                </ul>
                
                <p className="mt-4 text-gray-400 italic">
                  These features will be included in our next update!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Simulation;
