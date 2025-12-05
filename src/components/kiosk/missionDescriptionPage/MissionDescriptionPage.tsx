import React from 'react';
import styles from './MissionDescriptionPage.module.css';

export type PositionMode = 'manual' | 'center-x' | 'center-both';

export interface MissionDescriptionPageProps {
    mainTitle: string;
    subTitle?: string;
    position?: PositionMode;
    mainTitleClassName?: string;
    subTitleClassName?: string;
}

export const MissionDescriptionPage: React.FC<MissionDescriptionPageProps> = ({
    mainTitle,
    subTitle,
    position = 'manual',
    mainTitleClassName,
    subTitleClassName,
}) => {
    return (
        <section
            className={`${styles.wrapper} ${styles[`position-${position}`]}`}
            aria-labelledby="mission-main-title"
        >
            <h1
                id="mission-main-title"
                className={`${styles.mainTitle} ${mainTitleClassName ?? ''}`}
            >
                {mainTitle}
            </h1>

            {subTitle && (
                <p className={`${styles.subTitle} ${subTitleClassName ?? ''}`}>
                    {subTitle}
                </p>
            )}
        </section>
    );
};

export default MissionDescriptionPage;
