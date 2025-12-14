import React, { useMemo, useState } from 'react';
import styles from './NextPlacePage.module.css';

import InsaroadFootBackground from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

// UI components
import { Header } from '@/components/web/nextPlace/Header';
import { NumTitle } from '@/components/web/nextPlace/NumTitle';
import { UnderBarRow } from '@/components/web/nextPlace/UnderBarRow';
import { DescriptionText } from '@/components/web/nextPlace/DescriptionText';
import { PlaceTitle } from '@/components/web/nextPlace/PlaceTitle';
import { MapPlaceholder } from '@/components/web/nextPlace/MapPlaceholder';
import { PlaceCard } from '@/components/web/nextPlace/PlaceCard';
import { ActionLinks } from '@/components/web/nextPlace/ActionLinks';

// ✅ 추가: 모달 컴포넌트 (아래 2번에 파일 제공)
import { PhotoModal } from '@/components/web/nextPlace/PhotoModal';

import placeImg from '@/assets/web/place.png';

type NextPlacePageProps = {
    code?: string;
    place?: {
        nameKo: string;
        nameEn: string;
        addressKo: string;
    };
    onOpenKakaoDirections?: () => void;
    onOpenKioskPhoto?: () => void; // 외부에서 따로 쓰고 싶으면 유지
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
        // 외부 콜백도 필요하면 같이 실행
        onOpenKioskPhoto?.();
        setIsPhotoOpen(true);
    };

    const handleClosePhoto = () => {
        setIsPhotoOpen(false);
    };

    return (
        <main className={styles.page}>
            {/* 항상 제일 뒤 배경 */}
            <InsaroadFootBackground src={insaroadBgImg} />

            {/* ✅ 배경 디밍 대상: 컨테이너만 */}
            <div className={`${styles.container} ${isPhotoOpen ? styles.dimmed : ''}`}>
                <Header />

                <section className={styles.section}>
                    <NumTitle text="당신의 번호는..." />
                    <UnderBarRow digits={digits} ariaLabel="당신의 3자리 번호" />
                    <DescriptionText />
                </section>

                <section className={styles.section}>
                    <PlaceTitle text="다음 장소는..." />
                    <MapPlaceholder label="카카오 지도 영역(자리)" />
                    <PlaceCard
                        nameKo={place.nameKo}
                        nameEn={place.nameEn}
                        addressKo={place.addressKo}
                    />
                    <ActionLinks
                        onOpenKakaoDirections={onOpenKakaoDirections}
                        onOpenKioskPhoto={handleOpenPhoto}
                    />
                </section>
            </div>

            {/* ✅ 모달은 dim 영향 밖에 둬야 선명하게 보임 */}
            {isPhotoOpen && (
                <PhotoModal
                    imageSrc={placeImg} // TODO: 실제 이미지 경로로 교체
                    onClose={handleClosePhoto}
                />
            )}
        </main>
    );
};

export default NextPlacePage;
