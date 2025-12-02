import React, { useState } from 'react';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import KioskHeader from '@/layouts/KioskHeader';
import { QrGuideText } from './components/QrGuideText';
import { OrangeBar } from './components/OrangeBar';
import Keypad from '@/components/kiosk/keypad/Keypad';
import styles from './EnterNumPage.module.css';
import insaroadBgImg from '@/assets/img-insaroad.png';

export const EnterNumPage: React.FC = () => {
    const [code, setCode] = useState<string>(''); // 최대 3자리 숫자 입력

    const orangeY = 280; // 주황 바 y 위치 기준
    const orangeWidth = 40; // 주황 바 너비

    const handleNumberClick = (digit: number) => {
        setCode((prev) => {
            if (prev.length >= 3) return prev; // 최대 3자리
            return prev + String(digit);
        });
    };
    const handleBackspace = () => {
        setCode((prev) => prev.slice(0, -1));
    };
    return (
        <div className={styles.container}>
            <InsaroadFootBackground src={insaroadBgImg} />

            {/* 상단 헤더 레이어 */}
            <KioskHeader />

            {/* 아래 Body 레이어는 이후에 구성 */}
            {/* 1. 안내 문구: y만 조절 */}
            <QrGuideText y={180} />

            {/* 2. 주황 바 3개 */}
            {/* 왼쪽 */}
            <OrangeBar
                width={orangeWidth}
                x={140}
                y={orangeY}
                mode="manual"
                digit={code[0] ?? ''}
            />
            {/* 가운데(가로 중앙 정렬) */}
            <OrangeBar
                width={orangeWidth}
                y={orangeY}
                mode="center-x"
                digit={code[1] ?? ''}
            />
            {/* 오른쪽 */}
            <OrangeBar
                width={orangeWidth}
                x={390}
                y={orangeY}
                mode="manual"
                digit={code[2] ?? ''}
            />

            {/* 키패드*/}
            <Keypad
                originX={168}
                originY={250}
                buttonWidth={60}
                buttonHeight={60}
                gapX={90}
                gapY={80}
                onNumberClick={handleNumberClick}
                onBackspaceClick={handleBackspace}
            />
        </div>
    );
};

export default EnterNumPage;
