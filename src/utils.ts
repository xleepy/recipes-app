export function getCorrectBasePath(path: string) {
  let baseUrl = import.meta.env.BASE_URL;
  if (!baseUrl.endsWith('/')) {
    baseUrl = `${baseUrl}/`;
  }
  return `${baseUrl}${path}`;
}
