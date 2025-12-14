import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './StringPage.module.css';

type Phase = 'fadeIn' | 'pop' | 'done';

interface StringPageProps {
    fromSrc: string;
    toSrc: string;
    alt: string;

    width?: number;
    height?: number;

    fadeInMs?: number;
    swapDelayMs?: number;
    popMs?: number;

    afterPopDelayMs?: number;

    /** ✅ 페이드아웃 시간(ms) */
    fadeOutMs?: number;

    onComplete?: () => void;
    className?: string;
}

export const StringPage: React.FC<StringPageProps> = ({
    fromSrc,
    toSrc,
    alt,
    width = 300,
    height = 600,
    fadeInMs = 1500,
    swapDelayMs = 0,
    popMs = 600,
    afterPopDelayMs = 800,
    fadeOutMs = 350, // ✅ 기본 페이드아웃 0.35초
    onComplete,
    className,
}) => {
    const [phase, setPhase] = useState<Phase>('fadeIn');
    const [swapped, setSwapped] = useState<boolean>(false);

    // ✅ 페이드아웃 트리거
    const [isLeaving, setIsLeaving] = useState<boolean>(false);

    const tFadeRef = useRef<number | null>(null);
    const tSwapRef = useRef<number | null>(null);
    const tPopRef = useRef<number | null>(null);
    const tAfterRef = useRef<number | null>(null);
    const tLeaveRef = useRef<number | null>(null);

    // 2번째 이미지 미리 로드
    useEffect(() => {
        const img = new Image();
        img.src = toSrc;
    }, [toSrc]);

    useEffect(() => {
        // 타이머 정리
        if (tFadeRef.current) window.clearTimeout(tFadeRef.current);
        if (tSwapRef.current) window.clearTimeout(tSwapRef.current);
        if (tPopRef.current) window.clearTimeout(tPopRef.current);
        if (tAfterRef.current) window.clearTimeout(tAfterRef.current);
        if (tLeaveRef.current) window.clearTimeout(tLeaveRef.current);

        // (A) 1_1 페이드인
        tFadeRef.current = window.setTimeout(() => {
            // (B) 스왑 + 팝
            tSwapRef.current = window.setTimeout(() => {
                setSwapped(true);
                setPhase('pop');

                // (C) pop 종료
                tPopRef.current = window.setTimeout(() => {
                    // (D) pop 이후 대기
                    tAfterRef.current = window.setTimeout(() => {
                        setPhase('done');

                        // ✅ (E) done 시점에 페이드아웃 시작
                        setIsLeaving(true);

                        // ✅ (F) 페이드아웃 끝나면 onComplete 실행(=navigate)
                        tLeaveRef.current = window.setTimeout(() => {
                            onComplete?.();
                        }, fadeOutMs);
                    }, afterPopDelayMs);
                }, popMs);
            }, swapDelayMs);
        }, fadeInMs);

        return () => {
            if (tFadeRef.current) window.clearTimeout(tFadeRef.current);
            if (tSwapRef.current) window.clearTimeout(tSwapRef.current);
            if (tPopRef.current) window.clearTimeout(tPopRef.current);
            if (tAfterRef.current) window.clearTimeout(tAfterRef.current);
            if (tLeaveRef.current) window.clearTimeout(tLeaveRef.current);
        };
    }, [fadeInMs, swapDelayMs, popMs, afterPopDelayMs, fadeOutMs, onComplete]);

    const sizeStyle = useMemo<React.CSSProperties>(
        () => ({ width, height }),
        [width, height]
    );

    return (
        <div
            className={[
                styles.root,
                phase === 'pop' ? styles.pop : '',
                isLeaving ? styles.leaving : '',
                className ?? '',
            ].join(' ')}
            style={{
                ...sizeStyle,
                // ✅ fadeOutMs를 CSS에 전달(동적)
                ['--fadeOutMs' as any]: `${fadeOutMs}ms`,
            }}
            aria-label={alt}
        >
            <img
                src={fromSrc}
                alt={alt}
                className={`${styles.layer} ${styles.from} ${swapped ? styles.hidden : styles.fadeIn}`}
                style={{ animationDuration: `${fadeInMs}ms` }}
                draggable={false}
            />

            <img
                src={toSrc}
                alt={alt}
                className={`${styles.layer} ${styles.to} ${swapped ? styles.visible : styles.hidden}`}
                draggable={false}
            />
        </div>
    );
};

export default StringPage;
