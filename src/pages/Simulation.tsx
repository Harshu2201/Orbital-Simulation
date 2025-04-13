
import React, { useState, useEffect } from 'react';
import StarBackground from '@/components/StarBackground';
import Navbar from '@/components/Navbar';
import SolarSystem from '@/components/SolarSystem';
import AstrophysicsInfo from '@/components/AstrophysicsInfo';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, Settings, Maximize, Minimize } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { toast } from '@/components/ui/use-toast';

const Simulation = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { playClickSound, isPlaying: isAudioPlaying } = useAudio();

  // Prompt for audio on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAudioPlaying) {
        toast({
          title: "Enable Cosmic Sound",
          description: "Click the speaker icon to enable space ambience and interactive sounds",
          duration: 5000,
        });
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isAudioPlaying]);

  const toggleFullscreen = () => {
    playClickSound();
    
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
      setIsFullscreen(true);
      
      toast({
        title: "Fullscreen Mode",
        description: "Entering immersive view. Press ESC to exit.",
        duration: 3000,
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleTabChange = (value: string) => {
    playClickSound();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground starCount={500} shootingStarCount={8} />
      <Navbar />
      
      <main className="container mx-auto pt-24 pb-12 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main simulation area */}
          <div className="md:w-3/4">
            <Card className="glass-card border-white/10 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">3D Solar System Simulation</h1>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="h-[600px] relative rounded-lg overflow-hidden">
                <SolarSystem />
              </div>
            </Card>
            
            <AstrophysicsInfo className="mb-6" />
            
            <Card className="glass-card border-white/10 p-6">
              <Tabs defaultValue="overview" onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-black/20">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="controls">Controls</TabsTrigger>
                  <TabsTrigger value="facts">Fun Facts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="text-gray-300">
                  <h2 className="text-xl font-bold mb-3">About This Simulation</h2>
                  <p className="mb-4">
                    This interactive 3D model shows the planets of our solar system. You can rotate, zoom, and explore
                    each planet in detail. The simulation is not to scale—if it were, you wouldn't be able to see the planets!
                  </p>
                  <p>
                    Click on any planet to see more information about it. Use your mouse to rotate the view and scroll to zoom in and out.
                    Enjoy exploring our cosmic neighborhood!
                  </p>
                </TabsContent>
                
                <TabsContent value="controls" className="text-gray-300">
                  <h2 className="text-xl font-bold mb-3">Simulation Controls</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Mouse Drag:</strong> Rotate the view</li>
                    <li><strong>Scroll:</strong> Zoom in/out</li>
                    <li><strong>Click on Planet:</strong> View planet details</li>
                    <li><strong>Play/Pause:</strong> Start or stop the planetary rotation</li>
                    <li><strong>Speed Control:</strong> Adjust how fast the planets rotate</li>
                    <li><strong>Fullscreen:</strong> Expand the simulation to fill your screen</li>
                    <li><strong>Audio Controls:</strong> Toggle space ambient music and UI sounds</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="facts" className="text-gray-300">
                  <h2 className="text-xl font-bold mb-3">Solar System Facts</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>The Sun makes up 99.86% of the mass in the solar system</li>
                    <li>Light from the Sun takes about 8 minutes to reach Earth</li>
                    <li>The solar system formed about 4.6 billion years ago</li>
                    <li>There are eight recognized planets in our solar system</li>
                    <li>Pluto was reclassified as a dwarf planet in 2006</li>
                    <li>The solar system is located in the Orion Arm of the Milky Way galaxy</li>
                    <li>The Kuiper Belt and Oort Cloud contain countless icy objects beyond Neptune</li>
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
                <h2 className="text-xl font-bold">Did You Know?</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Solar Wind</h3>
                  <p className="text-sm text-gray-400">The solar wind is a stream of charged particles released from the Sun that affects all planets in our system.</p>
                </div>
                
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Earth's Uniqueness</h3>
                  <p className="text-sm text-gray-400">Earth is the only planet not named after a god or goddess from Greek or Roman mythology.</p>
                </div>
                
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Jupiter's Protection</h3>
                  <p className="text-sm text-gray-400">Jupiter's massive gravity acts as a cosmic shield, protecting Earth from many asteroid impacts.</p>
                </div>
                
                <div className="border-b border-white/10 pb-3">
                  <h3 className="font-medium mb-1">Venus's Day</h3>
                  <p className="text-sm text-gray-400">A day on Venus (243 Earth days) is longer than its year (225 Earth days).</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Saturn's Density</h3>
                  <p className="text-sm text-gray-400">Saturn is so light that it would float in water if there were an ocean large enough to hold it.</p>
                </div>
              </div>
            </Card>
            
            <Card className="glass-card border-white/10 p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-5 w-5 mr-2 text-cosmic-glow" />
                <h2 className="text-xl font-bold">Settings</h2>
              </div>
              
              <div className="space-y-4 text-sm text-gray-300">
                <p>Simulation settings:</p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Click any planet to focus</li>
                  <li>Rotate view with mouse drag</li>
                  <li>Zoom with scroll wheel</li>
                  <li>Adjust rotation speed with slider</li>
                  <li>Toggle audio with sound button</li>
                  <li>All buttons have interactive sounds</li>
                </ul>
                
                <p className="mt-4 text-gray-400 italic">
                  Try the fullscreen mode for an immersive experience!
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
