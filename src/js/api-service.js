import axios from 'axios';
import refs from './refs';
import renderGallery from './render-service';
import lightbox from './modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const KEY = '29058124-a322c4fcd8952bb4320420928';
const API_URL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

let page;
let searchQuery;

async function searchImages(event) {
  event.preventDefault();
  let query = event.currentTarget.elements.searchQuery.value;
  if (!query) {
    return;
  }
  page = 1;
  refs.galleryRef.innerHTML = '';
  refs.loadMoreBtnRef.classList.add('is-hidden');

  await axios
    .get(API_URL, {
      params: {
        q: query,
        page,
        per_page: 40,
      },
    })
    .then(response => {
      if (response.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.upBtnRef.classList.add('is-hidden');
        return;
      }
      searchQuery = query;

      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      refs.loadMoreBtnRef.classList.remove('is-hidden');
      renderGallery(response.data.hits);
      lightbox.refresh();
      let lastPage = Math.ceil(response.data.totalHits / 40);
      if (lastPage === page) {
        refs.loadMoreBtnRef.classList.add('is-hidden');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

async function searchMore() {
  page = page + 1;
  await axios
    .get(API_URL, {
      params: {
        q: searchQuery,
        page,
        per_page: 40,
      },
    })
    .then(response => {
      let lastPage = Math.ceil(response.data.totalHits / 40);

      renderGallery(response.data.hits);
      if (lastPage === page) {
        refs.loadMoreBtnRef.classList.add('is-hidden');
        Notify.warning(
          `We're sorry, but you've reached the end of search results.`
        );
      }
      lightbox.refresh();
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 1.5,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.error(error);
    });
}

export { searchImages, searchMore };
