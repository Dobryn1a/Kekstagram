'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  bigPictureCancel.addEventListener('click', function () {
    closePhoto();
  });

  function closePhoto() {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.comments-loader').removeEventListener('click', window.preview.loadComments);
  }

  function openPhoto() {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comments').innerHTML = '';
    document.addEventListener('keydown', onPhotoEscPress);
  }

  function onPhotoEscPress(evt) {
    window.util.isEscEvent(evt, closePhoto);
  }

  window.gallery = {
    openPhoto: openPhoto,
    closePhoto: closePhoto
  };
})();
