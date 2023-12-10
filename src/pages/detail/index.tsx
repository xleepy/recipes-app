import { useRecipesApi } from '../../providers/recipes-api-provider';
import { useEffect, useState } from 'preact/hooks';
import { GetRecipeInformation200Response } from '../../api';
import styles from './detail.module.css';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const api = useRecipesApi();
  const [detail, setDetail] = useState<GetRecipeInformation200Response>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    const abortSignal = new AbortController();
    api
      .getRecipeInformation({ id: Number(id) }, { signal: abortSignal.signal })
      .then(setDetail)
      .finally(() => {
        setLoading(false);
      });
    return () => {
      abortSignal.abort();
    };
  }, [api, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!detail) {
    return <p>Failed to fetch</p>;
  }

  return (
    <div className={styles.detail}>
      <img src={detail.image} />
      {/* TODO fix dangerously set html */}
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.summary) }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(detail.instructions),
        }}
      />
    </div>
  );
};

export default Detail;
