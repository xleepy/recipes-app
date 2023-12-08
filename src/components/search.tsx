import styles from './search.module.css';

type SearchProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export const Search = ({ value, onValueChange }: SearchProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onValueChange(e.currentTarget.value)}
      className={styles.search}
      type="text"
      placeholder="Enter query"
    />
  );
};
