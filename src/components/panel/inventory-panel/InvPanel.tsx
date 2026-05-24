import type { Inventory } from "../../data/Inventory";
import styles from "./InvPanel.module.css";

type Props = {
    inventory: Inventory;
};

function InvPanel({ inventory }: Props) {
    if (inventory.entries.length === 0) {
        return (
            <p className={styles.empty}>No stock</p>
        );
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                {inventory.entries.map((entry) => (
                    <tr key={entry.product.name}>
                        <td>
                            <div className={styles.productCell}>
                                <span className={styles.productIcon}>{entry.product.icon}</span>
                                {entry.product.name}
                            </div>
                        </td>
                        <td>{entry.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InvPanel;