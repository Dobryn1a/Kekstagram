'use strict';

(function () {

  // var PHOTOS_COUNT = 25;

  var pictures = [];

  var photosNew = {
    MIN: 0,
    MAX: 10
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesBlock = document.querySelector('.pictures');

  var filterElement = document.querySelector('.img-filters');
  var filterFormElement = document.querySelector('.img-filters__form');
  var filtersButtonElements = filterFormElement.querySelectorAll('.img-filters__button');

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

  function appendPicture() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPhoto(pictures[i]));
    }
    picturesBlock.appendChild(fragment);
  }

  function changeFilters(evt) {
    var target = evt.target;
    var picture = picturesBlock.querySelectorAll('.picture');
    picture.forEach(function (item) {
      picturesBlock.removeChild(item);
    });
    switch (target.id) {
      case 'filter-popular':
        onLoad(picture);
        break;
      case 'filter-new':
        onLoad(getNewPhotos(picture));
        break;
      case 'filter-discussed':
        onLoad(sortingByComments(picture));
        break;
    }
  }

  function changeAcitveClass(currentFilter) {
    filtersButtonElements.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    filterFormElement.querySelector('#' + currentFilter).classList.add('img-filters__button--active');
  }

  function getNewPhotos(photo) {
    return window.util.shuffleArray(photo).slice(photosNew.MIN, photosNew.MAX);
  }

  function sortingByComments(posts) {
    return posts.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  }

  var debounceFilters = window.debounce(changeFilters);
  filterFormElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      changeAcitveClass(target.id);
      debounceFilters(evt);
    }
  });

  function onLoad(data) {
    filterElement.classList.remove('img-filters--inactive');
    pictures = data;
    appendPicture(pictures);
  }

  // function appendPicture(pictures) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < pictures.length; i++) {
  //     fragment.appendChild(renderPhoto(pictures[i]));
  //   }
  //   picturesBlock.appendChild(fragment);
  // }

  // function onLoad(photos) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < photos.length; i++) {
  //     fragment.appendChild(renderPhoto(photos[i]));
  //   }
  //   picturesBlock.appendChild(fragment);
  // }

  function onError(errorMessage) {
    window.error.show(errorMessage);
  }

  window.backend.load(onLoad, onError);

})();
