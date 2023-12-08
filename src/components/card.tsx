import styles from './card.module.css';

type Props = {
  recipe: any;
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

  return <div className={styles.card}></div>;
};
