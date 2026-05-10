import refs from './refs';

function renderGallery(obj) {
  let markup = obj
    .map(
      image =>
        `
           <div class="photo-card">
      <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <i class="fa-solid fa-heart"></i>
          <b>${image.likes}</b>
        </p>
        <p class="info-item">
          <i class="fa-solid fa-eye"></i>
          <b>${image.views}</b>
        </p>
        <p class="info-item">
          <i class="fa-solid fa-comment"></i>
          <b>${image.comments}</b>
        </p>
        <p class="info-item">
          <i class="fa-solid fa-download"></i>
          <b>${image.downloads}</b>
        </p>
      </div>
    </div>
    `
    )
    .join('');

  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
  refs.upBtnRef.classList.remove('is-hidden');
}

export default renderGallery;
