import { useNavigate } from 'react-router-dom';
import styles from './card.module.css';

type Props = {
  id: number;
  image: string;
  title: string;
};

export const Card = ({ id, image, title }: Props) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <div
      data-testid="card"
      onClick={navigateToDetail}
      onKeyPress={navigateToDetail}
      className={styles.card}
      role="button"
      tabIndex={0}
    >
      <img loading="lazy" alt="preview" className={styles.image} src={image} />
      <p>{title}</p>
    </div>
  );
};
