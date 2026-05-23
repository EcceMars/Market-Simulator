/*
    This class substitutes the Workshop concept. A Structure is any structure that holds an inventoty and a collection of workers.
    This could be a workshop (a production building), but it could also be a house (a place that consumes products).
*/

import type { StructureType } from "./StructureType";
import type { Inventory } from "./Inventory";
import type { WorkerType } from "./WorkerType";

export interface WorkerInstance {
    type:WorkerType;
    number:number;
    wageOffer:number;
}

export interface Structure {
    template:StructureType
    level:number;
    funds:number;
    inventory:Inventory;
    workers:WorkerInstance[];
}