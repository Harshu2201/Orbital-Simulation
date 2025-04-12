
import React from 'react';
import StarBackground from '@/components/StarBackground';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Learn = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground starCount={300} />
      <Navbar />
      
      <main className="container mx-auto pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 cosmic-glow">Learn About Space</h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Explore fascinating facts about our solar system, planets, and the cosmos.
          </p>
          
          <Tabs defaultValue="solar-system" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-black/20">
              <TabsTrigger value="solar-system">Solar System</TabsTrigger>
              <TabsTrigger value="planets">Planets</TabsTrigger>
              <TabsTrigger value="space">Deep Space</TabsTrigger>
            </TabsList>
            
            <TabsContent value="solar-system">
              <Card className="glass-card border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">The Solar System</h2>
                  
                  <p className="text-gray-300 mb-6">
                    Our solar system consists of the Sun and everything that orbits around it, 
                    including planets, moons, asteroids, comets, and meteoroids.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">Formation</h3>
                      <p className="text-gray-400">
                        The solar system formed about 4.6 billion years ago from a giant 
                        cloud of gas and dust called the solar nebula. As the nebula collapsed 
                        under its own gravity, it spun faster and flattened into a disc.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Structure</h3>
                      <p className="text-gray-400">
                        The solar system consists of:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                        <li>The Sun - a yellow dwarf star at the center</li>
                        <li>Inner planets - Mercury, Venus, Earth, and Mars</li>
                        <li>Asteroid belt - between Mars and Jupiter</li>
                        <li>Outer planets - Jupiter, Saturn, Uranus, and Neptune</li>
                        <li>Kuiper Belt - beyond Neptune</li>
                        <li>Oort Cloud - a distant shell of icy objects</li>
                      </ul>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Interesting Facts</h3>
                      <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                        <li>Light from the Sun takes about 8 minutes to reach Earth</li>
                        <li>The solar system is about 26,000 light-years from the center of the Milky Way galaxy</li>
                        <li>It takes the solar system about 225-250 million years to complete one orbit around the Milky Way's center</li>
                        <li>The solar system is moving at 70,000 kilometers per hour toward the constellation Hercules</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="planets">
              <Card className="glass-card border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">The Planets</h2>
                  
                  <p className="text-gray-300 mb-6">
                    Our solar system has eight planets, each with its own unique characteristics.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-200">Mercury</h3>
                      <p className="text-gray-400">
                        The smallest and closest planet to the Sun. Mercury has no atmosphere to 
                        regulate temperature, so it can be extremely hot during the day (up to 800°F/430°C) 
                        and very cold at night (as low as -290°F/-180°C).
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-200">Venus</h3>
                      <p className="text-gray-400">
                        Often called Earth's twin due to similar size, Venus has a toxic atmosphere 
                        with clouds of sulfuric acid and extremely high pressure. It's the hottest 
                        planet in our solar system, even though Mercury is closer to the Sun.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-200">Earth</h3>
                      <p className="text-gray-400">
                        Our home planet is the only known celestial body that supports life. It has 
                        liquid water on its surface, an oxygen-rich atmosphere, and a protective 
                        magnetic field that shields us from much of the Sun's radiation.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-200">Mars</h3>
                      <p className="text-gray-400">
                        Known as the Red Planet due to iron oxide (rust) on its surface. Mars has 
                        the largest volcano in the solar system, Olympus Mons, and a canyon system, 
                        Valles Marineris, that would stretch across the United States.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-200">Jupiter</h3>
                      <p className="text-gray-400">
                        The largest planet in our solar system, Jupiter is a gas giant primarily 
                        composed of hydrogen and helium. Its Great Red Spot is a storm that has 
                        been raging for at least 300 years.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="space">
              <Card className="glass-card border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Deep Space</h2>
                  
                  <p className="text-gray-300 mb-6">
                    Beyond our solar system lies an vast universe filled with galaxies, 
                    stars, nebulae, black holes, and countless mysteries.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">Galaxies</h3>
                      <p className="text-gray-400">
                        Galaxies are massive collections of stars, gas, dust, and dark matter. 
                        Our Milky Way galaxy contains between 100-400 billion stars. The observable 
                        universe contains an estimated 2 trillion galaxies.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Stars</h3>
                      <p className="text-gray-400">
                        Stars are gigantic balls of gas (mostly hydrogen and helium) that produce 
                        light and heat through nuclear fusion. They vary in size, color, and temperature. 
                        The closest star to Earth (besides the Sun) is Proxima Centauri, about 4.24 light-years away.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">Black Holes</h3>
                      <p className="text-gray-400">
                        Black holes are regions of spacetime where gravity is so strong that nothing, 
                        not even light, can escape. They form when massive stars die and collapse under 
                        their own gravity. Supermassive black holes exist at the centers of most galaxies.
                      </p>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <h3 className="text-xl font-medium mb-2">The Universe</h3>
                      <p className="text-gray-400">
                        Current scientific understanding suggests the universe began with the Big Bang 
                        about 13.8 billion years ago. It has been expanding ever since, and this 
                        expansion is actually accelerating. The observable universe is about 93 billion 
                        light-years in diameter.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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

export default Learn;
