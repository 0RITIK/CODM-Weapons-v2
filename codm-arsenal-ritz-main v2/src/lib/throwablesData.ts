export interface Throwable {
  id: string;
  name: string;
  description: string;
  damage: number;
  range: number;
  cooldown: number;
  type: "Lethal" | "Tactical" | "Melee";
  image: string;
}

export const throwablesData: Throwable[] = [
  {
    id: "combat-axe",
    name: "Combat Axe",
    description: "High-damage melee weapon that can be thrown for instant elimination",
    damage: 100,
    range: 8,
    cooldown: 45,
    type: "Melee",
    image: "/src/assets/throwables/combat-axe.jpg"
  },
  {
    id: "frag-grenade",
    name: "Frag Grenade",
    description: "Classic explosive grenade with delayed detonation",
    damage: 95,
    range: 6,
    cooldown: 30,
    type: "Lethal",
    image: "/src/assets/throwables/frag-grenade.jpg"
  },
  {
    id: "sticky-grenade",
    name: "Sticky Grenade",
    description: "Adhesive explosive that sticks to surfaces and enemies",
    damage: 90,
    range: 5,
    cooldown: 35,
    type: "Lethal",
    image: "/src/assets/throwables/sticky-grenade.jpg"
  },
  {
    id: "molotov-cocktail",
    name: "Molotov Cocktail",
    description: "Incendiary weapon that creates area denial fire damage",
    damage: 75,
    range: 7,
    cooldown: 25,
    type: "Lethal",
    image: "/src/assets/throwables/molotov-cocktail.jpg"
  },
  {
    id: "trip-mine",
    name: "Trip Mine",
    description: "Proximity explosive that detonates when enemies approach",
    damage: 100,
    range: 4,
    cooldown: 40,
    type: "Lethal",
    image: "/src/assets/throwables/trip-mine.jpg"
  },
  {
    id: "concussion-grenade",
    name: "Concussion Grenade",
    description: "Tactical grenade that slows and disorients enemies",
    damage: 0,
    range: 8,
    cooldown: 20,
    type: "Tactical",
    image: "/src/assets/throwables/concussion-grenade.jpg"
  },
  {
    id: "flashbang-grenade",
    name: "Flashbang Grenade",
    description: "Blinds and deafens enemies within blast radius",
    damage: 0,
    range: 7,
    cooldown: 22,
    type: "Tactical",
    image: "/src/assets/throwables/flashbang-grenade.jpg"
  },
  {
    id: "smoke-grenade",
    name: "Smoke Grenade",
    description: "Creates concealing smoke cloud for cover",
    damage: 0,
    range: 10,
    cooldown: 18,
    type: "Tactical",
    image: "/src/assets/throwables/smoke-grenade.jpg"
  },
  {
    id: "emp",
    name: "EMP Grenade",
    description: "Disables electronics and equipment in blast radius",
    damage: 0,
    range: 9,
    cooldown: 28,
    type: "Tactical",
    image: "/src/assets/throwables/emp.jpg"
  },
  {
    id: "cryo-bomb",
    name: "Cryo Bomb",
    description: "Freezes enemies and slows movement speed",
    damage: 30,
    range: 6,
    cooldown: 32,
    type: "Tactical",
    image: "/src/assets/throwables/cryo-bomb.jpg"
  }
];

export const getThrowablesByType = () => {
  return throwablesData.reduce((acc, throwable) => {
    if (!acc[throwable.type]) {
      acc[throwable.type] = [];
    }
    acc[throwable.type].push(throwable);
    return acc;
  }, {} as Record<string, Throwable[]>);
};