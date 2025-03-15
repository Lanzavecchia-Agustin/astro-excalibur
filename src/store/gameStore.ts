// src/store/gameStore.ts
import { create } from 'zustand';

// ----- Types and Interfaces -----

export type SkillNature = 'magic' | 'dark' | 'light' | 'physical' | 'spiritual';

export interface Skill {
  name: string;
  description: string;
  nature: SkillNature;
  effect: 'damage' | 'heal' | 'buff' | 'debuff';
  cooldown: number; // in seconds
  usesPerCombat: number;
}

export interface Stats {
  hp: number;
  strength: number;
  intelligence: number;
  dexterity: number;
  luck: number;
}

export interface Entity {
  id: string;
  name: string;
  description?: string;
  stats: Stats;
  skills: Skill[];
  types: SkillNature[];  // Each entity can have one or two types
  items: string[];
  achievements: string[];
}

export interface Inventory {
  items: string[];
}

export interface Player {
  id: string;
  name: string;
  gold: number;
  inventory: Inventory;
  entities: Entity[];
}

export interface GameState {
  player: Player;
}

export interface GameActions {
  updatePlayer: (playerUpdate: Partial<Player>) => void;
  addEntity: (entity: Entity) => void;
  updateEntity: (entityId: string, update: Partial<Entity>) => void;
  removeEntity: (entityId: string) => void;
}

// ----- Helper Data for Random Generation -----

// Available natures for skills and entities
const availableNatures: SkillNature[] = ['magic', 'dark', 'light', 'physical', 'spiritual'];

// Create a pool of skills (5 per nature)
const availableSkills: Skill[] = [];
availableNatures.forEach((nature) => {
  for (let i = 1; i <= 5; i++) {
    availableSkills.push({
      name: `${nature.charAt(0).toUpperCase() + nature.slice(1)} Skill ${i}`,
      description: `A ${nature} skill number ${i}.`,
      nature,
      effect: 'damage', // All skills do damage in this example
      cooldown: 5,
      usesPerCombat: 3,
    });
  }
});

// List of 20 real item names (you can update these as needed)
const availableItems: string[] = [
  "Potion",
  "Super Potion",
  "Hyper Potion",
  "Max Potion",
  "Antidote",
  "Paralyze Heal",
  "Full Restore",
  "Revive",
  "Rare Candy",
  "Elixir",
  "Ether",
  "Max Ether",
  "Protein",
  "Iron",
  "Calcium",
  "Carbos",
  "HP Up",
  "PP Up",
  "Guard Spec.",
  "Dire Hit"
];

// List of 16 entity names for flavor
const entityNames: string[] = [
  "Flame Wyvern",
  "Aqua Serpent",
  "Terra Golem",
  "Zephyr Hawk",
  "Shadow Panther",
  "Mystic Owl",
  "Crystal Deer",
  "Electric Eel",
  "Ironclad Beetle",
  "Golden Phoenix",
  "Emerald Dragon",
  "Sapphire Griffin",
  "Ruby Tiger",
  "Onyx Wolf",
  "Silver Fox",
  "Platinum Bear"
];

// Helper function to generate a random entity
const createRandomEntity = (id: number): Entity => {
  const name = entityNames[id - 1] || `Entity ${id}`;
  
  // Decide if the entity has 1 or 2 types
  const numTypes = Math.random() < 0.5 ? 1 : 2;
  const types: SkillNature[] = [];
  while (types.length < numTypes) {
    const randomType = availableNatures[Math.floor(Math.random() * availableNatures.length)];
    if (!types.includes(randomType)) {
      types.push(randomType);
    }
  }

  // Filter skills that match the entity's types
  const matchingSkills = availableSkills.filter(skill => types.includes(skill.nature));
  const pool = matchingSkills.length >= 4 ? [...matchingSkills] : [...availableSkills];
  const entitySkills: Skill[] = [];
  while (entitySkills.length < 4 && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    entitySkills.push(pool[index]);
    pool.splice(index, 1);
  }

  // Assign 3 random items from availableItems
  const entityItems: string[] = [];
  const itemsPool = [...availableItems];
  while (entityItems.length < 3 && itemsPool.length > 0) {
    const index = Math.floor(Math.random() * itemsPool.length);
    entityItems.push(itemsPool[index]);
    itemsPool.splice(index, 1);
  }

  // Generate random stats
  const stats: Stats = {
    hp: Math.floor(Math.random() * 100) + 50,           // 50 - 150
    strength: Math.floor(Math.random() * 20) + 5,         // 5 - 25
    intelligence: Math.floor(Math.random() * 20) + 5,
    dexterity: Math.floor(Math.random() * 20) + 5,
    luck: Math.floor(Math.random() * 10) + 1,             // 1 - 10
  };

  return {
    id: `entity-${id}`,
    name,
    description: `A fierce ${name} with unique abilities.`,
    stats,
    skills: entitySkills,
    types,
    items: entityItems,
    achievements: [],
  };
};

// Generate 16 random entities
const allEntities: Entity[] = [];
for (let i = 1; i <= 16; i++) {
  allEntities.push(createRandomEntity(i));
}

// Randomly select 4 entities for the player
const playerEntities: Entity[] = [];
const entityPool = [...allEntities];
while (playerEntities.length < 4 && entityPool.length > 0) {
  const index = Math.floor(Math.random() * entityPool.length);
  playerEntities.push(entityPool[index]);
  entityPool.splice(index, 1);
}

// Randomly select 4 items for the player's inventory
const playerItems: string[] = [];
const itemsPool = [...availableItems];
while (playerItems.length < 4 && itemsPool.length > 0) {
  const index = Math.floor(Math.random() * itemsPool.length);
  playerItems.push(itemsPool[index]);
  itemsPool.splice(index, 1);
}

// ----- Zustand Store Initialization -----

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  player: {
    id: 'player1',
    name: 'Player One',
    gold: 100,
    inventory: {
      items: playerItems, // Assign 4 random items
    },
    entities: playerEntities, // Assign 4 random entities
  },
  updatePlayer: (playerUpdate) =>
    set((state) => ({
      player: {
        ...state.player,
        ...playerUpdate,
      },
    })),
  addEntity: (entity) =>
    set((state) => ({
      player: {
        ...state.player,
        entities: [...state.player.entities, entity],
      },
    })),
  updateEntity: (entityId, update) =>
    set((state) => ({
      player: {
        ...state.player,
        entities: state.player.entities.map((entity) =>
          entity.id === entityId ? { ...entity, ...update } : entity
        ),
      },
    })),
  removeEntity: (entityId) =>
    set((state) => ({
      player: {
        ...state.player,
        entities: state.player.entities.filter(
          (entity) => entity.id !== entityId
        ),
      },
    })),
}));
