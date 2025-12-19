import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import KioskHeader from '@/components/kiosk/header/KioskHeader';
import { QrGuideText } from './components/QrGuideText';
import { OrangeBar } from './components/OrangeBar';
import Keypad from '@/components/kiosk/keypad/Keypad';
import styles from './EnterNumPage.module.css';
import insaroadBgImg from '@/assets/img-insaroad.png';

type StartGameData = {
    userCode: string;
    startStage: number;
};

type BaseResponse<T> = {
    success: boolean;
    code: number;
    message: string;
    data: T;
};

const USER_CODE_STORAGE_KEY = 'userCode';

// startStage → 라우팅 규칙 (프로젝트에 맞게 변경)
const stageToRoute = (startStage: number) => {
    switch (startStage) {
        case 2:
            return '/kiosk/missions/animal';
        case 3:
            return '/kiosk/missions/signBoard';
        default:
            // 현재 예시 값(1073741824) 같은 큰 수가 올 수 있으니,
            // 일단 startStage를 쿼리/상태로 넘기는 방식도 고려 가능
            return '/kiosk';
    }
};

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL as string;

if (!API_BASE_URL) {
    throw new Error('VITE_SERVER_BASE_URL is not defined. Check your .env file.');
}

export const EnterNumPage: React.FC = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState<string>(''); // 최대 3자리
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorText, setErrorText] = useState<string>('');

    const requestedRef = useRef(false);

    const orangeY = 900;
    const orangeWidth = 100;

    const handleNumberClick = (digit: number) => {
        if (isSubmitting) return;
        setErrorText('');

        setCode((prev) => {
            if (prev.length >= 3) return prev;
            return prev + String(digit);
        });
    };

    const handleBackspace = () => {
        if (isSubmitting) return;
        setErrorText('');
        setCode((prev) => prev.slice(0, -1));
    };

    useEffect(() => {
        if (code.length !== 3) {
            requestedRef.current = false;
            return;
        }
        if (requestedRef.current) return;

        requestedRef.current = true;
        setIsSubmitting(true);

        // 요구사항: 입력한 3자리 코드 localStorage 저장
        localStorage.setItem(USER_CODE_STORAGE_KEY, code);

        const controller = new AbortController();

        const run = async () => {
            try {
                const url = new URL('/api/games/start', API_BASE_URL);
                url.searchParams.set('userCode', code);

                const res = await fetch(url.toString(), {
                    method: 'GET',
                    headers: { accept: 'application/json' },
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const json: BaseResponse<StartGameData> = await res.json();

                // 백엔드 스펙대로: data.startStage 사용
                if (!json.success) {
                    throw new Error(json.message || 'Request failed');
                }

                const { userCode, startStage } = json.data;

                // 응답의 userCode를 저장(서버가 정규화/검증한 값이 있을 수 있으므로)
                localStorage.setItem(USER_CODE_STORAGE_KEY, userCode);

                const nextRoute = stageToRoute(startStage);
                navigate(nextRoute, { replace: true });
            } catch (e) {
                setErrorText('코드를 확인할 수 없습니다. 다시 입력해주세요.');
                setCode('');
                localStorage.removeItem(USER_CODE_STORAGE_KEY);
            } finally {
                setIsSubmitting(false);
            }
        };

        run();

        return () => controller.abort();
    }, [code, navigate]);

    return (
        <div className={styles.container} aria-busy={isSubmitting}>
            <InsaroadFootBackground src={insaroadBgImg} />
            <KioskHeader />

            <QrGuideText y={500} />

            <OrangeBar
                width={orangeWidth}
                x={450}
                y={orangeY}
                mode="manual"
                digit={code[0] ?? ''}
            />
            <OrangeBar
                width={orangeWidth}
                y={orangeY}
                mode="center-x"
                digit={code[1] ?? ''}
            />
            <OrangeBar
                width={orangeWidth}
                x={1250}
                y={orangeY}
                mode="manual"
                digit={code[2] ?? ''}
            />

            {errorText && (
                <div role="alert" className={styles.errorText}>
                    {errorText}
                </div>
            )}

            <Keypad
                originX={460}
                originY={800}
                buttonWidth={200}
                buttonHeight={200}
                gapX={350}
                gapY={230}
                onNumberClick={handleNumberClick}
                onBackspaceClick={handleBackspace}
            />

            {isSubmitting && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(255,255,255,0.35)',
                    }}
                />
            )}
        </div>
    );
};

export default EnterNumPage;
