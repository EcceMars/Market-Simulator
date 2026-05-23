import styles from './StepButton.module.css';

type Props = {
    label: '+' | '-';
    onClick: () => void;
    disabled?: boolean;
}

function StepButton({ label, onClick, disabled = false }:Props) {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
            aria-label={label === '+' ? 'Increase' : 'Decrease'}
        >
            {label}
        </button>
    );
}

export default StepButton;