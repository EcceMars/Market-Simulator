/*
    Template for all product types.
*/
import type { GenericData } from "./GenericData";

type AmbCategory = 'FOOD' | 'MATERIAL';

export interface ProductRes extends GenericData {
    category:AmbCategory;       // Some products are considered of the same category: e.g. both wheat and meat are FOOD and may be procured to satisfy the same need.
    base_value:number;          // The higher this is the more attractive this product is.
    transport_cost:number;      // The harder to transport or keep fresh, the higher this is.
}