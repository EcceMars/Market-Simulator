import styles from "./Panel.module.css";

type Props = {
    children: React.ReactNode;
};

function Panel({ children }: Props) {
  return <div className={styles.panel}>{children}</div>;
}

export default Panel;