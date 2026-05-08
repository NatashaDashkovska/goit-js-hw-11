const KEY = '29058124-a322c4fcd8952bb4320420928';
const API_URL = `https://pixabay.com/api/?key=${KEY}&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true`;

const galleryRef = document.querySelector('.gallery');

function searchImages() {
  return fetch(API_URL)
    .then(res => res.json())
    .then(res => renderGallery(res.hits))
    .catch(error => console.log(error));
}

searchImages();

function renderGallery(obj) {
  let aaa = obj
    .map(
      image =>
        `
    <div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" data-image="${image.largeImageURL}"/>
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

  galleryRef.innerHTML = aaa;
}
