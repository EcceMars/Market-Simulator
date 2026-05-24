import type { StructureObj } from '../../data/StructureObj';
import Panel from '../Panel';
import styles from './PublicPanel.module.css';

type Props = {
    structure: StructureObj;
};

function PublicPanel({ structure }: Props) {
    const drainPerTick = structure.workers.reduce(
        (sum, w) => sum + w.wageOffer * w.number, 0
    );

    return (
        <Panel>
            <div className={styles.titleRow}>
                <p className={styles.title}>{structure.template.name}</p>
                <span className={styles.publicBadge}>Public</span>
            </div>

            <p className={styles.sectionLabel}>Output</p>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty / tick</th>
                    </tr>
                </thead>
                <tbody>
                    {structure.template.outputs.map(slot => (
                        <tr key={slot.product.name}>
                            <td>
                                <div className={styles.productCell}>
                                    <span>{slot.product.icon}</span>
                                    {slot.product.name}
                                </div>
                            </td>
                            <td>{slot.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.footer}>
                <span>
                    <span className={styles.footerLabel}>Treasury Drain</span>
                    <span className={styles.negative}>△ {drainPerTick.toFixed(1)} / tick</span>
                </span>
            </div>
        </Panel>
    );
}

export default PublicPanel;