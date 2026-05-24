import type { NeedCategory } from '../components/data/Types';
import type { TaxReport }    from './Tax';

export interface NeedReport {
    category:  NeedCategory;
    priority:  number;
    demanded:  number;
    supplied:  number;
    met:       boolean;
}

export interface StructureReport {
    name:      string;
    produced:  boolean;
    funds:     number;
}

export interface TickReport {
    tick:             number;
    structureReports: StructureReport[];
    needsReport:      NeedReport[];
    taxReport:        TaxReport;
}