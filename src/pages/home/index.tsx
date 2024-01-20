import { useState } from 'preact/hooks';
import { Search } from '../../components/search/search';
import styles from './home.module.css';
import { Card } from '../../components/card/card';
import { useRecipesApi } from '../../providers/recipes-api-provider';
import { useDebounceCallback } from '../../hooks';
import { useQuery } from '@tanstack/react-query';

const SEARCH_KEY = 'cached-search-key';

export const Home = () => {
  const [search, setSearch] = useState<string>(() => {
    return sessionStorage.getItem(SEARCH_KEY) ?? 'pasta';
  });

  const api = useRecipesApi();
  const { data } = useQuery({
    queryKey: [search],
    queryFn: ({ queryKey }) => {
      const [key] = queryKey;
      return api
        .searchRecipes({ query: key, number: 100, instructionsRequired: true })
        .then(({ results }) => Array.from(results));
    },
  });

  const queryChange = useDebounceCallback(
    (event: Event) => {
      const value = (event.target as HTMLInputElement).value.trim();
      if (value.length) {
        setSearch(value);
        sessionStorage.setItem(SEARCH_KEY, value);
      }
    },
    500,
    []
  );

  return (
    <div>
      <Search value={search} onValueChange={queryChange} />
      <ul className={styles.cardContainer}>
        {data &&
          data.map(({ id, image, title }) => {
            return <Card key={id} id={id} image={image} title={title} />;
          })}
      </ul>
    </div>
  );
};
