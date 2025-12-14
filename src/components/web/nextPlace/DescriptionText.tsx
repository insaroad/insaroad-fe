import React from 'react';
import styles from './DescriptionText.module.css';

export const DescriptionText: React.FC = () => {
    return (
        <p className={styles.desc}>
            <span className={styles.line}>키오스크에서</span>
            <span className={styles.line}>
                <span className={styles.highlightWrap}>
                    <span className={styles.highlightBg} aria-hidden="true" />
                    <span className={styles.highlightText}>
                        &quot;이벤트 이어서 진행하기&quot;
                    </span>
                </span>
            </span>
            <span className={styles.line}>버튼을 누르고 해당 번호를 입력해주세요!</span>
        </p>
    );
};
export default DescriptionText;
