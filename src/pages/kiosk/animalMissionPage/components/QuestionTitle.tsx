import React from 'react';
import styles from './QuestionTitle.module.css';

interface QuestionTitleProps {
    text: string;
    marginTop?: number;
    marginBottom?: number;
}

export const QuestionTitle: React.FC<QuestionTitleProps> = ({
    text,
    marginTop = 250,
    marginBottom = 200,
}) => {
    return (
        <h2
            className={styles.title}
            style={{
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
            }}
        >
            {text}
        </h2>
    );
};

export default QuestionTitle;
