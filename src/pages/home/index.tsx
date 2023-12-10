import { useEffect, useState } from 'preact/hooks';
import { Search } from '../../components/search';
import styles from './home.module.css';
import { Card } from '../../components/card';
import { useRecipesApi } from '../../providers/recipes-api-provider';
import { SearchRecipes200ResponseResultsInner } from '../../api';

const SEARCH_KEY = 'cached-search-key';

export const Home = () => {
  const [query, setQuery] = useState<string>(() => {
    return sessionStorage.getItem(SEARCH_KEY) ?? 'pasta';
  });
  const [recipes, setRecipes] = useState<
    SearchRecipes200ResponseResultsInner[]
  >([]);

  const api = useRecipesApi();

  useEffect(() => {
    if (query.length === 0) {
      return;
    }
    const timeoutId = setTimeout(() => {
      api
        .searchRecipes({ query, number: 100, instructionsRequired: true })
        .then(({ results }) => {
          setRecipes(Array.from(results));
        });
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, api]);

  const queryChange = (query) => {
    setQuery(query);
    sessionStorage.setItem(SEARCH_KEY, query);
  };

  return (
    <div>
      <Search value={query} onValueChange={queryChange} />
      <ul className={styles.cardContainer}>
        {recipes.map(({ id, image, title }) => {
          return <Card key={id} id={id} image={image} title={title} />;
        })}
      </ul>
    </div>
  );
};
