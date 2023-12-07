import {
  createMarkupSelect,
  createMarkupCatInfo,
  onStart,
  onStartOk,
  onStartNotOk,
  onCheck,
  onStatusOk,
  onStatusNotOk,
} from './markup';
import Notiflix from 'notiflix';

const allParameters = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  BREEDS_END_POINT: '/breeds',
  SEARCH_END_POINT: '/images/search',
  API_KEY:
    'live_M0UW1pIqNDUHMsk829omTs9pLbOOPCqFHZrrxuqtRu734aLGOg4CW098pDNOSI2f',
};

const allReferences = {
  selectContainer: document.querySelector('.breed-select'),
  catContainer: document.querySelector('.cat-info'),
  loaderElement: document.querySelector('.loader'),
  errorElement: document.querySelector('.error'),
};

onStart(
  allReferences.loaderElement,
  allReferences.errorElement,
  allReferences.selectContainer,
  allReferences.catContainer
);

fetchBreeds(allParameters.API_KEY)
  .then(data => {
    console.log(data);
    onStartOk(
      allReferences.loaderElement,
      allReferences.errorElement,
      allReferences.selectContainer,
      allReferences.catContainer
    );
    allReferences.selectContainer.innerHTML = createMarkupSelect(data);
    allReferences.selectContainer.addEventListener(
      'change',
      onChangeSelectContainer
    );
  })
  .catch(error => {
    console.log('!fetchBreeds - ERROR!', error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    onStartNotOk(
      allReferences.loaderElement,
      allReferences.errorElement,
      allReferences.selectContainer,
      allReferences.catContainer
    );
  });

function fetchBreeds(api_key) {
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

function onChangeSelectContainer(evt) {
  const catCurrentId = evt.currentTarget.value;
  //
  //
  fetchBreedsCurrentId(allParameters.API_KEY)
    .then(data => {
      onStatusOk(
        allReferences.loaderElement,
        allReferences.errorElement,
        allReferences.selectContainer,
        allReferences.catContainer
      );
      allReferences.catContainer.innerHTML = createMarkupCatInfo(data);
    })
    .catch(error => {
      onStatusNotOk(
        allReferences.loaderElement,
        allReferences.errorElement,
        allReferences.selectContainer,
        allReferences.catContainer
      );
      console.log('!fetchBreedsCurrentId - ERROR!', error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
  //
  //
  //
  function fetchBreedsCurrentId(api_key) {
    const queryParameter = new URLSearchParams({
      breed_ids: catCurrentId,
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
}
