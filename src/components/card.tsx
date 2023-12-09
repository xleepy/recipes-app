import { useNavigate } from 'react-router-dom';
import styles from './card.module.css';

type Props = {
  id: number;
  image: string;
  title: string;
};

export const Card = ({ id, image, title }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/detail/${id}`);
      }}
      className={styles.card}
    >
      <img loading="lazy" className={styles.image} src={image} />
      <p>{title}</p>
    </div>
  );
};
