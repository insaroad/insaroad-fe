import React from 'react';
import styles from './Decor.module.css';
import questionImg from '@/assets/kiosk/question.png';

export const QuestionDecor: React.FC = () => {
    return <img src={questionImg} alt="question" className={styles.question} />;
};

export default QuestionDecor;
