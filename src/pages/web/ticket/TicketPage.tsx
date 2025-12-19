import React, { useCallback, useMemo, useState } from 'react';
import styles from './TicketPage.module.css';

import InsaroadFootBackground from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

import ticketImg from '@/assets/web/ticket.png';
import storePhotoImg from '@/assets/web/place.png';

import { Header } from '@/components/web/nextPlace/Header';
import { PlaceCard } from '@/components/web/nextPlace/PlaceCard';
import { ActionLinks } from '@/components/web/nextPlace/ActionLinks';

import { TicketTitle } from '@/components/web/ticket/TicketTitle';
import { TicketBlock } from '@/components/web/ticket/TicketBlock';
import { StorePhotoModal } from '@/components/web/ticket/StorePhotoModal';
import { KakaoMap } from '@/components/web/nextPlace/KakaoMap';

type TicketPageProps = {
    place?: {
        nameKo: string;
        nameEn: string;
        addressKo: string;
    };
    // 이제 길찾기는 여기에서 직접 처리하니까, 상위에서 override 안 써도 됨(옵션으로만 둠)
    onOpenKakaoDirections?: () => void;
    onDownloadTicket?: () => void;
};

const ANNYEONG_INSADONG_LAT = 37.5745329;
const ANNYEONG_INSADONG_LNG = 126.9834556;

export const TicketPage: React.FC<TicketPageProps> = ({
    place = {
        nameKo: '안녕 인사동',
        nameEn: 'Hello Insadong',
        addressKo: '서울특별시 종로구 인사동길 49',
    },
    onOpenKakaoDirections,
    onDownloadTicket,
}) => {
    const [isStorePhotoOpen, setIsStorePhotoOpen] = useState(false);

    const dimClass = useMemo(
        () => (isStorePhotoOpen ? styles.dimmed : ''),
        [isStorePhotoOpen]
    );

const handleKakaoDirections = useCallback(() => {
    if (onOpenKakaoDirections) {
        onOpenKakaoDirections();
        return;
    }

    const name = encodeURIComponent('안녕 인사동');
    const lat = 37.574407774;
    const lng = 126.983546688;

    const url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;

    window.open(url, '_blank', 'noopener,noreferrer');
}, [onOpenKakaoDirections]);

    return (
        <main className={styles.page}>
            {/* 배경은 항상 최하단 */}
            <InsaroadFootBackground src={insaroadBgImg} />

            {/* 모달 열리면 배경만 30% */}
            <div className={`${styles.container} ${dimClass}`}>
                <Header />

                {/* 상단: 축하 문구 + 티켓 블록 */}
                <section className={styles.topSection}>
                    <TicketTitle
                        lines={[
                            '축하합니다!!',
                            '교환권으로 인사동의 명물인 매듭을 받아보세요!',
                        ]}
                    />

                    <TicketBlock
                        ticketSrc={ticketImg}
                        subTitle="교환권을 가게 카운터에 제시해주세요!"
                        downloadLabel="교환권 다운로드 받기"
                        onDownload={onDownloadTicket}
                    />
                </section>

                {/* 하단: 장소 + 지도 + 정보 + 액션 */}
                <section className={styles.bottomSection}>
                    <h2 className={styles.placeTitle}>매듭을 받는 장소는...</h2>

                    {/* ✅ 실제 카카오 지도 영역: 안녕 인사동 고정 */}
                    <div
                        style={{
                            width: '100%',
                            height: '240px',
                            marginBottom: '16px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                        }}
                    >
                        <KakaoMap
                            latitude={ANNYEONG_INSADONG_LAT}
                            longitude={ANNYEONG_INSADONG_LNG}
                        />
                    </div>

                    <PlaceCard
                        nameKo={place.nameKo}
                        nameEn={place.nameEn}
                        addressKo={place.addressKo}
                    />

                    <ActionLinks
                        onOpenKakaoDirections={handleKakaoDirections}
                        onOpenKioskPhoto={() => setIsStorePhotoOpen(true)}
                    />
                </section>
            </div>

            {/* 가게 사진 모달 */}
            {isStorePhotoOpen && (
                <StorePhotoModal
                    imageSrc={storePhotoImg}
                    onClose={() => setIsStorePhotoOpen(false)}
                />
            )}
        </main>
    );
};

export default TicketPage;