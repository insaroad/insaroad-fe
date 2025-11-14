import LongButton from '@/components/kiosk/LongBotton/LongButton';
import type { JSX } from 'react';
import styles from './Footer.module.css';
interface FooterProps {
    text: string;
}
export default function Footer({ text }: FooterProps): JSX.Element {
    return (
        <div className={styles.footer}>
            <LongButton text={text} />
        </div>
    );
}
