import React, { useEffect, useMemo } from 'react';
import styles from './MissionDescriptionPage.module.css';
import useRouteFadeNavigate from '@/hooks/kiosk/useRouteFadeNavigate';

export type PositionMode = 'manual' | 'center-x' | 'center-both';

export interface MissionDescriptionPageProps {
    mainTitle: string;
    subTitle?: string;
    position?: PositionMode;
    mainTitleClassName?: string;
    subTitleClassName?: string;

    /** ✅ (공통) 자동으로 다음 페이지로 이동할 경로 */
    nextTo?: string;

    /** ✅ (공통) 자동 이동까지 대기 시간(ms). 기본 5000 */
    autoNextMs?: number;

    /** ✅ (공통) 페이드 전환 시간(ms). 기본 350 */
    fadeMs?: number;
}

export const MissionDescriptionPage: React.FC<MissionDescriptionPageProps> = ({
    mainTitle,
    subTitle,
    position = 'manual',
    mainTitleClassName,
    subTitleClassName,
    nextTo,
    autoNextMs = 5000,
    fadeMs = 350,
}) => {
    const { isLeaving, fadeNavigate, durationMs } = useRouteFadeNavigate({
        durationMs: fadeMs,
    });

    // CSS 변수로 전달 (enter/leave 모두 동일 시간)
    const fadeStyle = useMemo(
        () => ({ ['--fadeMs' as any]: `${durationMs}ms` }),
        [durationMs]
    );

    useEffect(() => {
        if (!nextTo) return;

        const t = window.setTimeout(() => {
            fadeNavigate(nextTo);
        }, autoNextMs);

        return () => window.clearTimeout(t);
    }, [nextTo, autoNextMs, fadeNavigate]);

    return (
        <section
            className={[
                styles.wrapper,
                styles[`position-${position}`],
                styles.enter, // ✅ 진입 페이드인(원하면 제거 가능)
                isLeaving ? styles.leaving : '',
            ].join(' ')}
            style={fadeStyle}
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
