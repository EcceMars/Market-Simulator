import { useState } from 'react';
import type { StructureObj } from '../../data/StructureObj';
import Panel from '../Panel';
import WorkerTable from './WorkerTable';
import InvPanel from '../inventory-panel/InvPanel';
import styles from './IndustryPanel.module.css';

type Props = {
    structure: StructureObj;
};

function clamp(value: number, min: number, max: number = Infinity): number {
    return Math.min(Math.max(value, min), max);
}

function IndustryPanel({ structure }: Props) {
    const [data, setData] = useState<StructureObj>(structure);

    function handleWageChange(workerName: string, delta: number) {
        setData(prev => ({
            ...prev,
            workers: prev.workers.map(w =>
                w.type.name === workerName
                    ? { ...w, wageOffer: clamp(parseFloat((w.wageOffer + delta).toFixed(1)), 0) }
                    : w
            ),
        }));
    }

    const totalWageCost  = data.workers.reduce((sum, w) => sum + w.wageOffer * w.number, 0);
    const profitability  = data.funds - totalWageCost;

    return (
        <div className={styles.scene}>
            {/* Left — main panel */}
            <Panel>
                <div className={styles.titleRow}>
                    <p className={styles.title}>{data.template.name}</p>
                    <div className={styles.levelBadge}>
                        Lv. <span className={styles.levelBox}>{data.level}</span>
                    </div>
                </div>
                <p className={styles.sectionLabel}>Workforce</p>
                <WorkerTable workers={data.workers} onWageChange={handleWageChange} />
                <div className={styles.footer}>
                    <span>
                        <span className={styles.footerLabel}>Funds</span>
                        <span className={styles.footerValue}>△ {data.funds.toFixed(1)}</span>
                    </span>
                    <span>
                        <span className={styles.footerLabel}>Costs</span>
                        <span className={styles.footerValue}>△ {totalWageCost.toFixed(1)}</span>
                    </span>
                    <span>
                        <span className={styles.footerLabel}>Balance</span>
                        <span className={profitability >= 0 ? styles.positive : styles.negative}>
                            △ {profitability.toFixed(1)}
                        </span>
                    </span>
                </div>
            </Panel>

            <div className={styles.connector}>
                <div className={styles.dot} />
                <div className={styles.line} />
                <div className={styles.dot} />
            </div>

            {/* Right — detail slot (Inventory by default) */}
            <Panel>
                <p className={styles.sectionLabel}>Inventory</p>
                <InvPanel inventory={data.inventory} />
            </Panel>
        </div>
    );
}

export default IndustryPanel;