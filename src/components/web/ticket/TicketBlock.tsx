import React from 'react';
import styles from './TicketBlock.module.css';
import { DownloadButton } from './DownloadButton';

type TicketBlockProps = {
    ticketSrc: string;
    subTitle: string;
    downloadLabel: string;
    onDownload?: () => void;
};

export const TicketBlock: React.FC<TicketBlockProps> = ({
    ticketSrc,
    subTitle,
    downloadLabel,
    onDownload,
}) => {
    return (
        <section className={styles.wrap} aria-label="교환권 영역">
            <img className={styles.ticket} src={ticketSrc} alt="교환권 이미지" />

            <p className={styles.subTitle}>{subTitle}</p>

            <div className={styles.download}>
                <DownloadButton label={downloadLabel} onClick={onDownload} />
            </div>
        </section>
    );
};
