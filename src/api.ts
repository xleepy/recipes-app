// types from https://developer.edamam.com/edamam-docs-recipe-api

console.log('env key', import.meta.env.VITE_APP_ID);

const fetchData = (path: string, options?: RequestInit) => {
  return fetch(path, {
    ...options,
    headers: {
      ...options?.headers,
      'x-api-key': import.meta.env.VITE_APP_ID,
    },
  });
};

export type Recipe = {
  id: string;
  image: string;
  imageType: string;
  title: string;
};

type RecipesResponse = {
  results: Recipe[];
};

export const fetchRecipes = (query: string) => {
  return fetchData(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=100`
  )
    .then((res) => res.json() as Promise<RecipesResponse>)
    .then(({ results }) => {
      return results;
    });
};
