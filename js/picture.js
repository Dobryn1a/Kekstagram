'use strict';

(function () {

  var NewPhoto = {
    MIN: 0,
    MAX: 10
  };

  var photos = [];

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesElements = document.querySelector('.pictures');

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

  function appendPicture(pictures) {
    var fragment = document.createDocumentFragment();
    // for (var i = 0; i < pictures.length; i++) {
    //   fragment.appendChild(renderPhoto(pictures[i]));
    // }
    pictures.forEach(function (item) {
      fragment.appendChild(renderPhoto(item));
    });
    picturesElements.appendChild(fragment);
  }

  function changeFilters(evt) {
    var target = evt.target;
    var picture = picturesElements.querySelectorAll('.picture');
    picture.forEach(function (item) {
      picturesElements.removeChild(item);
    });
    switch (target.id) {
      case 'filter-popular':
        appendPicture(photos);
        break;
      case 'filter-new':
        appendPicture(getNewPhotos(photos));
        break;
      case 'filter-discussed':
        appendPicture(sortingByComments(photos));
        break;
    }
  }

  function changeActiveClass(currentFilter) {
    filtersButtonElements.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    filterFormElement.querySelector('#' + currentFilter).classList.add('img-filters__button--active');
  }

  function getNewPhotos(photo) {
    return window.util.shuffleArray(photo).slice(NewPhoto.MIN, NewPhoto.MAX);
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
      changeActiveClass(target.id);
      debounceFilters(evt);
    }
  });

  function onLoad(data) {
    filterElement.classList.remove('img-filters--inactive');
    photos = data;
    appendPicture(photos);
  }

  function onError(errorMessage) {
    window.error.show(errorMessage);
  }

  window.backend.load(onLoad, onError);

})();
