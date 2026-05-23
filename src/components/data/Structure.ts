/*
    This class substitutes the Workshop concept. A Structure is any structure that holds an inventoty and a collection of workers.
    This could be a workshop (a production building), but it could also be a house (a place that consumes products).
*/

import type { Inventory } from "./Inventory";
import type { Worker } from "./Worker";

export interface Structure {
    name:string;
    funds:number;
    inventory:Inventory;
    workers:Worker[];
}