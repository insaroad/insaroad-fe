import React from 'react';
import styles from './QuestionTitle.module.css';

interface QuestionTitleProps {
    text: string;
}

export const QuestionTitle: React.FC<QuestionTitleProps> = ({ text }) => {
    return <h2 className={styles.title}>{text}</h2>;
};

export default QuestionTitle;
