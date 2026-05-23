import type { StructureObj } from '../components/data/StructureObj';

/*
    Deducts wages from each structure's funds.
    Returns updated structures — does not mutate in place.
    Worker attraction mechanics are not implemented yet.
*/
export function stepWages(structures: StructureObj[]): StructureObj[] {
    return structures.map(s => {
        const wageCost = s.workers.reduce(
            (sum, w) => sum + w.wageOffer * w.number, 0
        );
        return { ...s, funds: s.funds - wageCost };
    });
}