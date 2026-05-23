import type { Product } from "./Product";

export interface InventoryEntry {
    product:Product;
    quantity:number;
}

export interface Inventory {
    entries:InventoryEntry[];
}