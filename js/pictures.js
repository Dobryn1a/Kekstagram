'use strict';

var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var CONST = 25;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var pictureImg = document.querySelector('.picture__img').src;
var pictureLikes = document.querySelector('.picture__likes');
var pictureComments = document.querySelector('.picture__comments');
var socialLoader = document.querySelector('.comments-loader');
var commentsCount = document.querySelector('.social__comment-count');
socialLoader.classList.add('visually-hidden');
commentsCount.classList.add('visually-hidden');

for (var i = 1; i <= CONST; i++) {}

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
    COMMENTS[i] = getRandomСomment();
  }
  return COMMENTS;
}

function generatePhotos() {
  for (var i = 0; i < CONST; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomСomment(),
      description: getRandomElement(DESCRIPTIONS)
    };
  }
}

// Предсталвение url в .picture
pictureImg = photos[i].url;

// Предсталвение likes в .picture__likes
pictureLikes.textContent = photos[i].likes;

// Представление comments как .picture__comments
pictureComments.textContent = photos[i].comments;
