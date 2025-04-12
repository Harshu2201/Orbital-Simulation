
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isPlaying, volume, toggleAudio, setVolume } = useAudio();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 glass-card">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight cosmic-glow">
            Cosmic Orbit
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-lg font-medium hover:text-cosmic-glow transition-colors">
            Home
          </Link>
          <Link to="/simulation" className="text-lg font-medium hover:text-cosmic-glow transition-colors">
            Simulation
          </Link>
          <Link to="/learn" className="text-lg font-medium hover:text-cosmic-glow transition-colors">
            Learn
          </Link>
        </div>

        {/* Audio controls */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAudio}
            aria-label={isPlaying ? "Mute" : "Unmute"}
            className="hover:bg-white/10"
          >
            {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          <div className="w-24">
            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="hover:bg-white/10"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 glass-card p-4 rounded-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium p-2 hover:bg-white/5 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/simulation" 
              className="text-lg font-medium p-2 hover:bg-white/5 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Simulation
            </Link>
            <Link 
              to="/learn" 
              className="text-lg font-medium p-2 hover:bg-white/5 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Learn
            </Link>
            
            {/* Mobile audio controls */}
            <div className="flex items-center space-x-4 p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAudio}
                aria-label={isPlaying ? "Mute" : "Unmute"}
                className="hover:bg-white/10"
              >
                {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              <div className="flex-1">
                <Slider
                  value={[volume * 100]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0] / 100)}
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
