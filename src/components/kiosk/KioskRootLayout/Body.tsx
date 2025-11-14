import { type JSX } from 'react';
import styles from './Body.module.css';
import { Outlet } from 'react-router-dom';
export default function Body(): JSX.Element {
    return (
        <div className={styles.body}>
            <Outlet />
        </div>
    );
}
