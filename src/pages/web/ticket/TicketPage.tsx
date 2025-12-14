import React, { useMemo, useState } from 'react';
import styles from './TicketPage.module.css';

import InsaroadFootBackground from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

import ticketImg from '@/assets/web/ticket.png'; // ✅ ticket.png 넣어주세요
import storePhotoImg from '@/assets/web/place.png'; // ✅ 가게 사진(예시) 넣어주세요

import { Header } from '@/components/web/nextPlace/Header';
import { MapPlaceholder } from '@/components/web/nextPlace/MapPlaceholder';
import { PlaceCard } from '@/components/web/nextPlace/PlaceCard';
import { ActionLinks } from '@/components/web/nextPlace/ActionLinks';

import { TicketTitle } from '@/components/web/ticket/TicketTitle';
import { TicketBlock } from '@/components/web/ticket/TicketBlock';
import { StorePhotoModal } from '@/components/web/ticket/StorePhotoModal';

type TicketPageProps = {
    place?: {
        nameKo: string;
        nameEn: string;
        addressKo: string;
    };
    onOpenKakaoDirections?: () => void;
    onDownloadTicket?: () => void;
};

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

    return (
        <main className={styles.page}>
            {/* 배경은 항상 최하단 */}
            <InsaroadFootBackground src={insaroadBgImg} />

            {/* ✅ 모달 열리면 배경만 30% */}
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

                    <MapPlaceholder label="카카오 지도 영역(자리)" />

                    <PlaceCard
                        nameKo={place.nameKo}
                        nameEn={place.nameEn}
                        addressKo={place.addressKo}
                    />

                    <ActionLinks
                        onOpenKakaoDirections={onOpenKakaoDirections}
                        onOpenKioskPhoto={() => setIsStorePhotoOpen(true)}
                    />
                </section>
            </div>

            {/* ✅ 가게 사진 모달 */}
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
