import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './NextPlacePage.module.css';

import InsaroadFootBackground from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

import { Header } from '@/components/web/nextPlace/Header';
import { NumTitle } from '@/components/web/nextPlace/NumTitle';
import { UnderBarRow } from '@/components/web/nextPlace/UnderBarRow';
import { DescriptionText } from '@/components/web/nextPlace/DescriptionText';
import { PlaceTitle } from '@/components/web/nextPlace/PlaceTitle';
import { MapPlaceholder } from '@/components/web/nextPlace/MapPlaceholder';
import { PlaceCard } from '@/components/web/nextPlace/PlaceCard';
import { ActionLinks } from '@/components/web/nextPlace/ActionLinks';

import { PhotoModal } from '@/components/web/nextPlace/PhotoModal';
import placeImg from '@/assets/web/place.png';

// ✅ 화살표 이미지 (배경 없는 아이콘 권장: PNG/SVG)
import arrowLeftImg from '@/assets/web/arrow-left.png';
import arrowRightImg from '@/assets/web/arrow-right.png';

type NextPlacePageProps = {
    code?: string;
    place?: {
        nameKo: string;
        nameEn: string;
        addressKo: string;
    };
    onOpenKakaoDirections?: () => void;
    onOpenKioskPhoto?: () => void;
    footSrc?: string;
};

export const NextPlacePage: React.FC<NextPlacePageProps> = ({
    code = '000',
    place = {
        nameKo: '안녕 인사동',
        nameEn: 'Hello Insadong',
        addressKo: '서울특별시 종로구 인사동길 ...',
    },
    onOpenKakaoDirections,
    onOpenKioskPhoto,
}) => {
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);

    const digits = useMemo(
        () => code.replace(/\D/g, '').slice(-3).padStart(3, '0').split(''),
        [code]
    );

    const handleOpenPhoto = () => {
        onOpenKioskPhoto?.();
        setIsPhotoOpen(true);
    };

    const handleClosePhoto = () => {
        setIsPhotoOpen(false);
    };

    /**
     * ✅ MapPlaceholder + PlaceCard를 "한 묶음(한 슬라이드)"으로 넘김
     * - 지금은 예시로 2장 구성 (place 복제)
     * - 실제로는 백엔드에서 places 배열로 받아서 slides를 만들면 됨
     */
    const slides = useMemo(
        () => [
            { id: 'slide-1', mapLabel: '카카오 지도 영역', place },
            { id: 'slide-2', mapLabel: '카카오 지도 영역', place },
        ],
        [place]
    );

    const totalSlides = slides.length;

    const scrollerRef = useRef<HTMLDivElement | null>(null);

    // ✅ 스크롤이 "끝난 뒤"에만 확정 (버튼 깜빡임/왓다갓다 방지)
    const [activeIndex, setActiveIndex] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(totalSlides > 1);

    const updateNav = useCallback(
        (idx: number) => {
            setCanPrev(idx > 0);
            setCanNext(idx < totalSlides - 1);
        },
        [totalSlides]
    );

    const scrollToIndex = useCallback(
        (index: number, behavior: ScrollBehavior = 'smooth') => {
            const el = scrollerRef.current;
            if (!el) return;

            const clamped = Math.max(0, Math.min(totalSlides - 1, index));
            const left = clamped * el.clientWidth;

            const prefersReduced =
                window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

            el.scrollTo({ left, behavior: prefersReduced ? 'auto' : behavior });
            // ✅ activeIndex는 scroll-end에서 확정
        },
        [totalSlides]
    );

    const handlePrev = useCallback(
        () => scrollToIndex(activeIndex - 1),
        [activeIndex, scrollToIndex]
    );
    const handleNext = useCallback(
        () => scrollToIndex(activeIndex + 1),
        [activeIndex, scrollToIndex]
    );

    // ✅ scroll-end 디바운스
    const scrollEndTimer = useRef<number | null>(null);

    useEffect(() => {
        updateNav(activeIndex);

        const el = scrollerRef.current;
        if (!el) return;

        const onScroll = () => {
            if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);

            scrollEndTimer.current = window.setTimeout(() => {
                const width = Math.max(1, el.clientWidth);
                const idx = Math.round(el.scrollLeft / width);
                const clamped = Math.max(0, Math.min(totalSlides - 1, idx));

                setActiveIndex(clamped);
                updateNav(clamped);
            }, 120);
        };

        el.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            if (scrollEndTimer.current) window.clearTimeout(scrollEndTimer.current);
            el.removeEventListener('scroll', onScroll);
        };
    }, [activeIndex, totalSlides, updateNav]);

    // ✅ 리사이즈 시 잘림/어긋남 방지 (현재 index에 맞춰 즉시 스냅)
    useEffect(() => {
        const onResize = () => {
            scrollToIndex(activeIndex, 'auto');
            updateNav(activeIndex);
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [activeIndex, scrollToIndex, updateNav]);

    return (
        <main className={styles.page}>
            <InsaroadFootBackground src={insaroadBgImg} />

            <div className={`${styles.container} ${isPhotoOpen ? styles.dimmed : ''}`}>
                <Header />

                <section className={styles.section}>
                    <NumTitle text="당신의 번호는..." />
                    <UnderBarRow digits={digits} ariaLabel="당신의 3자리 번호" />
                    <DescriptionText />
                </section>

                <section className={styles.section}>
                    <PlaceTitle text="다음 장소는..." />

                    {/* ✅ 가로 캐러셀 */}
                    <div className={styles.carousel} aria-label="장소 정보 가로 탐색">
                        {/* ✅ 버튼은 항상 렌더링: 위치 고정, 보임/숨김만 처리 */}
                        <button
                            type="button"
                            className={`${styles.navBtn} ${styles.navLeft} ${!canPrev ? styles.navHidden : ''}`}
                            onClick={handlePrev}
                            aria-label="이전 장소"
                            disabled={!canPrev}
                        >
                            <img
                                className={styles.navIcon}
                                src={arrowLeftImg}
                                alt=""
                                aria-hidden
                            />
                        </button>

                        <button
                            type="button"
                            className={`${styles.navBtn} ${styles.navRight} ${!canNext ? styles.navHidden : ''}`}
                            onClick={handleNext}
                            aria-label="다음 장소"
                            disabled={!canNext}
                        >
                            <img
                                className={styles.navIcon}
                                src={arrowRightImg}
                                alt=""
                                aria-hidden
                            />
                        </button>

                        <div
                            ref={scrollerRef}
                            className={styles.scroller}
                            role="group"
                            aria-roledescription="carousel"
                            aria-label="장소 캐러셀"
                        >
                            {slides.map((s) => (
                                <div key={s.id} className={styles.slide}>
                                    {/* ✅ 반응형 중앙정렬 + 잘림 방지: inner로 폭 제어 */}
                                    <div className={styles.slideInner}>
                                        <MapPlaceholder label={s.mapLabel} />
                                        <PlaceCard
                                            nameKo={s.place.nameKo}
                                            nameEn={s.place.nameEn}
                                            addressKo={s.place.addressKo}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ActionLinks
                        onOpenKakaoDirections={onOpenKakaoDirections}
                        onOpenKioskPhoto={handleOpenPhoto}
                    />
                </section>
            </div>

            {isPhotoOpen && <PhotoModal imageSrc={placeImg} onClose={handleClosePhoto} />}
        </main>
    );
};

export default NextPlacePage;
