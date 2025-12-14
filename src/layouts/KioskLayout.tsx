import { Outlet } from 'react-router-dom';

/**
 * Kiosk 전용 라우트 컨테이너
 * - UI, 스타일, wrapper 없음
 * - 기존 화면에 0 영향
 */
export default function KioskLayout() {
    return <Outlet />;
}
