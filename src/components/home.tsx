import { RoutableProps } from 'preact-router';
import { useCallback, useEffect } from 'preact/hooks';
import { Card } from './card';
import { Search } from './search';
import styles from './home.module.css';
import { useSelectionContext } from '../app-context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Home = (props: RoutableProps) => {
  const {
    selectRecipe: selectRecipeByIndex,
    recipes,
    isLoading,
    loadMore,
  } = useSelectionContext();

  const handleRecipeSelection = useCallback(
    (index: number) => {
      return () => {
        selectRecipeByIndex(index);
      };
    },
    [selectRecipeByIndex]
  );

  useEffect(() => {
    let bottomReached = false;
    function handleScroll() {
      if (
        !bottomReached &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        bottomReached = true;
        loadMore();
      }
    }

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [loadMore]);

  return (
    <div className={styles.homeContainer}>
      <Search />
      {isLoading && <p>Searching...</p>}
      <ul className={styles.cardContainer}>
        {recipes.map((recipe, idx) => {
          const handleClick = handleRecipeSelection(idx);
          return (
            <li key={`${recipe.id}-${idx}`} onClick={handleClick}>
              <Card recipe={recipe} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
