// src/components/kiosk/gender/GenderSelector.tsx
import React from 'react';
import styles from './GenderSelector.module.css';

export type Gender = 'male' | 'female';

export interface GenderSelectorProps {
    value: Gender;
    onChange: (gender: Gender) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange }) => {
    const handleClick = (gender: Gender) => {
        if (gender !== value) {
            onChange(gender);
        }
    };

    return (
        <div className={styles.wrapper} aria-label="성별 선택">
            <span className={styles.divider} aria-hidden="true">
                |
            </span>

            <button
                type="button"
                className={`${styles.option} ${
                    value === 'male' ? styles.active : styles.inactive
                }`}
                onClick={() => handleClick('male')}
            >
                남자
            </button>

            <span className={styles.divider} aria-hidden="true">
                |
            </span>

            <button
                type="button"
                className={`${styles.option} ${
                    value === 'female' ? styles.active : styles.inactive
                }`}
                onClick={() => handleClick('female')}
            >
                여자
            </button>

            <span className={styles.divider} aria-hidden="true">
                |
            </span>
        </div>
    );
};

export default GenderSelector;
