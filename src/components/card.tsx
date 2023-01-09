import { Recipe } from '../api';
import styles from './card.module.css';

type Props = {
  recipe: Recipe;
};

// TODO: improve info
const Info = ({ info, label }: { info: string | string[]; label: string }) => {
  return (
    <div className={styles.info}>
      <p>{`${label}:`}</p>
      {Array.isArray(info) ? <p>{info.join(',')}</p> : <p>{info}</p>}
    </div>
  );
};

export const Card = ({ recipe }: Props) => {
  const { image, label, dishType, dietLabels, ...rest } = recipe;

  const canRenderDishType = dishType && dishType.length > 0;
  const canRenderDietLabel = dietLabels && dietLabels.length > 0;

  return (
    <div className={styles.card}>
      {image && (
        <img
          className={styles.image}
          src={image}
          alt="recipe image"
          height={200}
        />
      )}
      <div className={styles.detail}>
        <h2 className={styles.title}>{label}</h2>
        {canRenderDishType && <Info label="Dish type" info={dishType} />}
        {canRenderDietLabel && <Info label="Diet label" info={dietLabels} />}
      </div>
    </div>
  );
};
