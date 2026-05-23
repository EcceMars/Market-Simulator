/*
    Template for all worker types.
*/
import type { GenericData } from "./GenericData";
import type { ProductRes } from "./ProductRes";

export type Strata = 'LOW' | 'MID' | 'HIGH';

export interface Need {
    product:ProductRes;
    quantity:number;
}

export interface WorkerRes extends GenericData {
    strata:Strata;
    needs:Need[];
}