
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AstrophysicsInfoProps {
  className?: string;
}

const AstrophysicsInfo: React.FC<AstrophysicsInfoProps> = ({ className }) => {
  return (
    <Card className={`glass-card border-white/10 p-4 ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-cosmic-glow">Astrophysics Explorer</h2>
      
      <Tabs defaultValue="cosmos">
        <TabsList className="grid w-full grid-cols-4 mb-4 bg-black/20">
          <TabsTrigger value="cosmos">Cosmos</TabsTrigger>
          <TabsTrigger value="galaxies">Galaxies</TabsTrigger>
          <TabsTrigger value="stars">Stars</TabsTrigger>
          <TabsTrigger value="blackholes">Black Holes</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-[300px] rounded-md">
          <TabsContent value="cosmos" className="p-2">
            <h3 className="text-lg font-semibold mb-2">The Observable Universe</h3>
            <p className="text-sm text-gray-300 mb-4">
              The observable universe spans approximately 93 billion light-years in diameter, 
              containing an estimated 2 trillion galaxies and roughly 10^24 stars.
            </p>
            
            <h4 className="text-md font-semibold mb-1">Cosmic Timeline:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
              <li><strong>13.8 billion years ago:</strong> Big Bang</li>
              <li><strong>13.7 billion years ago:</strong> Cosmic Microwave Background formed</li>
              <li><strong>13.3 billion years ago:</strong> First stars and galaxies form</li>
              <li><strong>4.6 billion years ago:</strong> Solar System forms</li>
              <li><strong>3.7 billion years ago:</strong> Earliest evidence of life on Earth</li>
            </ul>
            
            <h4 className="text-md font-semibold mb-1">Cosmic Expansion:</h4>
            <p className="text-sm text-gray-300 mb-2">
              The universe is expanding at an accelerating rate. The current expansion rate 
              (Hubble constant) is approximately 70 km/s per megaparsec, meaning that for 
              every megaparsec (3.26 million light-years) of distance, galaxies are moving 
              apart at about 70 kilometers per second.
            </p>
            
            <h4 className="text-md font-semibold mb-1">Dark Matter and Dark Energy:</h4>
            <p className="text-sm text-gray-300">
              Dark matter makes up about 27% of the universe, while dark energy accounts 
              for about 68%. Regular visible matter constitutes only about 5% of the 
              cosmic composition.
            </p>
          </TabsContent>
          
          <TabsContent value="galaxies" className="p-2">
            <h3 className="text-lg font-semibold mb-2">Galactic Wonders</h3>
            <p className="text-sm text-gray-300 mb-4">
              Galaxies are vast collections of stars, gas, dust, and dark matter bound together 
              by gravity. They come in various shapes and sizes, from spirals to ellipticals.
            </p>
            
            <h4 className="text-md font-semibold mb-1">The Milky Way:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
              <li>Diameter: approximately 100,000 light-years</li>
              <li>Contains 100-400 billion stars</li>
              <li>Central supermassive black hole: Sagittarius A* (4.3 million solar masses)</li>
              <li>Age: approximately 13.6 billion years</li>
              <li>Type: Barred spiral galaxy</li>
              <li>Located in the Local Group of galaxies</li>
            </ul>
            
            <h4 className="text-md font-semibold mb-1">Andromeda Galaxy (M31):</h4>
            <p className="text-sm text-gray-300 mb-2">
              Our nearest large galactic neighbor, located 2.5 million light-years away. 
              Andromeda is on a collision course with the Milky Way and will merge with 
              our galaxy in about 4.5 billion years.
            </p>
            
            <h4 className="text-md font-semibold mb-1">Notable Galaxies:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li><strong>IC 1101:</strong> One of the largest known galaxies, spanning 4 million light-years</li>
              <li><strong>Messier 87:</strong> Home to the first photographed black hole</li>
              <li><strong>Cartwheel Galaxy:</strong> Ring galaxy formed by a galactic collision</li>
              <li><strong>Whirlpool Galaxy (M51):</strong> Classic spiral galaxy interacting with a companion</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="stars" className="p-2">
            <h3 className="text-lg font-semibold mb-2">Stellar Evolution</h3>
            <p className="text-sm text-gray-300 mb-4">
              Stars form from collapsing clouds of gas and dust and evolve through various 
              stages depending on their mass. Their lifecycle shapes the cosmos and creates 
              the elements needed for life.
            </p>
            
            <h4 className="text-md font-semibold mb-1">Star Types:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
              <li><strong>Main Sequence Stars:</strong> Like our Sun, fusing hydrogen into helium</li>
              <li><strong>Red Giants:</strong> Later-stage stars that have expanded</li>
              <li><strong>White Dwarfs:</strong> Remnant cores of medium-mass stars</li>
              <li><strong>Neutron Stars:</strong> Ultra-dense remnants of massive stars</li>
              <li><strong>Supergiants:</strong> Massive, luminous stars nearing the end of their life</li>
              <li><strong>Brown Dwarfs:</strong> "Failed stars" with insufficient mass for fusion</li>
            </ul>
            
            <h4 className="text-md font-semibold mb-1">Our Sun:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
              <li>Age: 4.6 billion years (middle-aged)</li>
              <li>Type: G-type main-sequence star (G2V)</li>
              <li>Diameter: 1.39 million km (109 Earths)</li>
              <li>Mass: 333,000 times Earth's mass</li>
              <li>Surface temperature: 5,500°C (9,932°F)</li>
              <li>Core temperature: 15 million°C (27 million°F)</li>
            </ul>
            
            <h4 className="text-md font-semibold mb-1">Notable Stars:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li><strong>UY Scuti:</strong> One of the largest known stars, radius 1,700 times larger than the Sun</li>
              <li><strong>Betelgeuse:</strong> Red supergiant in Orion, may go supernova "soon" (astronomically speaking)</li>
              <li><strong>Proxima Centauri:</strong> Closest star to our Sun at 4.2 light-years away</li>
              <li><strong>Sirius:</strong> Brightest star in Earth's night sky</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="blackholes" className="p-2">
            <h3 className="text-lg font-semibold mb-2">Black Holes</h3>
            <p className="text-sm text-gray-300 mb-4">
              Black holes are regions of spacetime where gravity is so strong that nothing—not even 
              light—can escape once it passes the event horizon. They form from the collapsed cores 
              of massive stars after supernovae.
            </p>
            
            <h4 className="text-md font-semibold mb-1">Types of Black Holes:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
              <li><strong>Stellar Black Holes:</strong> 3-100 solar masses, formed from collapsed stars</li>
              <li><strong>Intermediate Black Holes:</strong> 100-100,000 solar masses</li>
              <li><strong>Supermassive Black Holes:</strong> 100,000 to billions of solar masses, found at galaxy centers</li>
              <li><strong>Primordial Black Holes:</strong> Hypothetical black holes formed shortly after the Big Bang</li>
            </ul>
            
            <h4 className="text-md font-semibold mb-1">Black Hole Characteristics:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
              <li><strong>Event Horizon:</strong> The boundary beyond which nothing can escape</li>
              <li><strong>Singularity:</strong> The infinitely dense center of a black hole</li>
              <li><strong>Accretion Disk:</strong> Swirling matter around a black hole that heats up and emits radiation</li>
              <li><strong>Hawking Radiation:</strong> Theoretical radiation emitted by black holes due to quantum effects</li>
            </ul>
            
            <h4 className="text-md font-semibold mb-1">Notable Black Holes:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li><strong>Sagittarius A*:</strong> Supermassive black hole at the center of our Milky Way, 4.3 million solar masses</li>
              <li><strong>M87*:</strong> First black hole to be directly imaged, 6.5 billion solar masses</li>
              <li><strong>TON 618:</strong> One of the most massive known black holes, ~66 billion solar masses</li>
              <li><strong>Cygnus X-1:</strong> First black hole candidate ever identified, stellar-mass black hole</li>
            </ul>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};

export default AstrophysicsInfo;
