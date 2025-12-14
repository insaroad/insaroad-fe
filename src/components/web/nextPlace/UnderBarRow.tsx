import React from 'react';
import styles from './UnderBarRow.module.css';

type UnderBarRowProps = {
    digits: string[]; // length 3
    ariaLabel?: string;
};

export const UnderBarRow: React.FC<UnderBarRowProps> = ({ digits, ariaLabel }) => {
    return (
        <div className={styles.row} role="group" aria-label={ariaLabel}>
            {digits.slice(0, 3).map((d, idx) => (
                <div
                    key={idx}
                    className={styles.cell}
                    aria-label={`${idx + 1}번째 숫자 ${d}`}
                >
                    <div className={styles.digit}>{d}</div>
                    <div className={styles.underline} aria-hidden="true" />
                </div>
            ))}
        </div>
    );
};
