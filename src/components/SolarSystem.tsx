
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html, useTexture } from '@react-three/drei';
import Planet from './Planet';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Play, Pause, FastForward, Rewind, Info } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

const PLANET_DATA = [
  {
    name: "Mercury",
    size: 0.5,
    textureMap: "/textures/mercury.jpg",
    position: [4, 0, 0],
    rotationSpeed: 0.004,
    description: "The smallest and innermost planet in the Solar System.",
    facts: [
      "Mercury has no atmosphere and no water",
      "A day on Mercury lasts 176 Earth days",
      "Mercury's surface is covered in craters",
      "It has a large iron core"
    ]
  },
  {
    name: "Venus",
    size: 0.9,
    textureMap: "/textures/venus.jpg",
    position: [7, 0, 0],
    rotationSpeed: 0.002,
    description: "The hottest planet with a toxic atmosphere of carbon dioxide.",
    facts: [
      "Venus rotates backward compared to other planets",
      "Its thick atmosphere traps heat, making it extremely hot",
      "The pressure on Venus is 92 times Earth's pressure",
      "A day on Venus is longer than its year"
    ]
  },
  {
    name: "Earth",
    size: 1,
    textureMap: "/textures/earth.jpg",
    position: [10, 0, 0],
    rotationSpeed: 0.01,
    description: "Our home planet, the only known planet with life.",
    facts: [
      "Earth is the only planet with liquid water on the surface",
      "Earth's atmosphere is 78% nitrogen and 21% oxygen",
      "Earth's magnetic field protects us from solar radiation",
      "70% of Earth's surface is covered by water"
    ]
  },
  {
    name: "Mars",
    size: 0.7,
    textureMap: "/textures/mars.jpg",
    position: [13, 0, 0],
    rotationSpeed: 0.008,
    description: "Known as the Red Planet due to iron oxide on its surface.",
    facts: [
      "Mars has the tallest mountain in the solar system",
      "Mars has two small moons: Phobos and Deimos",
      "Mars has polar ice caps made of water and carbon dioxide",
      "Mars has seasons similar to Earth but longer"
    ]
  },
  {
    name: "Jupiter",
    size: 2.5,
    textureMap: "/textures/jupiter.jpg",
    position: [18, 0, 0],
    rotationSpeed: 0.04,
    description: "The largest planet in our solar system, a gas giant.",
    facts: [
      "Jupiter has the Great Red Spot, a giant storm",
      "Jupiter has at least 79 moons",
      "Jupiter's magnetic field is 14 times stronger than Earth's",
      "Jupiter is mainly composed of hydrogen and helium"
    ]
  },
  {
    name: "Saturn",
    size: 2.2,
    textureMap: "/textures/saturn.jpg",
    position: [23, 0, 0],
    hasRings: true,
    ringTexture: "/textures/saturn_rings.png",
    rotationSpeed: 0.03,
    description: "Famous for its beautiful ring system, Saturn is a gas giant.",
    facts: [
      "Saturn's rings are made of ice, rock, and dust",
      "Saturn has at least 82 moons",
      "Saturn has a density less than water - it would float",
      "Saturn's atmosphere is mainly hydrogen and helium"
    ]
  },
  {
    name: "Uranus",
    size: 1.8,
    textureMap: "/textures/uranus.jpg",
    position: [28, 0, 0],
    hasRings: true,
    ringTexture: "/textures/uranus_rings.jpg",
    rotationSpeed: 0.02,
    description: "An ice giant that rotates on its side.",
    facts: [
      "Uranus rotates on its side, like a rolling ball",
      "Uranus has 13 rings and 27 known moons",
      "Uranus is made mostly of water, methane, and ammonia ices",
      "It appears blue-green due to methane in its atmosphere"
    ]
  },
  {
    name: "Neptune",
    size: 1.7,
    textureMap: "/textures/neptune.jpg",
    position: [32, 0, 0],
    rotationSpeed: 0.025,
    description: "The windiest planet, with gusts up to 2,100 km/h.",
    facts: [
      "Neptune has the strongest winds in the solar system",
      "Neptune has 14 known moons",
      "Neptune completes an orbit every 165 Earth years",
      "Neptune's blue color comes from methane in its atmosphere"
    ]
  }
];

// Scene setup component
const SceneSetup = ({ activePlanet, setActivePlanet, speed }) => {
  const { camera } = useThree();
  
  // Set initial camera position
  React.useEffect(() => {
    camera.position.set(0, 10, 25);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
        <Html position={[0, 3, 0]} distanceFactor={10}>
          <div className="bg-black/50 backdrop-blur-sm p-1 rounded whitespace-nowrap">
            <span className="text-yellow-400 font-bold text-sm">The Sun</span>
          </div>
        </Html>
      </mesh>
      
      {/* Planets */}
      {PLANET_DATA.map((planet, index) => (
        <Planet
          key={planet.name}
          {...planet}
          rotationSpeed={planet.rotationSpeed * speed}
          showInfo={activePlanet === planet.name}
          onClick={() => setActivePlanet(planet.name)}
        />
      ))}
      
      {/* Orbit controls for camera */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.5}
        panSpeed={0.5}
        rotateSpeed={0.5}
      />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
    </>
  );
};

const SolarSystem: React.FC = () => {
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const { toggleAudio, isAudioPlaying } = useAudio();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // For animations that are controlled by useFrame
    if (isPlaying) {
      // Pause all animations
      setSpeed(0);
    } else {
      // Resume animations
      setSpeed(1);
    }
  };

  const adjustSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const increaseSpeed = () => {
    const newSpeed = Math.min(speed + 0.25, 3);
    adjustSpeed(newSpeed);
  };

  const decreaseSpeed = () => {
    const newSpeed = Math.max(speed - 0.25, 0.25);
    adjustSpeed(newSpeed);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Control panel */}
      <div className="glass-card py-3 px-6 rounded-lg mb-4 flex items-center gap-4">
        <Button
          variant="outline" 
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          className="text-white border-white/20 hover:bg-white/10"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="outline" 
          size="icon"
          onClick={decreaseSpeed}
          aria-label="Decrease speed"
          className="text-white border-white/20 hover:bg-white/10"
        >
          <Rewind className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 px-4">
          <Slider
            value={[speed * 100]}
            min={25}
            max={300}
            step={25}
            onValueChange={(value) => adjustSpeed(value[0] / 100)}
            aria-label="Simulation speed"
          />
        </div>
        
        <Button
          variant="outline" 
          size="icon"
          onClick={increaseSpeed}
          aria-label="Increase speed"
          className="text-white border-white/20 hover:bg-white/10"
        >
          <FastForward className="h-4 w-4" />
        </Button>
        
        <div className="text-sm font-medium">{speed.toFixed(2)}x</div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAudio}
          aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}
          className="text-white border-white/20 hover:bg-white/10 ml-2"
        >
          {isAudioPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </Button>
      </div>

      {/* Instructions */}
      <div className="glass-card p-2 rounded-lg mb-4 text-center text-xs text-gray-300">
        <p>Use mouse to rotate. Scroll to zoom in/out. Click on a planet to see details.</p>
      </div>

      {/* Planet selector */}
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

      {/* Solar system canvas */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 z-10">
          <Suspense fallback={<div className="flex h-full items-center justify-center">Loading 3D models...</div>}>
            <Canvas dpr={[1, 2]} shadows>
              <SceneSetup 
                activePlanet={activePlanet} 
                setActivePlanet={setActivePlanet} 
                speed={speed}
              />
            </Canvas>
          </Suspense>
        </div>
      </div>
      
      {/* Selected Planet Detail Card */}
      {activePlanet && (
        <Collapsible defaultOpen={true} className="absolute bottom-4 right-4 max-w-xs">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-between mb-2">
              <span>{activePlanet} Details</span>
              <Info className="h-4 w-4 ml-2" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="glass-card p-4">
              {PLANET_DATA.find(p => p.name === activePlanet)?.description && (
                <p className="text-sm text-gray-300 mb-2">
                  {PLANET_DATA.find(p => p.name === activePlanet)?.description}
                </p>
              )}
              
              <div className="mt-2">
                <h3 className="text-sm font-semibold mb-1">Quick Facts:</h3>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                  {PLANET_DATA.find(p => p.name === activePlanet)?.facts?.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default SolarSystem;
