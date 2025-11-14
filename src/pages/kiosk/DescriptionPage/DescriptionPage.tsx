import { type JSX } from 'react';
import styles from './DescriptionPage.module.css';
export default function DescriptionPage(): JSX.Element {
    return (
        <div className={styles['card-description']}>
            <div className={styles['card-background']} />
            <p className={styles['card-text']}>Start your own tour in Insa-dong!</p>
            <p className={styles['card-text']}>
                Visit a total of Three Locations,
                <br />
                And receive special rewards!!
            </p>
        </div>
    );
}
