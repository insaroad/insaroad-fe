import { Outlet } from 'react-router-dom';

/**
 * Web 전용 라우트 컨테이너
 * - 퍼블리싱 단계에서는 단순 Outlet
 * - 추후 공통 Header/Footer 추가 가능
 */
export default function WebLayout() {
    return <Outlet />;
}
