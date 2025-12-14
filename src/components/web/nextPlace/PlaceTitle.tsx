import React from 'react';
import styles from './PlaceTitle.module.css';

type PlaceTitleProps = { text: string };

export const PlaceTitle: React.FC<PlaceTitleProps> = ({ text }) => {
    return <h2 className={styles.title}>{text}</h2>;
};
