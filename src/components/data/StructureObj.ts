/*
    This class is the actual object that uses StructureRes as a template.
*/
import type { StructureRes } from "./StructureRes";
import type { Inventory } from "./Inventory";
import type { WorkerRes } from "./WorkerRes";

// TASK: should this be moved to its own file? Is this the WorkerObj?
export interface WorkerInstance {
    type:WorkerRes;
    number:number;
    wageOffer:number;
}

export interface StructureObj {
    template:StructureRes;
    level:number;
    funds:number;
    inventory:Inventory;
    workers:WorkerInstance[];
}