type FallbackProps = {
  error: Error;
};

export const Fallback = ({ error }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};
