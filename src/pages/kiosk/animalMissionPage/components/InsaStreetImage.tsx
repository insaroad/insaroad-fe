import React from 'react';
import styles from './InsaStreetImage.module.css';
import insaStreet from '../assets/insa_street.png';

export const InsaStreetImage: React.FC = () => {
    return <img src={insaStreet} alt="인사동 거리" className={styles.image} />;
};

export default InsaStreetImage;
