import { ComponentChildren } from 'preact';

type ListProps = {
  title?: string;
  children: ComponentChildren;
  as?: 'ul' | 'ol';
  className?: string;
  listClassName?: string;
};

export const List = ({
  as: Component = 'ul',
  className = '',
  title,
  children,
  listClassName,
}: ListProps) => {
  return (
    <div className={`text-left ${className}`}>
      {title && <h3>{title}</h3>}
      <Component className={listClassName}>{children}</Component>
    </div>
  );
};
