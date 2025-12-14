import React from 'react';
import styles from './TicketTitle.module.css';

type TicketTitleProps = {
    lines: [string, string]; // 정확히 2줄
};

export const TicketTitle: React.FC<TicketTitleProps> = ({ lines }) => {
    return (
        <h1 className={styles.title}>
            <span className={styles.line}>{lines[0]}</span>
            <span className={styles.line}>{lines[1]}</span>
        </h1>
    );
};
