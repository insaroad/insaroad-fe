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
const CURRENT_LOCATION_ID_KEY = 'currentLocationId';
const INITIAL_LOCATION_ID = '1';

// startStage → 라우팅 규칙
const stageToRoute = (startStage: number) => {
    switch (startStage) {
        case 1:
            return '/kiosk/missions/korean-name';
        case 2:
            return '/kiosk/missions/animal';
        case 3:
            return '/kiosk/missions/signboard';
        default:
            return '/kiosk';
    }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not defined. Check your .env file.');
}

export const EnterNumPage: React.FC = () => {
    const navigate = useNavigate();

    const [code, setCode] = useState<string>('');
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

        // 입력한 3자리 코드 localStorage 저장
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

                if (!json.success) {
                    throw new Error(json.message || 'Request failed');
                }

                const { userCode, startStage } = json.data;

                // 응답 userCode 저장(검증된 값)
                localStorage.setItem(USER_CODE_STORAGE_KEY, userCode);

                // ✅ 이어서/재진입 시작 성공 시: currentLocationId=1 세팅
                localStorage.setItem(CURRENT_LOCATION_ID_KEY, INITIAL_LOCATION_ID);

                const nextRoute = stageToRoute(startStage);
                navigate(nextRoute, { replace: true });
            } catch (e) {
                setErrorText('코드를 확인할 수 없습니다. 다시 입력해주세요.');
                setCode('');
                localStorage.removeItem(USER_CODE_STORAGE_KEY);

                // ✅ 실패 시 정리
                localStorage.removeItem(CURRENT_LOCATION_ID_KEY);
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
