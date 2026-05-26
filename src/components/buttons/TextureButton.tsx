import React, { useRef } from 'react';
import styles from './TextureButton.module.css';

interface TextureButtonProps {
    icon:string;
    keyLetter:string;
    onClick?:() => void;
    label:string;
    audioRes?:string;
    size?:number;
}

const TextureButton:React.FC<TextureButtonProps> = ({
    icon,
    keyLetter,
    onClick,
    label,
    audioRes = "",
    size = 64,
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const handleClick = () => {
        if (audioRes && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
        }
        onClick?.();
    };

    return (
        <button
            onClick={handleClick}
            aria-label={label}
            title={label}
            className={styles.button}
            style={{ width:size, height:size }}
        >
            <div className={styles.container}>
                <img 
                    src={icon} 
                    alt={label} 
                    className={styles.icon}
                />
            <span className={styles.keyLabel}>
                    {keyLetter.toUpperCase()}
                </span>
            </div>

            {audioRes && <audio ref={audioRef} src={audioRes} />}
        </button>
    );
};
export default TextureButton;