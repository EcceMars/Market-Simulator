import type { GenericData }                from './GenericData';
import type { ProductKind, NeedCategory }  from './Types';

export interface ProductRes extends GenericData {
    kind:           ProductKind;
    fills:          NeedCategory[];  // need slots this product can satisfy
    base_value:     number;
    transport_cost: number;          // ignored if kind === 'SERVICE'
}