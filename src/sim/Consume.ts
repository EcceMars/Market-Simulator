import type { StructureObj } from '../components/data/StructureObj';
import type { SupplyPool }   from './Produce';
import type { NeedReport }   from './TickReport';
import type { NeedCategory } from '../components/data/Types';
import { Products }          from '../components/data/ResourceRegistry';

/*
    For each need category demanded by the Village's residents,
    find all products in the pool that fill that category and
    draw from them until the demand is met or supply runs out.

    Products are consumed in ascending base_value order — cheapest first —
    so the market naturally uses low-cost goods before expensive ones.
*/
export function stepConsume(village: StructureObj, pool: SupplyPool): NeedReport[] {
    // Aggregate total demand per category across all resident types.
    const demand = new Map<NeedCategory, { quantity: number; priority: number }>();

    for (const w of village.workers) {
        for (const need of w.type.needs) {
            const current = demand.get(need.category);
            if (current) {
                current.quantity += need.quantity * w.number;
                current.priority  = Math.min(current.priority, need.priority); // highest urgency wins
            } else {
                demand.set(need.category, {
                    quantity: need.quantity * w.number,
                    priority: need.priority,
                });
            }
        }
    }

    const reports: NeedReport[] = [];

    for (const [category, { quantity: demanded, priority }] of demand) {
        // Find all products in the pool that fill this category, cheapest first.
        const candidates = Object.values(Products)
            .filter(p => p.fills.includes(category) && (pool.get(p.name) ?? 0) > 0)
            .sort((a, b) => a.base_value - b.base_value);

        let remaining = demanded;

        for (const product of candidates) {
            if (remaining <= 0) break;
            const available = pool.get(product.name) ?? 0;
            const consumed  = Math.min(available, remaining);
            pool.set(product.name, available - consumed);
            remaining -= consumed;
        }

        const supplied = demanded - remaining;
        reports.push({ category, priority, demanded, supplied, met: remaining <= 0 });
    }

    return reports;
}