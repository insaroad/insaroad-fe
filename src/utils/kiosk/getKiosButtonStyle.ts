// src/utils/getKioskButtonStyle.ts

export interface KioskButtonStyleOptions {
    pressed: boolean;
}

export function getKioskButtonStyle({ pressed }: KioskButtonStyleOptions) {
    console.log('getKioskButtonStyle 실행 완료');
    return {
        // true면 크기 작게, false면 원본 크기
        transform: pressed ? 'scale(0.97)' : 'scale(1)',

        // true면 10% 어두워짐
        filter: pressed ? 'brightness(0.90)' : 'none',

        // 눌리는 애니메이션이 부드럽게 동작하도록 하는 설정
        transition:
            'transform 0.08s ease, box-shadow 0.12s ease, filter 0.12s ease',
    } as React.CSSProperties;
}
