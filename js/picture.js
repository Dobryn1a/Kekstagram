'use strict';

(function () {

  // var PHOTOS_COUNT = 25;

  // var photos = [];

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

  // function appendPhotos() {
  //   var fragment = document.createDocumentFragment();
  //   photos = window.data.generatePhotos(PHOTOS_COUNT);
  //   for (var i = 0; i < photos.length; i++) {
  //     fragment.appendChild(renderPhoto(photos[i]));
  //   }
  //   picturesBlock.appendChild(fragment);
  // }

  function onLoad(photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    picturesBlock.appendChild(fragment);
  }

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #232321;';
    node.style.position = 'absolute';
    node.style.left = '50%';
    node.style.top = '40%';
    node.style.padding = '40px';
    node.style.transform = 'translate(-50%, -50%)';
    node.style.fontSize = '30px';
    node.style.border = '12px groove #e6d71e';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onLoad, onError);

})();
