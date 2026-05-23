import type { GenericData }                  from './GenericData';
import type { Strata, NeedCategory, NeedPriority } from './Types';
 
export interface Need {
    category: NeedCategory;
    quantity: number;
    priority: NeedPriority;
}
 
export interface WorkerRes extends GenericData {
    strata: Strata;
    needs:  Need[];
}