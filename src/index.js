import {
  createMarkupSelect,
  createMarkupCatInfo,
  onStart,
  onStartOk,
  onStartNotOk,
  onStatusOk,
  onStatusNotOk,
} from './markup';
import { fetchBreeds, fetchBreedsCurrentId } from './cat-api';
import Notiflix from 'notiflix';

export const allParameters = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  BREEDS_END_POINT: '/breeds',
  SEARCH_END_POINT: '/images/search',
  API_KEY:
    'live_M0UW1pIqNDUHMsk829omTs9pLbOOPCqFHZrrxuqtRu734aLGOg4CW098pDNOSI2f',
};

export const allReferences = {
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

function onChangeSelectContainer(evt) {
  const catCurrentId = evt.currentTarget.value;

  fetchBreedsCurrentId(allParameters.API_KEY, catCurrentId)
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
}
