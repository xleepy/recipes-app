import { RoutableProps } from 'preact-router';
import { useRecipesApi } from '../../providers/recipes-api-provider';
import { useEffect, useState } from 'preact/hooks';
import { GetRecipeInformation200Response } from '../../api';
import styles from './detail.module.css';

type Props = RoutableProps & { id?: number };

export const Detail = ({ id }: Props) => {
  const api = useRecipesApi();
  const [detail, setDetail] = useState<GetRecipeInformation200Response>();

  useEffect(() => {
    if (!id) {
      return;
    }
    const abortSignal = new AbortController();
    api
      .getRecipeInformation({ id }, { signal: abortSignal.signal })
      .then(setDetail);
    return () => {
      abortSignal.abort();
    };
  }, [api, id]);

  if (!detail) {
    return <p>Loading...</p>;
  }
  console.log('detail', detail);
  return (
    <div className={styles.detail}>
      <img src={detail.image} />
      {/* TODO fix dangerously set html */}
      <div dangerouslySetInnerHTML={{ __html: detail.summary }} />
      <div dangerouslySetInnerHTML={{ __html: detail.instructions }} />
    </div>
  );
};
