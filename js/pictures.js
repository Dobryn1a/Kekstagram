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
var AVATAR = 6;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var socialLoader = document.querySelector('.comments-loader');
var commentsCount = document.querySelector('.social__comment-count');
socialLoader.classList.add('visually-hidden');
commentsCount.classList.add('visually-hidden');

var photos = [];
var bigComment = [];

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

function appendBigComment() {
  var bigComments = document.querySelector('.social__comments');
  var bidComment = document.createElement('li');
  bidComment.classList.add('social__comment');
  for (var i = 0; i < AVATAR; i++) {
    bigComment[i] = {
      url: 'img/avatar-' + (i + 1) + '.svg',
      comments: getСomments(5),
    };
  }
  bigComments.querySelector('.social__picture').src = bigComment.url;
  bigComments.querySelector('.social__text').textContent = bigComment.comments.length;
}

function openPhoto(photo) {
  var openElement = bigPicture.cloneNode(true);
  openElement.querySelector('.big-picture__img').src = photo.url;
  openElement.querySelector('.likes-count').textContent = photo.likes;
  openElement.querySelector('.comments-count').textContent = photo.comments.length;
  //openElement.querySelector('.social__comments').textContent = photo.comments.length;
  openElement.querySelector('.social__caption').textContent = photo.description;
  return openElement;
}
