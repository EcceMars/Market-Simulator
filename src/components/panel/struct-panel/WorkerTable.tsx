import type { WorkerType } from '../../data/WorkerType';
import StepButton from '../../buttons/StepButton';
import styles from './WorkerTable.module.css';

type Props = {
  workers:WorkerType[];
  onWageChange: (workerName:string, delta:number) => void;
};

function WorkerTable({ workers, onWageChange }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Worker</th>
          <th>Count</th>
          <th>Wage</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {workers.map((w) => (
          <tr key={w.name}>
            <td>
              <div className={styles.popCell}>
                <span className={styles.popIcon}>{w.icon}</span>
                {w.name}
              </div>
            </td>
            <td>{w.number}</td>
            <td className={styles.wage}>△ {w.wage.toFixed(1)}</td>
            <td>
              <div className={styles.controls}>
                <StepButton label="-" onClick={() => onWageChange(w.name, -0.1)} disabled={w.wage <= 0} />
                <StepButton label="+" onClick={() => onWageChange(w.name, +0.1)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WorkerTable;