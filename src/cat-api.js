import { onCheck } from './markup';
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

export function fetchBreedsCurrentId(api_key, catId) {
  const queryParameter = new URLSearchParams({
    breed_ids: catId,
    api_key,
  });
  onCheck(
    allReferences.loaderElement,
    allReferences.errorElement,
    allReferences.selectContainer,
    allReferences.catContainer
  );
  return fetch(
    `${allParameters.BASE_URL}${allParameters.SEARCH_END_POINT}?${queryParameter}`
  ).then(result => {
    if (!result) {
      throw new Error(result.statusText);
    }

    return result.json();
  });
}
