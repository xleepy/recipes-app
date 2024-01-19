import styles from './search.module.css';

type SearchProps = {
  value?: string;
  onValueChange: (event: Event) => void;
};

export const Search = ({ value, onValueChange }: SearchProps) => {
  return (
    <input
      data-testid="search"
      value={value}
      onChange={onValueChange}
      className={styles.search}
      type="text"
      placeholder="Enter query"
    />
  );
};
