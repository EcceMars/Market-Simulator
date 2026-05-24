import type { StructureObj } from '../components/data/StructureObj';
 
export interface TaxSettings {
    incomeTaxRate:  number;   // Personal Income Tax — % of wage deducted from worker pay
    citRate:        number;   // Corporate Levy    — % of funds deducted from structure each tick
    assetTaxRate:   number;   // Asset Tax         — % of total funds held by structure
}
 
export interface TaxReport {
    incomeTaxTotal: number;
    citTotal:       number;
    assetTaxTotal:  number;
    total:          number;
}
 
/*
    Applies all three taxes. Returns updated structures and a report of total
    revenue collected, which is added to the player's treasury.
 
    - Corporate Levy:  taken from structure funds directly.
    - Asset Tax:       taken from structure funds based on current holdings.
    - Income Tax:      modelled as a reduction in effective wage (structure pays
                       the same, but worker receives less — represented as a fund
                       deduction equal to incomeTaxRate × total wages paid).
*/
export function stepTax(
    structures:  StructureObj[],
    taxes:       TaxSettings,
): { updated: StructureObj[]; report: TaxReport } {
    let incomeTaxTotal = 0;
    let citTotal       = 0;
    let assetTaxTotal  = 0;
 
    const updated = structures.map(s => {
        const totalWages = s.workers.reduce((sum, w) => sum + w.wageOffer * w.number, 0);
 
        const incomeTax = totalWages  * taxes.incomeTaxRate;
        const cit       = totalWages  * taxes.citRate;
        const assetTax  = s.funds     * taxes.assetTaxRate;
 
        incomeTaxTotal += incomeTax;
        citTotal       += cit;
        assetTaxTotal  += assetTax;
 
        return { ...s, funds: s.funds - incomeTax - cit - assetTax };
    });
 
    const total = incomeTaxTotal + citTotal + assetTaxTotal;
    return { updated, report: { incomeTaxTotal, citTotal, assetTaxTotal, total } };
}