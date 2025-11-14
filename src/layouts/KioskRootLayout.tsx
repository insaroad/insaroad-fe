/* [ KioskRootLayout.tsx ] */
import { type JSX, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/kiosk/KioskRootLayout/Header';
import Footer from '@/components/kiosk/KioskRootLayout/Footer';
import Body from '@/components/kiosk/KioskRootLayout/Body';

export default function KioskRootLayout(): JSX.Element {
    const location = useLocation();

    // 현재 경로에 따라 header/footer 텍스트 결정 (useLocation() 사용)
    // useMemo() : 계산 최적화 훅
    const { headerText, footerText } = useMemo(() => {
        switch (location.pathname) {
            case '/kiosk/description': // 서비스 설명 페이지
                return {
                    headerText: 'Service Description',
                    footerText: 'Select Starting Point',
                };
            case '/kiosk/custom': // custom route 선택 페이지
                return {
                    headerText: 'Select Starting Point',
                    footerText: 'Start Stamp Tour',
                };
            case '/kiosk/hot': // hot route 선택 페이지
                return {
                    headerText: 'Explore Hot Course',
                    footerText: 'View Selected Route',
                };
            case '/kiosk/hot/detail': // hot route의 상세 정보 페이지
                return {
                    headerText: 'Explore Hot Course',
                    footerText: 'Choose this route?',
                };
            case '/kiosk/qr': // QR코드 열람 페이지
                return {
                    headerText: 'Start Stamp Tour!',
                    footerText: '',
                };
            default:
                return {
                    headerText: '',
                    footerText: '',
                };
        }
    }, [location.pathname]);

    return (
        <div className="kiosk">
            <Header titleText={headerText} />
            <Body />
            <Footer text={footerText} />
        </div>
    );
}
