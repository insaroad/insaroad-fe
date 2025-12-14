import React, { useEffect, useRef, useState } from 'react';

interface CountDownProps {
    initialSeconds: number;
    onExpire?: () => void;
    onTick?: (remainingSeconds: number) => void; // ✅ 추가
    className?: string;
}

const CountDown: React.FC<CountDownProps> = ({
    initialSeconds,
    onExpire,
    onTick,
    className,
}) => {
    const [remaining, setRemaining] = useState<number>(initialSeconds);
    const timerRef = useRef<number | null>(null);

    // ✅ 초기값도 부모에게 1번 전달 (버튼 조건/표시 동기화)
    useEffect(() => {
        setRemaining(initialSeconds);
        onTick?.(initialSeconds);
    }, [initialSeconds, onTick]);

    useEffect(() => {
        if (timerRef.current) window.clearInterval(timerRef.current);

        timerRef.current = window.setInterval(() => {
            setRemaining((prev) => {
                const next = prev - 1;

                if (next <= 0) {
                    if (timerRef.current) window.clearInterval(timerRef.current);
                    onTick?.(0);
                    onExpire?.();
                    return 0;
                }

                onTick?.(next); // ✅ 매초 부모에 전달
                return next;
            });
        }, 1000);

        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
        };
    }, [onExpire, onTick]);

    return <div className={className}>{remaining}</div>;
};

export default CountDown;
