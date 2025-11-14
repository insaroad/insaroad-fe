import type { JSX } from 'react';
import BackwardButton from '../BackwardButton/BackwardButton';
import styles from './Header.module.css';
interface HeaderProps {
    titleText: string;
}
export default function Header({ titleText }: HeaderProps): JSX.Element {
    return (
        <header className={styles.header}>
            <BackwardButton />
            <div className={styles.title}>{titleText}</div>
        </header>
    );
}
