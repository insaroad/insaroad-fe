import React from 'react';
import styles from './Decor.module.css';
import stringImg from '@/assets/kiosk/string.png';

export const StringDecor: React.FC = () => {
    return <img src={stringImg} alt="string" className={styles.string} />;
};

export default StringDecor;
