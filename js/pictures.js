'use strict';

var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var PHOTOS_COUNT = 25;
var MIN_COUNT = 15;
var MAX_COUNT = 200;
var FIRST_AVATAR = 1;
var LAST_AVATAR = 6;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var socialLoader = document.querySelector('.comments-loader');
var commentsCount = document.querySelector('.social__comment-count');
socialLoader.classList.add('visually-hidden');
commentsCount.classList.add('visually-hidden');
var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

var photos = [];

for (var i = 1; i <= PHOTOS_COUNT; i++) {}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(element) {
  return element[Math.floor(Math.random() * element.length)];
}

function getRandomСomment() {
  var comment = getRandomElement(COMMENTS);
  if (Math.random() >= 0.5) {
    comment += ' ' + getRandomElement(COMMENTS);
  }
  comment += (' ' + getRandomElement(COMMENTS)) * 2;
  return comment;
}

function getСomments() {
  for (var i = 0; i < getRandomNumber(1, 10); i++) {
    var comments = [];
    comments[i] = getRandomСomment();
  }
  return comments;
}

function generatePhotos() {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(MIN_COUNT, MAX_COUNT),
      comments: getСomments(5),
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
  return photoElement;
}

var appendPhotos = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++)
  {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  picturesBlock.appendChild(fragment);
};

appendPhotos(PHOTOS_COUNT);

var createComment = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(FIRST_AVATAR, LAST_AVATAR) + '.svg';
  commentElement.querySelector('.social__text').textContent = comment;
  return commentElement;
};

var appendBigComment = function () {
  for (var i = 0; i < COMMENTS.length; i++) {
    var bigComments = document.querySelector('.social__comments');
    var bigComment = bigComments.createElement('li');
    bigComment.classList.add('social__comment');
    bigComment.appendChild(createComment());
  }
  return bigComments;
};

function openPhoto(photo) {
  var openElement = bigPicture.cloneNode(true);
  openElement.querySelector('.big-picture__img').src = photo.url;
  openElement.querySelector('.likes-count').textContent = photo.likes;
  openElement.querySelector('.comments-count').textContent = photo.comments.length;
  openElement.querySelector('.social__comments').textContent = appendBigComment();
  openElement.querySelector('.social__caption').textContent = photo.description;
  return openElement;
}

var appendPhoto = function () {
  var fragmentPhoto = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++)
  {
    fragmentPhoto.appendChild(openPhoto(photos[i]));
  }
  bigComments.appendChild(fragmentPhoto);
};

appendPhotos(PHOTOS_COUNT);
