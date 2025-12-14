import React from 'react';
import styles from './NumTitle.module.css';

type NumTitleProps = { text: string };

export const NumTitle: React.FC<NumTitleProps> = ({ text }) => {
    return <h1 className={styles.title}>{text}</h1>;
};
