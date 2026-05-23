import type { NeedCategory } from '../components/data/Types';

export interface NeedReport {
    category:  NeedCategory;
    priority:  number;
    demanded:  number;
    supplied:  number;
    met:       boolean;
}

export interface StructureReport {
    name:      string;
    produced:  boolean;     // had enough inputs to produce this tick
    funds:     number;      // funds remaining after wages
}

export interface TickReport {
    tick:             number;
    structureReports: StructureReport[];
    needsReport:      NeedReport[];
}