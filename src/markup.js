export function createMarkupSelect(arr) {
  return arr
    .map(
      ({ id, name }) => `
    <option value="${id}">${name}</option>
  `
    )
    .join('');
}
//
//
//
//
export function createMarkupCatInfo(arr) {
  const imgLink = arr[0].url;
  const array = arr[0].breeds;

  return array
    .map(
      ({ name, description, temperament }) => `
    <div class="div-card-cat">
      <img  class="img-card-cat" src="${imgLink}" alt="${name}" width="300">
      <div class="card-info-wrapper">
        <h2 class="title-card-info">${name}</h2>
        <p class="description-card-info">${description}<p>
        <p class="text-card-info">
          <span class="span-card-info">Temperament:</span>
      ${temperament}
        </p>
      </div>
    </div>
  `
    )
    .join('');
}

export function onStart(loading, error, divSelect, divContainer) {
  divSelect.style.display = 'none';
  divContainer.style.display = 'none';
  error.style.display = 'none';
}
export function onStartOk(loading, error, divSelect, divContainer) {
  divSelect.style.display = 'block';
  divContainer.style.display = 'none';
  error.style.display = 'none';
  loading.style.display = 'none';
}
export function onStartNotOk(loading, error, divSelect, divContainer) {
  divSelect.style.display = 'none';
  divContainer.style.display = 'none';
  error.style.display = 'none';
  loading.style.display = 'none';
}
export function onCheck(loading, error, divSelect, divContainer) {
  divSelect.style.display = 'block';
  divContainer.style.display = 'none';
  error.style.display = 'none';
  loading.style.display = 'block';
}
export function onStatusOk(loading, error, divSelect, divContainer) {
  divSelect.style.display = 'block';
  divContainer.style.display = 'block';
  error.style.display = 'none';
  loading.style.display = 'none';
}
export function onStatusNotOk(loading, error, divSelect, divContainer) {
  divSelect.style.display = 'block';
  divContainer.style.display = 'none';
  error.style.display = 'none';
  loading.style.display = 'none';
}
