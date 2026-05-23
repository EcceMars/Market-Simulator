import type { Inventory } from "../../data/Inventory";
import styles from "./InvPanel.module.css";

type Props = {
    inventory:Inventory;
};

function InvPanel({ inventory }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {inventory.entries.map((entry) => (
            <tr key={entry.product.name}>
              <td>{entry.product.name}</td>
              <td>{entry.quantity}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default InvPanel;