// src/components/kiosk/common/ImageButton.tsx
import React from 'react';
import styles from './ImageButton.module.css';

interface ImageButtonProps {
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
    alt?: string;
    onClick?: () => void;
}

export const ImageButton: React.FC<ImageButtonProps> = ({
    src,
    width,
    height,
    x,
    y,
    alt = 'button',
    onClick,
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={styles.button}
            style={{
                width,
                height,
                left: x,
                top: y,
            }}
            onClick={onClick}
        />
    );
};

export default ImageButton;
