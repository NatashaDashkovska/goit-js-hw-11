const lightbox = new SimpleLightbox('.gallery a');

lightbox.on('show.simplelightbox', function () {
  event.preventDefault();
});

lightbox.on('error.simplelightbox', function (e) {
  console.log(e);
});

export default lightbox;
