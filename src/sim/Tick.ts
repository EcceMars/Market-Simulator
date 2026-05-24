import type { StructureObj } from '../components/data/StructureObj';
import type { TickReport }   from './TickReport';
import type { TaxSettings }  from './Tax';
import { stepProduce }       from './Produce';
import { stepWages }         from './Wages';
import { stepConsume }       from './Consume';
import { stepTax }           from './Tax';

export type TickPhase = 'IDLE' | 'PRODUCING' | 'CONSUMING';

export interface MeanWages {
    [workerName: string]: number;
}

export interface GameState {
    tick:       number;
    phase:      TickPhase;
    treasury:   number;
    village:    StructureObj;
    industries: StructureObj[];
    taxes:      TaxSettings;
    meanWages:  MeanWages;
    history:    TickReport[];
}

// Intermediate state carrying the supply pool between phases.
export type GameStateWithPool = GameState & { _pool: Record<string, number> };

/*
    Weighted mean wage per worker type across all industries.
    Used by VillagePanel to show resident buying power after income tax.
*/
export function computeMeanWages(industries: StructureObj[]): MeanWages {
    const totals: Record<string, { weightedSum: number; count: number }> = {};

    for (const s of industries) {
        for (const w of s.workers) {
            if (!totals[w.type.name]) {
                totals[w.type.name] = { weightedSum: 0, count: 0 };
            }
            totals[w.type.name].weightedSum += w.wageOffer * w.number;
            totals[w.type.name].count       += w.number;
        }
    }

    const result: MeanWages = {};
    for (const [name, { weightedSum, count }] of Object.entries(totals)) {
        result[name] = count > 0 ? weightedSum / count : 0;
    }
    return result;
}

/*
    Phase 1 — IDLE → PRODUCING.
    Industries produce; outputs are stored in inventories and pool.
*/
export function applyProduce(state: GameState): GameStateWithPool {
    const pool = new Map<string, number>();
    const structureReports = stepProduce(state.industries, pool);

    // Reflect produced outputs in each industry's inventory.
    const updatedIndustries = state.industries.map((s, i) => {
        const entries = s.template.outputs
            .map(slot => ({
                product:  slot.product,
                quantity: structureReports[i].produced ? slot.quantity : 0,
            }))
            .filter(e => e.quantity > 0);
        return { ...s, inventory: { entries } };
    });

    return {
        ...state,
        phase:      'PRODUCING',
        industries: updatedIndustries,
        _pool:      Object.fromEntries(pool),
    };
}

/*
    Phase 2 — PRODUCING → CONSUMING.
    Wages deducted, taxes collected, Village consumes, tick finalised.
*/
export function applyConsume(state: GameStateWithPool): GameState {
    const pool = new Map<string, number>(Object.entries(state._pool));

    const afterWages                              = stepWages(state.industries);
    const { updated: afterTax, report: taxReport } = stepTax(afterWages, state.taxes);
    const needsReport                             = stepConsume(state.village, pool);
    const meanWages                               = computeMeanWages(afterTax);
    const publicDrain                             = computePublicDrain(state);

    const report: TickReport = {
        tick: state.tick + 1,
        structureReports: afterTax.map(s => ({
            name:     s.template.name,
            produced: true,
            funds:    s.funds,
        })),
        needsReport,
        taxReport,
    };

    const { _pool, ...cleanState } = state;

    return {
        ...cleanState,
        tick:       state.tick + 1,
        phase:      'IDLE',
        treasury:   state.treasury + taxReport.total - publicDrain,
        industries: afterTax,
        meanWages,
        history:    [...state.history, report],
    };
}

/*
    Sum of wage costs for all public structures (Wells).
    These are paid from the treasury rather than structure funds.
*/
function computePublicDrain(state: GameState): number {
    return state.industries
        .filter(s => s.template.name === 'Well')
        .reduce((sum, s) =>
            sum + s.workers.reduce(
                (w, worker) => w + worker.wageOffer * worker.number, 0
            ), 0
        );
}