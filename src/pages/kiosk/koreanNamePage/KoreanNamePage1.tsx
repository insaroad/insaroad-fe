import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';
import { TitleSection } from './components/TitleSection';
import { NumberPicker } from './components/NumberPicker';
import styles from './KoreanNamePage1.module.css';

import CountDown from '@/components/kiosk/countDown/CountDown';
import useRouteFadeNavigate from '@/hooks/kiosk/useRouteFadeNavigate';

export const KoreanNamePage1: React.FC = () => {
    const navigate = useNavigate();

    const today = useMemo(() => new Date(), []);
    const [year, setYear] = useState<number>(2000);
    const [month, setMonth] = useState<number>(6);
    const [day, setDay] = useState<number>(15);

    const [entered, setEntered] = useState(false);

    const { isLeaving, fadeNavigate, durationMs } = useRouteFadeNavigate({
        durationMs: 350,
    });

    useEffect(() => setEntered(true), []);

    const handleExpire = useCallback(() => {
        // ✅ 0초면 홈
        fadeNavigate('/kiosk');
    }, [fadeNavigate]);

    // const handleConfirm = useCallback(() => {
    //     console.log(`Selected birthday: ${year}-${month}-${day}`);
    //     // ✅ 확인 시 페이드아웃 후 다음 페이지
    //     fadeNavigate('/kiosk/missions/korean-name/page2'); // TODO: 실제 라우트로 맞추세요
    // }, [fadeNavigate, year, month, day]);

    const handleConfirm = useCallback(() => {
        const birthDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        navigate("/kiosk/missions/korean-name/page2", {
            state: { birthDate },
        });
    }, [navigate, year, month, day]);

    

    return (
        <main
            className={[
                styles.container,
                entered ? styles.enter : '',
                isLeaving ? styles.leaving : '',
            ].join(' ')}
            style={{ ['--fadeMs' as any]: `${durationMs}ms` }}
        >
            <KioskHeader />

            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            {/* ✅ CountDown 교체 */}
            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={handleExpire}
            />

            <TitleSection />

            <section className={styles.questionSection} aria-label="생년월일 입력">
                <p className={styles.questionText}>당신의 생일은 언제인가요?</p>

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

            <InsaroadButton
                width={520}
                height={120}
                x={650}
                y={1450}
                text="확인"
                onClick={handleConfirm}
            />
        </main>
    );
};

export default KoreanNamePage1;
