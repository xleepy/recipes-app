import { ChangeEventHandler } from 'react';
import styles from './search.module.css';

type SearchProps = {
  value?: string;
  onValueChange: ChangeEventHandler<HTMLInputElement>;
};

export const Search = ({ value, onValueChange }: SearchProps) => {
  return (
    <input
      data-testid="search"
      defaultValue={value}
      onChange={onValueChange}
      className={styles.search}
      type="text"
      placeholder="Enter query"
    />
  );
};
