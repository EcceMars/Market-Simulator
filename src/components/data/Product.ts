/*
    Later on, a global market system will attempt
    to buy products based on their 'ambiguous' category (there
    is demand for food, so any food product will be considered).

    A food item with a higher base value will have a higher attractivensess
    to the market, but a lower number of people will be able to buy it.

    More types may be added: for different types of wood, for example: bamboo, oak, etc.
*/
import type { GenericData } from "./GenericData";

type AmbCategory = 'FOOD' | 'MATERIAL';

export interface Product extends GenericData {
    category:AmbCategory;
    base_value:number;
    transport_cost:number;      // The harder to transport or keep fresh, the higher this is.
}