import { type JSX } from 'react';
import styles from './DescriptionPage.module.css';
export default function DescriptionPage(): JSX.Element {
    return (
        <div className={styles['card-description']}>
            <div className={styles['card-background']} />
            <div className={styles['card-text1']}>Start your own tour in Insa-dong!</div>
            <div className={styles['card-text2']}>
                Visit a total of Three Locations,
                <br />
                And receive special rewards!!
            </div>
        </div>
    );
}
