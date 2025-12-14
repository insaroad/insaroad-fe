import React from 'react';
import actionStyles from '@/components/web/nextPlace/ActionLinks.module.css';

type DownloadButtonProps = {
    label: string;
    onClick?: () => void;
};

const DownloadIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a1 1 0 0 1 1 1v9.17l2.59-2.58a1 1 0 1 1 1.41 1.42l-4.3 4.29a1 1 0 0 1-1.4 0l-4.3-4.29a1 1 0 1 1 1.41-1.42L11 13.17V4a1 1 0 0 1 1-1zM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" />
    </svg>
);

export const DownloadButton: React.FC<DownloadButtonProps> = ({ label, onClick }) => {
    return (
        <button type="button" className={actionStyles.row} onClick={onClick}>
            <span className={actionStyles.icon}>
                <DownloadIcon />
            </span>
            <span className={actionStyles.text}>{label}</span>
        </button>
    );
};
