import { useNavigate } from 'react-router-dom';
import btnBackward from '@/assets/kiosk/btn-backward.png';
import styles from './BackwardButton.module.css';
export default function BackwardButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <img
            className={styles['btn-backward']}
            alt="go back"
            src={btnBackward}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        />
    );
}
