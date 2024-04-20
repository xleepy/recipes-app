import { useRecipesApi } from '../../providers/recipes-api-provider';
import styles from './detail.module.css';
import { useParams } from 'react-router-dom';
import { Chip } from '../../components/chip';
import DOMPurify from 'dompurify';
import { DetailCell } from '../../components/detail-cell';
import { List } from '../../components/list';
import { GetRecipeInformation200Response } from '../../api';
import { Suspense, use } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../../components/fallback';

type Item = {
  id: number;
  image: string;
  localizedName: string;
  name: string;
};

type Step = {
  number: number;
  step: string;
  ingredients: Item[];
  equipment: Item[];
};

type AnalyzedInstruction = {
  name: string;
  steps: Step[];
};

type DetailProps = {
  detailPromise: Promise<GetRecipeInformation200Response>;
};

const Detail = ({ detailPromise }: DetailProps) => {
  const {
    title,
    dishTypes,
    vegetarian,
    healthScore,
    summary,
    analyzedInstructions = [],
    extendedIngredients,
    image,
  } = use(detailPromise);

  const [{ steps = [] }] = analyzedInstructions as AnalyzedInstruction[];

  const ingredients = Array.from(extendedIngredients);

  return (
    <div
      data-testid="detail"
      className={`gap-l flex flex-wrap flex-justify-center`}
    >
      <DetailCell>
        <img className={styles.image} src={image} alt="recipe" />
      </DetailCell>
      <DetailCell className="flex flex-column gap-s">
        <h2>{title}</h2>
        <div className={`flex flex-wrap flex-justify-center gap-s`}>
          {dishTypes.map((type, idx) => (
            <Chip name={type} key={idx} />
          ))}
          {vegetarian && <Chip name="vegetarian" />}
        </div>
        <div className="flex flex-wrap">
          <p>{`Health score: ${healthScore}`}</p>
        </div>
        <p
          className="text-left"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }}
        />
      </DetailCell>
      <DetailCell className="text-left">
        <List title="Ingredients">
          {ingredients.map((ingredient, idx) => {
            return (
              <li
                key={`${ingredient.id}-${idx}`}
                className={`flex gap-s ${styles.ingredient} flex-align-center`}
              >
                <img
                  height={30}
                  width={30}
                  alt="ingredient"
                  className={styles.ingredientImage}
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                />
                <span>{`${ingredient.original}`} </span>
              </li>
            );
          })}
        </List>
      </DetailCell>
      <DetailCell>
        <List as="ol" title="Steps">
          {steps.map((step) => {
            return <li key={step.number}>{step.step}</li>;
          })}
        </List>
      </DetailCell>
    </div>
  );
};

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const api = useRecipesApi();

  const promise = api.getRecipeInformation({ id: Number(id) });

  return (
    <ErrorBoundary FallbackComponent={Fallback} resetKeys={[id]}>
      <Suspense fallback={<p>Loading...</p>}>
        <Detail detailPromise={promise} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default DetailPage;
