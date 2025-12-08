// src/pages/kiosk/BirthdayPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';
import { TitleSection } from './components/TitleSection';
import { NumberPicker } from './components/NumberPicker';
import styles from './KoreanNamePage1.module.css';

export const koreanNamePage1: React.FC = () => {
    const navigate = useNavigate();

    // 카운트다운 (초기값 60초)
    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);

    // 오늘 기준 기본값 설정 (예: 2002-11-25 같은 초기값 세팅용)
    const today = useMemo(() => new Date(), []);
    const [year, setYear] = useState<number>(2000);
    const [month, setMonth] = useState<number>(6);
    const [day, setDay] = useState<number>(15);

    useEffect(() => {
        const timerId = window.setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    window.clearInterval(timerId);
                    // 0초가 되면 홈 화면으로 이동 (Home 버튼과 동일 동작)
                    navigate('/kiosk'); // 필요 시 경로 수정
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            window.clearInterval(timerId);
        };
    }, [navigate]);

    const handleConfirm = () => {
        // TODO: 다음 페이지 라우팅 경로에 맞게 수정
        // 예: 성별 선택 화면 등
        console.log(`Selected birthday: ${year}-${month}-${day}`);
        navigate('/kiosk/next');
    };

    return (
        <main className={styles.container}>
            <KioskHeader />
            {/* 배경 레이어 */}
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>
            {/* 좌상단 카운트다운 숫자 */}
            <div className={styles.countdown}>{remainingSeconds}</div>

            {/* 중앙 타이틀 + 서브타이틀 */}
            <TitleSection />

            {/* 질문 텍스트 */}
            <section className={styles.questionSection} aria-label="생년월일 입력">
                <p className={styles.questionText}>당신의 생일은 언제인가요?</p>

                {/* 년 / 월 / 일 선택 영역 */}
                <div className={styles.pickerRow}>
                    <NumberPicker
                        start={1900}
                        end={today.getFullYear()}
                        step={1}
                        value={year}
                        onChange={setYear}
                        ariaLabel="출생 연도 선택"
                    />

                    <span className={styles.pickerDivider}>|</span>

                    <NumberPicker
                        start={1}
                        end={12}
                        step={1}
                        value={month}
                        onChange={setMonth}
                        ariaLabel="출생 월 선택"
                    />

                    <span className={styles.pickerDivider}>|</span>

                    <NumberPicker
                        start={1}
                        end={31}
                        step={1}
                        value={day}
                        onChange={setDay}
                        ariaLabel="출생 일자 선택"
                    />
                </div>
            </section>

            {/* 하단 확인 버튼 (InsaroadButton 재사용) */}
            <InsaroadButton
                width={520}
                height={120}
                x={650} // 해상도에 맞게 조정 (1820 기준 예시)
                y={1450} // 해상도에 맞게 조정 (1820x2250 기준 예시)
                text="확인"
                onClick={handleConfirm}
            />
        </main>
    );
};

export default koreanNamePage1;
