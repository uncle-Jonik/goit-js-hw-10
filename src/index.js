// import { fetchBreeds } from './cat-api';
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

fetchBreeds(allParameters.API_KEY)
  .then(data => {
    console.log(data);
    allReferences.selectContainer.insertAdjacentHTML(
      'beforeend',
      createMarkupSelect(data)
    );
    allReferences.selectContainer.addEventListener(
      'change',
      onChangeSelectContainer
    );
  })
  .catch(error => {
    console.log('!fetchBreeds - ERROR!', error);
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

function createMarkupSelect(arr) {
  return arr
    .map(
      ({ id, name }) => `
    <option value="${id}">${name}</option>
  `
    )
    .join('');
}

function onChangeSelectContainer(evt) {
  const catCurrentId = evt.currentTarget.value;
  //
  //
  fetchBreedsCurrentId(allParameters.API_KEY)
    .then(data => {
      // console.log(data);
      allReferences.catContainer.insertAdjacentHTML(
        'beforeend',
        createMarkupCatInfo(data)
      );
    })
    .catch(error => {
      console.log('!fetchBreedsCurrentId - ERROR!', error);
    });
  //
  //
  //
  function fetchBreedsCurrentId(api_key) {
    const queryParameter = new URLSearchParams({
      breed_ids: catCurrentId,
      api_key,
    });
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
function createMarkupCatInfo(arr) {
  const imgLink = arr[0].url;
  const array = arr[0].breeds;

  return array
    .map(
      ({ name, description, temperament }) => `
    <img src="${imgLink}" alt="${name}" width="300">
    <h2>${name}</h2>
    <p>${description}</p>
    <p>
    <span>Temperament:</span>
    ${temperament}
    </p>
  `
    )
    .join('');
}
