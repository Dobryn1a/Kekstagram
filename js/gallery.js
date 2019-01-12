'use strict';

(function () {

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

  bigPictureCancelElement.addEventListener('click', function () {
    closePhoto();
  });

  function closePhoto() {
    bigPictureElement.classList.add('hidden');
    bigPictureElement.querySelector('.comments-loader').removeEventListener('click', window.preview.loadComments);
  }

  function openPhoto() {
    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.social__comments').innerHTML = '';
    document.addEventListener('keydown', onPhotoEscPress);
  }

  function onPhotoEscPress(evt) {
    window.util.isEscEvent(evt, closePhoto);
  }

  window.gallery = {
    openPhoto: openPhoto
  };
})();
