import React from 'react';
import styles from './ResultDescription.module.css';

export interface ResultTextSegment {
    text: string;
    bold?: boolean;
}

interface ResultDescriptionProps {
    segments: ResultTextSegment[];
}

export const ResultDescription: React.FC<ResultDescriptionProps> = ({ segments }) => {
    return (
        <section className={styles.wrapper}>
            <p className={styles.paragraph}>
                {segments.map((segment, index) =>
                    segment.bold ? (
                        <strong key={index} className={styles.bold}>
                            {segment.text}
                        </strong>
                    ) : (
                        <span key={index}>{segment.text}</span>
                    )
                )}
            </p>
        </section>
    );
};

export default ResultDescription;
