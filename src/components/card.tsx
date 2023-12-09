import styles from './card.module.css';
import { route, useRouter } from 'preact-router';

type Props = {
  id: number;
  image: string;
  title: string;
};

export const Card = ({ id, image, title }: Props) => {
  return (
    <div
      onClick={() => {
        route(`${import.meta.env.BASE_URL}/detail/${id}`);
      }}
      className={styles.card}
    >
      <img loading="lazy" className={styles.image} src={image} />
      <p>{title}</p>
    </div>
  );
};
