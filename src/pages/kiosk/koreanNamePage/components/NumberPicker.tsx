import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './NumberPicker.module.css';

type NumberPickerProps = {
    start: number;
    end: number;
    step?: number;
    value: number;
    onChange: (next: number) => void;
    ariaLabel?: string;
};

const ITEM_HEIGHT = 84;
const VISIBLE_COUNT = 3; // ✅ 3개만 보이게

export const NumberPicker: React.FC<NumberPickerProps> = ({
    start,
    end,
    step = 1,
    value,
    onChange,
    ariaLabel,
}) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const scrollEndTimer = useRef<number | null>(null);

    const numbers = useMemo(() => {
        const arr: number[] = [];
        for (let n = start; n <= end; n += step) arr.push(n);
        return arr;
    }, [start, end, step]);

    const containerHeight = ITEM_HEIGHT * VISIBLE_COUNT;
    const pad = (containerHeight - ITEM_HEIGHT) / 2; // ✅ 중앙(2번째) 정렬을 위한 여유

    const clampIndex = useCallback(
        (idx: number) => Math.max(0, Math.min(numbers.length - 1, idx)),
        [numbers.length]
    );

    const indexFromValue = useCallback(
        (v: number) => clampIndex(Math.round((v - start) / step)),
        [clampIndex, start, step]
    );

    // ✅ DOM 스페이서 방식이므로 pad를 scrollTop에 더하지 않는다.
    const scrollToIndex = useCallback(
        (idx: number, behavior: ScrollBehavior = 'smooth') => {
            const el = scrollerRef.current;
            if (!el) return;

            const clamped = clampIndex(idx);
            const top = clamped * ITEM_HEIGHT;

            const prefersReduced =
                window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

            el.scrollTo({ top, behavior: prefersReduced ? 'auto' : behavior });
        },
        [clampIndex]
    );

    useEffect(() => {
        scrollToIndex(indexFromValue(value), 'auto');
    }, [value, indexFromValue, scrollToIndex]);

    const commitByScrollTop = useCallback(
        (scrollTop: number) => {
            const raw = scrollTop / ITEM_HEIGHT;
            const idx = clampIndex(Math.round(raw));
            const nextValue = numbers[idx];

            if (nextValue !== value) onChange(nextValue);
            scrollToIndex(idx, 'smooth');
        },
        [clampIndex, numbers, value, onChange, scrollToIndex]
    );

    const onScroll = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;

        if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
        scrollEndTimer.current = window.setTimeout(() => {
            commitByScrollTop(el.scrollTop);
        }, 80);
    }, [commitByScrollTop]);

    useEffect(() => {
        return () => {
            if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
        };
    }, []);

    return (
        <div className={styles.root} aria-label={ariaLabel}>
            <div
                className={styles.centerHighlight}
                style={{ top: (containerHeight - ITEM_HEIGHT) / 2, height: ITEM_HEIGHT }}
                aria-hidden="true"
            />

            <div
                ref={scrollerRef}
                className={styles.scroller}
                style={{ height: containerHeight }}
                onScroll={onScroll}
                role="listbox"
                aria-label={ariaLabel}
            >
                {/* ✅ 위 스페이서: 끝값도 중앙에 올 수 있게 */}
                <div style={{ height: pad }} aria-hidden="true" />

                {numbers.map((n, idx) => {
                    const selected = n === value;
                    return (
                        <button
                            key={n}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            className={[
                                styles.item,
                                selected ? styles.selected : '',
                            ].join(' ')}
                            style={{ height: ITEM_HEIGHT }}
                            onClick={() => {
                                onChange(n);
                                scrollToIndex(idx, 'smooth');
                            }}
                        >
                            {n}
                        </button>
                    );
                })}

                {/* ✅ 아래 스페이서 */}
                <div style={{ height: pad }} aria-hidden="true" />
            </div>
        </div>
    );
};

export default NumberPicker;
