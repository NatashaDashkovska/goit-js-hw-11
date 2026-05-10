import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import refs from './js/refs';
import { searchImages, searchMore } from './js/api-service';

let page;
let searchQuery;

refs.formQueryRef.addEventListener('submit', searchImages);
refs.loadMoreBtnRef.addEventListener('click', searchMore);

