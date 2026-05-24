import type { StructureObj } from '../../data/StructureObj';
import type { MeanWages }    from '../../../sim/Tick';
import Panel from '../Panel';
import styles from './VillagePanel.module.css';

type Props = {
    structure:  StructureObj;
    meanWages:  MeanWages;
    taxRate:    number;         // income tax rate, for effective wage display
};

function VillagePanel({ structure, meanWages, taxRate }: Props) {
    // Only show resident types with at least 1 person.
    const residents = structure.workers.filter(w => w.number > 0);

    return (
        <Panel>
            <div className={styles.titleRow}>
                <p className={styles.title}>{structure.template.name}</p>
                <div className={styles.levelBadge}>
                    Lv. <span className={styles.levelBox}>{structure.level}</span>
                </div>
            </div>

            <p className={styles.sectionLabel}>Residents</p>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Strata</th>
                        <th>Count</th>
                        <th>Buying Power</th>
                    </tr>
                </thead>
                <tbody>
                    {residents.map(w => {
                        const meanWage      = meanWages[w.type.name] ?? 0;
                        const effectiveWage = meanWage * (1 - taxRate);
                        return (
                            <tr key={w.type.name}>
                                <td>
                                    <div className={styles.strataCell}>
                                        <span>{w.type.icon}</span>
                                        {w.type.name}
                                    </div>
                                </td>
                                <td>{w.number}</td>
                                <td className={styles.buyingPower}>
                                    △ {effectiveWage.toFixed(2)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className={styles.footer}>
                <span>
                    <span className={styles.footerLabel}>Approval</span>
                    <span className={styles.footerValue}>—</span>
                </span>
            </div>
        </Panel>
    );
}

export default VillagePanel;