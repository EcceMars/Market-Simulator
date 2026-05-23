import type { StructureObj } from '../components/data/StructureObj';
import type { TickReport }   from './TickReport';
import { stepProduce }       from './Produce';
import { stepWages }         from './Wages';
import { stepConsume }       from './Consume';

export interface GameState {
    tick:       number;
    village:    StructureObj;
    industries: StructureObj[];     // all non-Village structures
    history:    TickReport[];
}

export function runTick(state: GameState): GameState {
    const pool = new Map<string, number>();

    // 1. Industries produce — outputs go into the shared supply pool.
    const structureReports = stepProduce(state.industries, pool);

    // 2. Industries pay wages — returns updated structures.
    const updatedIndustries = stepWages(state.industries);

    // 3. Village consumes from pool — needs checked against supply.
    const needsReport = stepConsume(state.village, pool);

    const report: TickReport = {
        tick: state.tick + 1,
        structureReports,
        needsReport,
    };

    return {
        tick:       state.tick + 1,
        village:    state.village,
        industries: updatedIndustries,
        history:    [...state.history, report],
    };
}