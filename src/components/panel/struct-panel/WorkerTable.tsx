import { useState } from 'react';
import type { Structure } from '../../data/Structure';
import Panel from '../Panel';
import WorkerTable from './WorkerTable';
import InvPanel from '../inventory-panel/InvPanel';
import styles from './StructPanel.module.css';

type Props = {
  structure: Structure;
};

function clamp(value: number, min: number, max: number = Infinity): number {
  return Math.min(Math.max(value, min), max);
}

function StructPanel({ structure }: Props) {
  const [data, setData] = useState<Structure>(structure);

  function handleWageChange(workerName: string, delta: number) {
    setData(prev => ({
      ...prev,
      workers: prev.workers.map(w =>
        w.name === workerName
          ? { ...w, wage: clamp(parseFloat((w.wage + delta).toFixed(1)), 0) }
          : w
      )
    }));
  }

  const totalWageCost = data.workers.reduce(
    (sum, w) => sum + w.wage * w.number, 0
  );
  const profitability = data.funds - totalWageCost;

  return (
    <div className={styles.scene}>
      <Panel>
        <p className={styles.title}>{data.name}</p>
        <p className={styles.sectionLabel}>Workforce</p>
        <WorkerTable
          workers={data.workers}
          onWageChange={handleWageChange}
        />
        <div className={styles.footer}>
          <span className={styles.footerItem}>
            <span className={styles.footerLabel}>Funds</span>
            <span className={styles.footerValue}>△ {data.funds.toFixed(1)}</span>
          </span>
          <span className={styles.footerItem}>
            <span className={styles.footerLabel}>Costs</span>
            <span className={styles.footerValue}>△ {totalWageCost.toFixed(1)}</span>
          </span>
          <span className={styles.footerItem}>
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

      <Panel>
        <p className={styles.title}>Inventory</p>
        <InvPanel inventory={data.inventory} />
      </Panel>
    </div>
  );
}

export default StructPanel;