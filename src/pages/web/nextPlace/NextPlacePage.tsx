import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { KakaoMap } from '@/components/web/nextPlace/KakaoMap';

import styles from './NextPlacePage.module.css';

import { api } from '@/api/axios';

// Assets
import InsaroadFootBackground from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';
import placeImg from '@/assets/web/place.png';
import arrowLeftImg from '@/assets/web/arrow-left.png';
import arrowRightImg from '@/assets/web/arrow-right.png';

// Components
import { Header } from '@/components/web/nextPlace/Header';
import { NumTitle } from '@/components/web/nextPlace/NumTitle';
import { UnderBarRow } from '@/components/web/nextPlace/UnderBarRow';
import { DescriptionText } from '@/components/web/nextPlace/DescriptionText';
import { PlaceTitle } from '@/components/web/nextPlace/PlaceTitle';
import { MapPlaceholder } from '@/components/web/nextPlace/MapPlaceholder';
import { PlaceCard } from '@/components/web/nextPlace/PlaceCard';
import { ActionLinks } from '@/components/web/nextPlace/ActionLinks';
import { PhotoModal } from '@/components/web/nextPlace/PhotoModal';

// TicketPage Component
import TicketPage from '../ticket/TicketPage';

// ----------------------------------------------------------------------
// 1. 타입 정의
// ----------------------------------------------------------------------

interface LocationData {
    id: number;
    name: string;
    nameEn: string;
    description: string;
    address: string;
    imageUrl: string;
    latitude: number | null;
    longitude: number | null;

    // 백엔드가 내려줘도 되고 안 내려줘도 됨(이제 프론트에서 생성)
    kakaoMapUrl?: string | null;
}

interface GameProgressData {
    completed: boolean;
    complete?: {
        userCode: string;
        unvisitedLocations: LocationData[];
    };
    finish?: {
        exchangeUrl: string;
        issuedAt: string;
    };
}

interface ApiResponse<T> {
    success: boolean;
    code: number;
    message: string;
    data: T;
}

type NextPlacePageProps = {
    code?: string;
    onOpenKakaoDirections?: () => void;
    onOpenKioskPhoto?: () => void;
};

// ----------------------------------------------------------------------
// 2. URL Builder (프론트에서 생성)
// ----------------------------------------------------------------------

const isValidLatLng = (lat?: number | null, lng?: number | null) => {
    if (typeof lat !== 'number' || typeof lng !== 'number') return false;
    if (Number.isNaN(lat) || Number.isNaN(lng)) return false;
    if (Math.abs(lat) > 90) return false;
    if (Math.abs(lng) > 180) return false;
    return true;
};

/**
 * 카카오 길찾기(목적지) 링크
 * - 좌표 기반이 가장 정확함
 * - https://map.kakao.com/link/to/{name},{lat},{lng}
 */
const buildKakaoDirectionsUrl = (name: string, lat: number, lng: number) => {
    const encodedName = encodeURIComponent(name ?? '');
    return `https://map.kakao.com/link/to/${encodedName},${lat},${lng}`;
};

// ----------------------------------------------------------------------
// 3. 메인 컴포넌트
// ----------------------------------------------------------------------

export const NextPlacePage: React.FC<NextPlacePageProps> = ({
    code: propCode,
    onOpenKakaoDirections,
    onOpenKioskPhoto,
}) => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('userCode') || propCode || '000';

    const [isLoading, setIsLoading] = useState(true);
    const [gameData, setGameData] = useState<GameProgressData | null>(null);
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);

    useEffect(() => {
        if (!code || code === '000') {
            setIsLoading(false);
            return;
        }

        const fetchProgress = async () => {
            try {
                setIsLoading(true);

                const response = await api.get<ApiResponse<GameProgressData>>('/api/games/progress', {
                    params: { userCode: code },
                });

                const { success, data, message } = response.data;

                if (success) {
                    setGameData(data);
                } else {
                    console.error('API Error:', message);
                }
            } catch (error) {
                console.error('Failed to fetch game progress:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProgress();
    }, [code]);

    const digits = useMemo(
        () => code.replace(/\D/g, '').slice(-3).padStart(3, '0').split(''),
        [code]
    );

    const handleOpenPhoto = () => {
        onOpenKioskPhoto?.();
        setIsPhotoOpen(true);
    };

    const slides = useMemo(() => {
        if (!gameData?.complete?.unvisitedLocations) return [];

        return gameData.complete.unvisitedLocations.map((loc) => ({
            id: `loc-${loc.id}`,
            mapLabel: '카카오 지도 영역',
            place: {
                nameKo: loc.name,
                nameEn: loc.nameEn || '',
                addressKo: loc.address,
            },
            imageUrl: loc.imageUrl,
            latitude: loc.latitude,
            longitude: loc.longitude,
        }));
    }, [gameData]);

    const totalSlides = slides.length;
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(totalSlides > 1);

    const handleKakaoDirections = () => {
        const currentSlide = slides[activeIndex];
        if (!currentSlide) return;

        const name = currentSlide.place.nameKo;
        const lat = currentSlide.latitude;
        const lng = currentSlide.longitude;

        if (isValidLatLng(lat, lng)) {
            const url = buildKakaoDirectionsUrl(name, lat!, lng!);
            window.open(url, '_blank');
            return;
        }

        // 좌표가 없거나 이상하면 기존 핸들러(백업) 또는 안내
        onOpenKakaoDirections?.();
        if (!onOpenKakaoDirections) {
            alert('길찾기 좌표 정보가 없습니다.');
        }
    };

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
        },
        [totalSlides]
    );

    const handlePrev = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);
    const handleNext = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);
    const scrollEndTimer = useRef<number | null>(null);

    useEffect(() => {
        setActiveIndex(0);
        updateNav(0);
        if (scrollerRef.current) scrollerRef.current.scrollTo({ left: 0 });
    }, [slides, updateNav]);

    useEffect(() => {
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
    }, [totalSlides, updateNav]);

    useEffect(() => {
        const onResize = () => {
            scrollToIndex(activeIndex, 'auto');
            updateNav(activeIndex);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [activeIndex, scrollToIndex, updateNav]);

    if (isLoading) {
        return (
            <main className={styles.page}>
                <InsaroadFootBackground src={insaroadBgImg} />
                <div
                    className={styles.container}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#555' }}>
                        데이터를 불러오는 중입니다...
                    </p>
                </div>
            </main>
        );
    }

    if (gameData?.completed) {
    return (
        <TicketPage
            onDownloadTicket={() => {
                if (gameData.finish?.exchangeUrl) {
                    window.open(gameData.finish.exchangeUrl, '_blank');
                } else {
                    alert('교환권 URL이 없습니다.');
                }
            }}
        />
    );
}

    if (slides.length === 0) {
        return (
            <main className={styles.page}>
                <InsaroadFootBackground src={insaroadBgImg} />
                <div className={styles.container}>
                    <Header />
                    <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
                        <p>방문할 장소 정보가 없습니다.</p>
                        <p style={{ fontSize: '0.9em', color: '#888' }}>userCode: {code}</p>
                    </div>
                </div>
            </main>
        );
    }

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

                    <div className={styles.carousel} aria-label="장소 정보 탐색">
                        <button
                            type="button"
                            className={`${styles.navBtn} ${styles.navLeft} ${
                                !canPrev ? styles.navHidden : ''
                            }`}
                            onClick={handlePrev}
                            aria-label="이전 장소"
                            disabled={!canPrev}
                        >
                            <img className={styles.navIcon} src={arrowLeftImg} alt="" aria-hidden />
                        </button>

                        <button
                            type="button"
                            className={`${styles.navBtn} ${styles.navRight} ${
                                !canNext ? styles.navHidden : ''
                            }`}
                            onClick={handleNext}
                            aria-label="다음 장소"
                            disabled={!canNext}
                        >
                            <img className={styles.navIcon} src={arrowRightImg} alt="" aria-hidden />
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
                                    <div className={styles.slideInner}>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '240px',
                                                marginBottom: '16px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {isValidLatLng(s.latitude, s.longitude) ? (
                                                <KakaoMap latitude={s.latitude!} longitude={s.longitude!} />
                                            ) : (
                                                <MapPlaceholder label={s.mapLabel} />
                                            )}
                                        </div>

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
                        onOpenKakaoDirections={handleKakaoDirections}
                        onOpenKioskPhoto={handleOpenPhoto}
                    />
                </section>
            </div>

            {isPhotoOpen && (
                <PhotoModal
                    imageSrc={slides[activeIndex]?.imageUrl || placeImg}
                    onClose={() => setIsPhotoOpen(false)}
                />
            )}
        </main>
    );
};

export default NextPlacePage;