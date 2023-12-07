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
