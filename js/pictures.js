'use strict';

var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var PHOTOS_COUNT = 25;
var DISPLAY_COMMENTS = 5;

var Likes = {
  MIN: 15,
  MAX: 200
};

var Avatar = {
  MIN: 1,
  MAX: 6
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
var socialLoader = document.querySelector('.comments-loader');
var commentsCount = document.querySelector('.social__comment-count');
socialLoader.classList.add('visually-hidden');
commentsCount.classList.add('visually-hidden');
var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

var photos = [];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(element) {
  return element[Math.floor(Math.random() * element.length)];
}

function getRandomComment() {
  var comment = getRandomElement(COMMENTS);
  if (Math.random() >= 0.5) {
    comment += ' ' + getRandomElement(COMMENTS);
  }
  return comment;
}

function getComments() {
  var comments = [];
  for (var i = 0; i < getRandomNumber(1, 10); i++) {
    comments[i] = getRandomComment();
  }
  return comments;
}

function generatePhotos() {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: getComments(),
      description: getRandomElement(DESCRIPTIONS)
    };
  }
}

generatePhotos(PHOTOS_COUNT);

function renderPhoto(photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
    renderBigPicture(photos[0]);
  });
  return photoElement;
}

function appendPhotos() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesBlock.appendChild(fragment);
}

appendPhotos();

function createComment(comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(Avatar.MIN, Avatar.MAX) + '.svg';
  commentElement.querySelector('.social__text').textContent = comment;
  return commentElement;
}


function renderComments(comments) {
  var commentsList = bigPicture.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    var comment = createComment(comments[i]);
    if (i >= DISPLAY_COMMENTS) {
      comment.classList.add('visually-hidden');
    }
    fragment.appendChild(comment);
  }
  commentsList.appendChild(fragment);
}

function renderBigPicture(photo) {
  bigPicture.querySelector('.big-picture__img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  renderComments(photo.comments);
}

// renderBigPicture(photos[0]);

// pictureTemplate отвечает за маленькое изображение на странице
// bigPicture большое изображение на котором весит hidden
//
// commentsList.innerHTML = ''; сбрсывает значение
// bigPictureCancel отвечает за закрытие изображения
//

//  pictureTemplate.addEventListener('click', function () {
//    bigPicture.classList.remove('hidden');
//  });

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});
