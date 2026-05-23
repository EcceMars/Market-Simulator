import type { ProductRes } from '../../ProductRes';

export const wheat: ProductRes = {
    name: 'Wheat', icon: '🌾',
    description: 'A staple grain crop. The backbone of any agrarian economy.',
    kind: 'GOOD', fills: ['FOOD'],
    base_value: 1.0, transport_cost: 1.2,
};

export const fish: ProductRes = {
    name: 'Fish', icon: '🐟',
    description: 'Fresh-caught fish. A cheap but perishable food source.',
    kind: 'GOOD', fills: ['FOOD'],
    base_value: 1.5, transport_cost: 1.9,
};

export const meat: ProductRes = {
    name: 'Meat', icon: '🥩',
    description: 'Butchered livestock. A richer food source than grain or fish.',
    kind: 'GOOD', fills: ['FOOD', 'COMFORT'],
    base_value: 3.5, transport_cost: 1.7,
};

export const water: ProductRes = {
    name: 'Water', icon: '💧',
    description: 'Fresh water. An essential resource for all life. Sourced locally from Wells.',
    kind: 'SERVICE', fills: ['DRINK'],
    base_value: 0.5, transport_cost: 0,
};

export const beer: ProductRes = {
    name: 'Beer', icon: '🍺',
    description: 'A fermented grain beverage. Popular among all strata.',
    kind: 'GOOD', fills: ['DRINK', 'COMFORT'],
    base_value: 2.5, transport_cost: 1.4,
};

export const wine: ProductRes = {
    name: 'Wine', icon: '🍷',
    description: 'Fermented grape drink. Preferred by upper strata; serves as a luxury drink.',
    kind: 'GOOD', fills: ['DRINK', 'COMFORT', 'LUXURY'],
    base_value: 4.0, transport_cost: 1.3,
};

export const wool: ProductRes = {
    name: 'Wool', icon: '🐑',
    description: 'Raw wool shorn from sheep. Processed into cloth at a Weaver\'s Shop.',
    kind: 'GOOD', fills: [],
    base_value: 2.0, transport_cost: 1.1,
};

export const cloth: ProductRes = {
    name: 'Cloth', icon: '🧵',
    description: 'Woven textile used for clothing and furnishings.',
    kind: 'GOOD', fills: ['CLOTHING'],
    base_value: 3.0, transport_cost: 1.1,
};

export const lumber: ProductRes = {
    name: 'Lumber', icon: '🪵',
    description: 'Cut and prepared timber. Used in construction and crafting.',
    kind: 'GOOD', fills: ['WARMTH'],
    base_value: 2.0, transport_cost: 1.6,
};

export const iron: ProductRes = {
    name: 'Iron', icon: '⛏️',
    description: 'Raw iron ore, smelted into a workable metal.',
    kind: 'GOOD', fills: [],
    base_value: 4.0, transport_cost: 1.8,
};

export const tools: ProductRes = {
    name: 'Tools', icon: '🔨',
    description: 'Iron tools for farming, mining, and construction.',
    kind: 'GOOD', fills: [],
    base_value: 5.0, transport_cost: 1.5,
};

export const furniture: ProductRes = {
    name: 'Furniture', icon: '🪑',
    description: 'Crafted wooden furniture. A luxury good sought by upper strata.',
    kind: 'GOOD', fills: ['LUXURY'],
    base_value: 6.0, transport_cost: 1.7,
};