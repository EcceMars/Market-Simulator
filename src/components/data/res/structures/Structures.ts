import type { StructureRes } from '../../StructureRes';
import { wheat, fish, meat, water, beer, wine, wool, cloth, lumber, iron, tools, furniture } from '../products/Products';
import { peasant, farmer, clerk, soldier, aristocrat } from '../workers/Workers';

export const pasture: StructureRes = {
    name: 'Pasture', icon: '🌿',
    description: 'Primitive subsistence land. Produces a small amount of food with no inputs. The starting point before proper industry.',
    workforce: [
        { workerType: peasant, number: 4 },
    ],
    inputs: [],
    outputs: [
        { product: meat,  quantity: 2 },
        { product: wheat, quantity: 2 },
    ],
};

export const wheatFarm: StructureRes = {
    name: 'Wheat Farm', icon: '🌾',
    description: 'A small farm that cultivates and harvests wheat.',
    workforce: [
        { workerType: peasant, number: 8 },
        { workerType: farmer,  number: 2 },
    ],
    inputs: [],
    outputs: [{ product: wheat, quantity: 10 }],
};

export const animalRanch: StructureRes = {
    name: 'Animal Ranch', icon: '🐄',
    description: 'Raises livestock for meat and wool.',
    workforce: [
        { workerType: peasant, number: 6 },
        { workerType: farmer,  number: 2 },
    ],
    inputs: [],
    outputs: [
        { product: meat, quantity: 6 },
        { product: wool, quantity: 4 },
    ],
};

export const huntersHut: StructureRes = {
    name: "Hunter's Hut", icon: '🏹',
    description: 'Hunters supply meat without requiring livestock.',
    workforce: [
        { workerType: peasant, number: 3 },
    ],
    inputs: [],
    outputs: [{ product: meat, quantity: 3 }],
};

export const wharf: StructureRes = {
    name: 'Wharf', icon: '⚓',
    description: 'A fishing dock that supplies fresh fish.',
    workforce: [
        { workerType: peasant, number: 5 },
        { workerType: clerk,   number: 1 },
    ],
    inputs: [],
    outputs: [{ product: fish, quantity: 7 }],
};

export const alehouse: StructureRes = {
    name: 'Alehouse', icon: '🍻',
    description: 'Brews and sells beer.',
    workforce: [
        { workerType: peasant, number: 4 },
        { workerType: clerk,   number: 1 },
    ],
    inputs:  [{ product: wheat, quantity: 6 }],
    outputs: [{ product: beer,  quantity: 5 }],
};

export const vineyard: StructureRes = {
    name: 'Vineyard', icon: '🍇',
    description: 'Cultivates grapes and produces wine. Serves MID and HIGH strata.',
    workforce: [
        { workerType: peasant, number: 5 },
        { workerType: clerk,   number: 1 },
    ],
    inputs:  [],
    outputs: [{ product: wine, quantity: 4 }],
};

export const weaversShop: StructureRes = {
    name: "Weaver's Shop", icon: '🧶',
    description: 'Processes raw wool into cloth.',
    workforce: [
        { workerType: peasant, number: 4 },
        { workerType: clerk,   number: 1 },
    ],
    inputs:  [{ product: wool,  quantity: 6 }],
    outputs: [{ product: cloth, quantity: 5 }],
};

export const loggingCamp: StructureRes = {
    name: 'Logging Camp', icon: '🌲',
    description: 'Fells and processes timber from nearby forests.',
    workforce: [
        { workerType: peasant, number: 6 },
        { workerType: farmer,  number: 1 },
    ],
    inputs:  [],
    outputs: [{ product: lumber, quantity: 7 }],
};

export const ironMine: StructureRes = {
    name: 'Iron Mine', icon: '⛏️',
    description: 'Extracts raw iron ore from the earth.',
    workforce: [
        { workerType: peasant, number: 8 },
        { workerType: clerk,   number: 1 },
    ],
    inputs:  [],
    outputs: [{ product: iron, quantity: 6 }],
};

export const carpenterWorkshop: StructureRes = {
    name: "Carpenter's Workshop", icon: '🪚',
    description: 'Crafts lumber into furniture and tools.',
    workforce: [
        { workerType: peasant, number: 4 },
        { workerType: clerk,   number: 1 },
    ],
    inputs:  [{ product: lumber,    quantity: 8 }],
    outputs: [
        { product: furniture, quantity: 2 },
        { product: tools,     quantity: 3 },
    ],
};

// ── Special Structures ────────────────────────────────────────────────────────

export const well: StructureRes = {
    name: 'Well', icon: '🪣',
    description: 'Draws fresh water from the ground. Essential for every settlement.',
    workforce: [
        { workerType: peasant, number: 1 },
    ],
    inputs:  [],
    outputs: [{ product: water, quantity: 10 }],
};

// SPECIAL: Village outputs are derived from population needs at runtime.
// inputs/outputs are intentionally empty — the simulation layer handles consumption.
export const village: StructureRes = {
    name: 'Village', icon: '🏘️',
    description: 'A settlement centre. Houses residents and drives local demand.',
    workforce: [
        { workerType: peasant,    number: 10 },
        { workerType: clerk,      number: 0  },
        { workerType: soldier,    number: 0  },
        { workerType: aristocrat, number: 0  },
    ],
    inputs:  [],
    outputs: [],
};