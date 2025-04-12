
export const PLANET_DATA = [
  {
    name: "Mercury",
    size: 0.5,
    textureMap: "/textures/mercury.jpg",
    position: [4, 0, 0] as [number, number, number],
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
    position: [7, 0, 0] as [number, number, number],
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
    position: [10, 0, 0] as [number, number, number],
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
    position: [13, 0, 0] as [number, number, number],
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
    position: [18, 0, 0] as [number, number, number],
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
    position: [23, 0, 0] as [number, number, number],
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
    position: [28, 0, 0] as [number, number, number],
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
    position: [32, 0, 0] as [number, number, number],
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
