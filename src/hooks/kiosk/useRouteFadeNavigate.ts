import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Options {
    durationMs?: number;
}

export const useRouteFadeNavigate = (options: Options = {}) => {
    const { durationMs = 500 } = options;
    const navigate = useNavigate();

    const [isLeaving, setIsLeaving] = useState(false);
    const timerRef = useRef<number | null>(null);

    const fadeNavigate = useCallback(
        (to: string) => {
            setIsLeaving(true);
            timerRef.current = window.setTimeout(() => {
                navigate(to);
            }, durationMs);
        },
        [navigate, durationMs]
    );

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, []);

    return { isLeaving, fadeNavigate, durationMs };
};

export default useRouteFadeNavigate;
