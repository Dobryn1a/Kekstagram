'use strict';

(function () {

  var PHOTOS_COUNT = 25;

  var photos = [];

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesBlock = document.querySelector('.pictures');

  function renderPhoto(photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', function () {
      window.gallery.openPhoto();
      window.preview.renderBigPicture(photo);
    });
    return photoElement;
  }

  function appendPhotos() {
    var fragment = document.createDocumentFragment();
    photos = window.data.generatePhotos(PHOTOS_COUNT);
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesBlock.appendChild(fragment);
  }

  window.picture = {
    appendPhotos: appendPhotos
  };

})();
