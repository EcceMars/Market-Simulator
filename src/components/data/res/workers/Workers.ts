import type { WorkerRes } from '../../WorkerRes';

export const peasant: WorkerRes = {
    name: 'Peasant', icon: '👩‍🌾',
    description: 'The lowest working class. Provides unskilled labour.',
    strata: 'LOW',
    needs: [
        { category: 'FOOD',  quantity: 2, priority: 1 },
        { category: 'DRINK', quantity: 2, priority: 1 },
    ],
};

export const farmer: WorkerRes = {
    name: 'Farmer', icon: '🤠',
    description: 'A skilled agricultural worker. Oversees farm output.',
    strata: 'MID',
    needs: [
        { category: 'FOOD',    quantity: 2, priority: 1 },
        { category: 'DRINK',   quantity: 2, priority: 1 },
        { category: 'COMFORT', quantity: 1, priority: 2 },
    ],
};

export const clerk: WorkerRes = {
    name: 'Clerk', icon: '🖊️',
    description: 'An educated worker who handles trade and administration.',
    strata: 'MID',
    needs: [
        { category: 'FOOD',     quantity: 2, priority: 1 },
        { category: 'DRINK',    quantity: 2, priority: 1 },
        { category: 'COMFORT',  quantity: 1, priority: 2 },
        { category: 'CLOTHING', quantity: 1, priority: 2 },
    ],
};

export const soldier: WorkerRes = {
    name: 'Soldier', icon: '⚔️',
    description: 'A garrison troop. Maintains order and defends the settlement.',
    strata: 'MID',
    needs: [
        { category: 'FOOD',    quantity: 3, priority: 1 },
        { category: 'DRINK',   quantity: 2, priority: 1 },
        { category: 'COMFORT', quantity: 1, priority: 2 },
    ],
};

export const aristocrat: WorkerRes = {
    name: 'Aristocrat', icon: '👑',
    description: 'The ruling class. Generates strong demand for luxury goods.',
    strata: 'HIGH',
    needs: [
        { category: 'FOOD',    quantity: 3, priority: 1 },
        { category: 'DRINK',   quantity: 2, priority: 1 },
        { category: 'COMFORT', quantity: 2, priority: 2 },
        { category: 'LUXURY',  quantity: 2, priority: 3 },
    ],
};