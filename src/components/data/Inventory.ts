import type { ProductRes } from "./ProductRes";

export interface InventoryEntry {
    product:ProductRes;
    quantity:number;
}

export interface Inventory {
    entries:InventoryEntry[];
}