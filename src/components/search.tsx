import styles from './search.module.css';
import { useRef } from 'preact/hooks';
import { useSelectionContext } from '../app-context';

// reference: https://github.com/microsoft/fluentui/blob/master/packages/react-hooks/src/useConst.ts
function useConst<T>(initialValue: T | (() => T)) {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    ref.current = {
      value:
        typeof initialValue === 'function'
          ? (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
}

export const Search = () => {
  const { searchRecipesByParams } = useSelectionContext();
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const [input] = formElement.elements;
        const query = (input as HTMLInputElement).value;
        searchRecipesByParams({ q: query });
      }}
    >
      <input className={styles.search} type="text" placeholder="Enter query" />
      <button type="submit">Search</button>
    </form>
  );
};
