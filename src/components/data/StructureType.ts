import type { GenericData } from "./GenericData";
import type { WorkerType } from "./WorkerType";
import type { Product } from "./Product";

export interface WorkerSlot {
    workerType:WorkerType;
    number:number;
}

export interface ProductSlot {
    product:Product;
    quantity:number;
}

export interface StructureType extends GenericData {
    workforce:WorkerSlot[];
    inputs:ProductSlot[];
    outputs:ProductSlot[];
}