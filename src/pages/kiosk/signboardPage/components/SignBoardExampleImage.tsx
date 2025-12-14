import React from 'react';
import styles from './SignBoardExampleImage.module.css';

interface SignBoardExampleImageProps {
    src: string;
    alt?: string;
    /** px 단위. 미지정 시 CSS에서 max-width로 제어 */
    width?: number;
}

export const SignBoardExampleImage: React.FC<SignBoardExampleImageProps> = ({
    src,
    alt = '한글 간판 예시 이미지',
    width,
}) => {
    return (
        <figure className={styles.figure} style={width ? { width } : undefined}>
            <img
                className={styles.image}
                src={src}
                alt={alt}
                loading="eager"
                decoding="async"
            />
        </figure>
    );
};
