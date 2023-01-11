import styles from './search.module.css';
import { useSelectionContext } from '../app-context';
import { useCallback } from 'preact/hooks';
import { useConst } from '../hook';

const queryKey = 'query';

export const Search = () => {
  const { searchRecipesByParams } = useSelectionContext();
  const initialQuery = useConst(() => {
    return sessionStorage.getItem(queryKey) ?? '';
  });

  const handleSubmit = useCallback(
    (event: Event) => {
      event.preventDefault();
      const formElement = event.target as HTMLFormElement;
      const [input] = formElement.elements;
      const query = (input as HTMLInputElement).value;
      sessionStorage.setItem(queryKey, query);
      searchRecipesByParams({ q: query });
    },
    [searchRecipesByParams]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.search}
        defaultValue={initialQuery}
        type="text"
        placeholder="Enter query"
      />
      <button type="submit">Search</button>
    </form>
  );
};
