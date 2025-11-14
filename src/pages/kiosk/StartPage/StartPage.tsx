import { type JSX } from 'react';
import styles from './StartPage.module.css';
import imgInsaroad from '@/assets/img-insaroad.png';
import LongButton from '@/components/kiosk/LongBotton/LongButton';

export default function StartPage(): JSX.Element {
    return (
        <div className={styles.kiosk}>
            <div className={styles['section-main']}>
                <div className={styles.title}>INSAROAD</div>

                <img
                    className={styles['img-insaroad']}
                    alt="Img insaroad"
                    src={imgInsaroad}
                />
            </div>

            <div className={styles['section-btns']}>
                <LongButton text="Make Custom Route" />
                <LongButton text="Follow Hot Course" />
            </div>
        </div>
    );
}
