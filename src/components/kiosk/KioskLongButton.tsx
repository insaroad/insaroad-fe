import React, {
    useState,
    type JSX,
    type ButtonHTMLAttributes,
    type MouseEvent,
    type TouchEvent,
} from 'react';
import btnBackgroundLong from '@/assets/kiosk/btn-background-long.svg';
import { getKioskButtonStyle } from '@/utils/kiosk/getKiosButtonStyle';
// import { getKioskButtonStyle } from '@/utils/kioskButtonStyle';

/* [ ButtonHTMLAttributes<HTMLButtonElement> ]
-> react에서 사용되는 타입들 중 하나
-> React의 타입 정의 파일 @types/react 패키지에서 제공됨
-> ts를 사용하는 리액트 플젝에서 jsx 요소에 올바른 속성을 지정할 수 있도록 도와주는 타입이다
- ButtonHTMLAttributes<T> : html <button> 요소에 적용할 수 있는 모든 표준 속성들(onClick, disabled 등)을 포함하는 타입
- HTMLButtonElement: <button> 태그 의미

=> 이 클래스는 해당 버튼에 들어가는 속성들을 정의하는 역할을 한다.
*/
interface KioskLongButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

/* [KioskLongButton]
- 키오스크에서 사용되는 긴 버튼 컴포넌트

*/
export default function KioskLongButton({
    text,
    ...rest
}: KioskLongButtonProp): JSX.Element {
    // 버튼 눌렸는지 안눌렸는지 확인용 useState 선언
    const [pressed, setPressed] = useState(false);

    // 1. 버튼을 누르기 시작할 때 실행되는 함수
    const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
        setPressed(true);

        /* ? : Optional Chaning
            - rest.onMouseDown이 있으면 실행하고 없으면 무시한다는 뜻
            - 해당 속성이 있다면 e(이벤트 객체)를 넘겨서 실행시킨다는 의미
        */
        rest.onMouseDown?.(e);
    };

    // 2. 버튼을 누른 것을 뗄 때 실행되는 함수
    const handleMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
        setPressed(false);
        rest.onMouseUp?.(e);
    };

    // 3. 버튼을 누른 채로 버튼 영역 밖으로 벗어날 때 실행될 함수
    const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
        setPressed(false);
        rest.onMouseLeave?.(e);
    };

    // 4. 손가락으로 화면을 터치해서 버튼을 누르는 순간 실행될 함수
    const handleTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
        setPressed(true);
        rest.onTouchStart?.(e);
    };

    // 5. 손가락으로 화면을 터치해서 버튼을 누른 것을 떼는 순간 실행될 함수
    const handleTouchEnd = (e: TouchEvent<HTMLButtonElement>) => {
        setPressed(false);
        rest.onTouchEnd?.(e);
    };

    return (
        <button
            type="button"
            className="kiosk-btn"
            {...rest}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={getKioskButtonStyle({ pressed })}
        >
            <div className="btn-text">{text}</div>
            <img
                className="btn-background-long"
                alt="Btn background"
                src={btnBackgroundLong}
            />
        </button>
    );
}
