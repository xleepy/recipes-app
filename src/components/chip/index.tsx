import styles from './chip.module.css';

type ChipProps = {
  name: string;
};

export const Chip = ({ name }: ChipProps) => {
  return (
    <div className={styles.chip}>
      <span className={styles.text}>{name}</span>
    </div>
  );
};
