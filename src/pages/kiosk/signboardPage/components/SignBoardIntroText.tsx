import React from 'react';
import styles from './SignBoardIntroText.module.css';

export const SignBoardIntroText: React.FC = () => {
    return (
        <section className={styles.section} aria-label="한글 간판 문화 소개">
            <p className={styles.paragraph}>
                인사동에서는 전통 문화를 지키기 위해 가게 이름을 한글로 적는
                <br />
                <strong className={styles.emphasis}> ‘한글 간판 문화’</strong>를 이어오고
                있어요.
            </p>

            <p className={styles.paragraph}>
                스타벅스, 메가커피 같은 브랜드도 이곳에서는 모두 한글 간판을 사용하며,
                <br />
                덕분에 거리 전체가 한국적인 멋을 그대로 담고 있어요.
            </p>

            <p className={styles.paragraphStrong}>
                한글만의 아름다움을 느끼며 인사동을 둘러보세요!
            </p>
        </section>
    );
};
