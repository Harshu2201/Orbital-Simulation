
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Star, Radio } from 'lucide-react';
import StarBackground from '@/components/StarBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useAudio } from '@/contexts/AudioContext';

const Index = () => {
  const { toggleAudio, isPlaying } = useAudio();

  // Start audio when user interacts with page
  useEffect(() => {
    const handleInteraction = () => {
      if (!isPlaying) {
        toggleAudio();
      }
      // Remove event listener after first interaction
      document.removeEventListener('click', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [isPlaying, toggleAudio]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground starCount={300} />
      <Navbar />
      
      <main className="container mx-auto pt-32 pb-20 px-4">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter cosmic-glow mb-6">
            Cosmic Orbit Sandbox
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10">
            Explore the wonders of our solar system through an interactive, immersive simulation.
            Manipulate planets, play with physics, and learn about space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/simulation">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90">
                Launch Simulation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 hover:bg-white/10">
                Learn More
                <Info className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="glass-card border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-cosmic-purple/20 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Orbits</h3>
              <p className="text-gray-400">
                Manipulate planetary orbits, speeds, and gravitational forces in real-time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-cosmic-blue/20 flex items-center justify-center mb-4">
                <Radio className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ambient Soundscapes</h3>
              <p className="text-gray-400">
                Immerse yourself with cosmic ambient sounds that enhance the space exploration experience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-cosmic-pink/20 flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-pink-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Educational Content</h3>
              <p className="text-gray-400">
                Learn fascinating facts about our solar system while you play and explore.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Preview section */}
        <div className="glass-card border-white/10 rounded-xl p-6 md:p-10 relative overflow-hidden mb-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore The Cosmos
              </h2>
              <p className="text-gray-300 mb-6">
                Our simulation lets you visualize planetary orbits with stunning animations. 
                Adjust orbit speeds, zoom in on planets, and learn about our solar system's 
                mechanics.
              </p>
              <Link to="/simulation">
                <Button className="bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90">
                  Try It Now
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 h-60 md:h-80 bg-black/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500 mx-auto mb-4 animate-pulse-glow"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500 absolute animate-orbit-medium" style={{"--orbit-radius": "80px"} as React.CSSProperties}></div>
                <div className="w-8 h-8 rounded-full bg-red-500 absolute animate-orbit-slow" style={{"--orbit-radius": "120px"} as React.CSSProperties}></div>
                <p className="text-sm text-gray-400">Interactive Preview</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Explore the Universe?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Jump into our simulation and begin your cosmic journey today.
          </p>
          <Link to="/simulation">
            <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="glass-card border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Cosmic Orbit Sandbox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
