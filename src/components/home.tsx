import { RoutableProps, route } from 'preact-router';
import { useCallback } from 'preact/hooks';
import { Card } from './card';
import { Search } from './search';
import styles from './home.module.css';
import { useSelectionContext } from '../app-context';

export const Home = (props: RoutableProps) => {
  const {
    selectRecipe: selectRecipeByIndex,
    recipes,
    isLoading,
  } = useSelectionContext();

  const handleRecipeSelection = useCallback(
    (index: number) => {
      return () => {
        selectRecipeByIndex(index);
      };
    },
    [recipes]
  );

  return (
    <div className={styles.homeContainer}>
      <Search />
      {isLoading && <p>Searching...</p>}
      <ul className={styles.cardContainer}>
        {recipes.map((recipe, idx) => {
          const handleClick = handleRecipeSelection(idx);
          return (
            <li onClick={handleClick}>
              <Card key={`${recipe.label}-${idx}`} recipe={recipe} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
