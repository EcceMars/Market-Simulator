/*
    Template for all structures.
*/
import type { GenericData } from "./GenericData";
import type { WorkerRes } from "./WorkerRes";
import type { ProductRes } from "./ProductRes";

export interface WorkerSlot {
    workerType:WorkerRes;
    number:number;
}
    
export interface ProductSlot {
    product:ProductRes;
    quantity:number;
}

export interface StructureRes extends GenericData {
    workforce:WorkerSlot[];
    inputs:ProductSlot[];
    outputs:ProductSlot[];
}