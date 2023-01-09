import { RoutableProps } from 'preact-router';
import { useSelectionContext } from '../app-context';

type Props = RoutableProps;

export const Detail = (props: Props) => {
  const { recipe } = useSelectionContext();
  return (
    <div>
      {'TODO detail'}
      {JSON.stringify(recipe)}
    </div>
  );
};
