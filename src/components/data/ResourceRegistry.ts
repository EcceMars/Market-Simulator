import type { ProductRes }   from './ProductRes';
import type { WorkerRes }    from './WorkerRes';
import type { StructureRes } from './StructureRes';

import {
    wheat, fish, meat, water, beer, wine,
    wool, cloth, lumber, iron, tools, furniture,
} from './res/products/Products';

import {
    peasant, farmer, clerk, soldier, aristocrat,
} from './res/workers/Workers';

import {
    pasture, wheatFarm, animalRanch, huntersHut, wharf,
    alehouse, vineyard, weaversShop, loggingCamp, ironMine,
    carpenterWorkshop, well, village,
} from './res/structures/Structures';

export const Products: Record<string, ProductRes> = {
    wheat, fish, meat, water, beer, wine,
    wool, cloth, lumber, iron, tools, furniture,
};

export const Workers: Record<string, WorkerRes> = {
    peasant, farmer, clerk, soldier, aristocrat,
};

export const Structures: Record<string, StructureRes> = {
    pasture, wheatFarm, animalRanch, huntersHut, wharf,
    alehouse, vineyard, weaversShop, loggingCamp, ironMine,
    carpenterWorkshop, well, village,
};