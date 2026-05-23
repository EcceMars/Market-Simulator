import type { StructureObj }    from '../components/data/StructureObj';
import type { StructureReport } from './TickReport';

/*
    Supply pool: a flat map of productName → total quantity available this tick.
    Industries write into it; the Village reads from it during consumption.
    This is a stand-in for a proper market/logistics layer later.
*/
export type SupplyPool = Map<string, number>;

export function stepProduce(
    structures: StructureObj[],
    pool:       SupplyPool,
): StructureReport[] {
    const reports: StructureReport[] = [];

    for (const s of structures) {
        // Check inputs are available in the pool.
        const canProduce = s.template.inputs.every(
            slot => (pool.get(slot.product.name) ?? 0) >= slot.quantity
        );

        if (canProduce) {
            // Consume inputs from pool.
            for (const slot of s.template.inputs) {
                pool.set(slot.product.name, (pool.get(slot.product.name) ?? 0) - slot.quantity);
            }
            // Emit outputs into pool.
            for (const slot of s.template.outputs) {
                pool.set(slot.product.name, (pool.get(slot.product.name) ?? 0) + slot.quantity);
            }
        }

        reports.push({ name: s.template.name, produced: canProduce, funds: s.funds });
    }

    return reports;
}