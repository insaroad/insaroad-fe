// src/components/kiosk/birthday/NumberPicker.tsx
import React, { useEffect, useMemo, useRef } from 'react';
import styles from './NumberPicker.module.css';

export interface NumberPickerProps {
    start: number;
    end: number;
    step?: number;
    value: number;
    onChange: (next: number) => void;
    ariaLabel?: string;
}

// 한 줄(row) 높이 – CSS .item 의 height와 반드시 동일
const ROW_HEIGHT = 64;

export const NumberPicker: React.FC<NumberPickerProps> = ({
    start,
    end,
    step = 1,
    value,
    onChange,
    ariaLabel,
}) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);

    const items = useMemo(() => {
        const result: number[] = [];
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
        return result;
    }, [start, end, step]);

    // value가 바뀔 때마다: "한 줄 위 + 선택 줄 + 한 줄 아래" 구조의 가운데에 오도록
    useEffect(() => {
        if (!scrollRef.current) return;

        const index = items.indexOf(value);
        if (index === -1) return;

        // 가운데 정렬: 선택 인덱스의 한 줄 위가 viewport의 top이 되도록
        const targetTop = Math.max(0, index * ROW_HEIGHT - ROW_HEIGHT);

        scrollRef.current.scrollTo({
            top: targetTop,
            behavior: 'auto',
        });
    }, [value, items]);

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current !== null) {
                window.clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const snapToNearest = (container: HTMLDivElement) => {
        const scrollTop = container.scrollTop;

        // scrollTop 이 "선택줄의 한 줄 위"이므로 +1 해서 선택 인덱스 계산
        let index = Math.round(scrollTop / ROW_HEIGHT) + 1;

        if (index < 0) index = 0;
        if (index >= items.length) index = items.length - 1;

        const nextValue = items[index];

        if (typeof nextValue === 'number') {
            // 선택값 갱신
            if (nextValue !== value) {
                onChange(nextValue);
            }

            // 다시 정확히 중앙 위치로 스냅
            const targetTop = Math.max(0, index * ROW_HEIGHT - ROW_HEIGHT);
            container.scrollTo({
                top: targetTop,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;

        if (scrollTimeoutRef.current !== null) {
            window.clearTimeout(scrollTimeoutRef.current);
        }

        // 스크롤 멈춘 뒤 80ms 후에만 스냅 & 선택값 변경
        scrollTimeoutRef.current = window.setTimeout(() => {
            snapToNearest(el);
        }, 80);
    };

    const handleItemClick = (val: number) => {
        onChange(val);
    };

    return (
        <div
            className={styles.container}
            role="listbox"
            aria-label={ariaLabel}
            aria-activedescendant={`${ariaLabel ?? 'number'}-${value}`}
            tabIndex={0}
        >
            {/* 가운데 선택 영역 가이드 (정확히 1줄 높이) */}
            <div className={styles.centerGuide} aria-hidden="true" />

            <div ref={scrollRef} className={styles.scrollArea} onScroll={handleScroll}>
                {items.map((num) => {
                    const isSelected = num === value;
                    return (
                        <button
                            key={num}
                            id={`${ariaLabel ?? 'number'}-${num}`}
                            type="button"
                            className={`${styles.item} ${
                                isSelected ? styles.selected : ''
                            }`}
                            onClick={() => handleItemClick(num)}
                        >
                            {num.toString().padStart(2, '0')}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default NumberPicker;
