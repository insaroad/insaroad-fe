import React from 'react';
import styles from './ResultTitle.module.css';

interface ResultTitleProps {
    title: string;
}

export const ResultTitle: React.FC<ResultTitleProps> = ({ title }) => {
    return <h2 className={styles.title}>{title}</h2>;
};

export default ResultTitle;
