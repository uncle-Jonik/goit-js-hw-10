import { allParameters } from './index';

export function fetchBreeds(api_key) {
  const queryParameter = new URLSearchParams({
    api_key,
  });

  return fetch(
    `${allParameters.BASE_URL}${allParameters.BREEDS_END_POINT}?${queryParameter}`
  ).then(result => {
    if (!result) {
      throw new Error(result.statusText);
    }

    return result.json();
  });
}
