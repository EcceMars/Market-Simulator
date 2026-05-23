import type { GenericData } from "./GenericData";
import type { Product } from "./Product";

export type Strata = 'LOW' | 'MID' | 'HIGH';

export interface Need {
    product:Product;
    quantity:number;
}

export interface WorkerType extends GenericData {
    strata:Strata;
    needs:Need[];
}