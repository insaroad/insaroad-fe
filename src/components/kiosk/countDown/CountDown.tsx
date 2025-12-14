import React, { useEffect, useRef, useState } from 'react';

interface CountDownProps {
    initialSeconds?: number;
    onExpire?: () => void;
    className?: string;

    /** ✅ 매초 남은 시간을 부모에 전달 */
    onTick?: (remainingSeconds: number) => void;
}

export const CountDown: React.FC<CountDownProps> = ({
    initialSeconds = 60,
    onExpire,
    className,
    onTick,
}) => {
    const [remainingSeconds, setRemainingSeconds] = useState<number>(initialSeconds);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        setRemainingSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            setRemainingSeconds((prev) => {
                const next = prev <= 1 ? 0 : prev - 1;

                onTick?.(next); // ✅ 부모에 전달

                if (next === 0) {
                    if (intervalRef.current) window.clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    onExpire?.();
                }

                return next;
            });
        }, 1000);

        // ✅ 첫 렌더에서도 현재 값 전달(버튼 조건 즉시 반영)
        onTick?.(initialSeconds);

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, [initialSeconds, onExpire, onTick]);

    return <div className={className}>{remainingSeconds}</div>;
};

export default CountDown;
