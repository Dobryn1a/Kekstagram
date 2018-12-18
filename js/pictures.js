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
var DEFAULT_EFFECT = 'none';

var Hashtag = {
  QUANITY: 5,
  HASH_SYMBOL: '#',
  MAX_LENGTH: 20,
  MIN_LENGTH: 2
};

var EffectValue = {
  MAX: 100,
  DEFAULT: 100,
};
var PinValue = {
  MIN: 0,
  MAX: 100
};
var ScaleValue = {
  MIN: 25,
  STEP: 25,
  MAX: 100,
  DEFAULT: 100
};
var Like = {
  MIN: 15,
  MAX: 200
};
var Avatar = {
  MIN: 1,
  MAX: 6
};
var KeyCode = {
  ENTER: 13,
  ESC: 27
};

var EffectParameter = {
  chrome: {
    CLASS: 'effects__preview--chrome',
    PROPERTY: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  sepia: {
    CLASS: 'effects__preview--sepia',
    PROPERTY: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  marvin: {
    CLASS: 'effects__preview--marvin',
    PROPERTY: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    UNIT: '%'
  },
  phobos: {
    CLASS: 'effects__preview--phobos',
    PROPERTY: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    UNIT: 'px'
  },
  heat: {
    CLASS: 'effects__preview--heat',
    PROPERTY: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    UNIT: ''
  }
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

var uploadElement = document.querySelector('.img-upload');
var uploadFileElement = uploadElement.querySelector('#upload-file');
var uploadPopupElement = uploadElement.querySelector('.img-upload__overlay');
var uploadPopupCloseElement = uploadElement.querySelector('#upload-cancel');
var imgPreviewWrapperElement = uploadElement.querySelector('.img-upload__preview');
var imgPreviewElement = imgPreviewWrapperElement.querySelector('.img-upload__preview img');
var scaleElement = uploadElement.querySelector('.img-upload__scale');
var scaleValueElement = scaleElement.querySelector('.scale__control--value');
var scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
var scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
// Все необходимое для формы обработки изображения


var effectLevelElement = uploadElement.querySelector('.effect-level');
var effectsListElement = uploadElement.querySelector('.effects__list');
var effectPinElement = effectLevelElement.querySelector('.effect-level__pin');
var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');

var currentEffectName = effectsListElement.querySelector('.effects__radio:checked').value;
// var currentEffectClass = 'effects__preview--' + currentEffectName;
var defaultClass = effectsListElement.querySelector('.effects__preview--none');
// var effectRadio = scaleElement.querySelector('.effects__radio');

var hashtagElement = document.querySelector('.text__hashtags');
var descriptionElement = document.querySelector('.text__description');
var uploadTextAreaElement = uploadElement.querySelector('.img-upload__text');
var uploadSubmitElement = uploadElement.querySelector('.img-upload__submit');

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
      likes: getRandomNumber(Like.MIN, Like.MAX),
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
    openPhoto();
    renderBigPicture(photo);
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
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  renderComments(photo.comments);
}

bigPictureCancel.addEventListener('click', function () {
  closePhoto();
});

function closePhoto() {
  bigPicture.classList.add('hidden');
}

function openPhoto() {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comments').innerHTML = '';
  document.addEventListener('keydown', onPhotoEscPress);
}

function onPhotoEscPress(evt) {
  if (evt.keyCode === KeyCode.ESC) {
    closePhoto();
  }
}

function closeForm() {
  uploadPopupElement.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
}

function openForm() {
  uploadPopupElement.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
}

uploadFileElement.addEventListener('change', function () {
  openForm();
});

function onFormEscPress(evt) {
  if (evt.keyCode === KeyCode.ESC) {
    closeForm();
  }
}

uploadPopupCloseElement.addEventListener('click', function () {
  closeForm();
});

function setPhotoScale(value) {
  var currentScale = parseInt(scaleValueElement.value, 10);
  currentScale += ScaleValue.STEP * value;
  if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
    scaleValueElement.value = currentScale + '%';
    imgPreviewWrapperElement.style.transform = 'scale(' + currentScale / 100 + ')';
  }
  return currentScale;
}

scaleSmallerElement.addEventListener('click', function () {
  setPhotoScale(-1);
});

scaleBiggerElement.addEventListener('click', function () {
  setPhotoScale(1);
});

function onImageEffectClick(evt) {
  var target = evt.target;
  if (target.tagName !== 'INPUT') {
    return;
  }
  imgPreviewElement.classList = '';
  currentEffectName = target.value;
  imgPreviewElement.classList.add('effects__preview--' + effectsListElement.value);
  imgPreviewElement.style.filter = '';

  if (currentEffectName === DEFAULT_EFFECT) {
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');
  }
  setPinPosition(PinValue.MAX);
}

effectsListElement.addEventListener('click', onImageEffectClick);


function getFilterValue(effect, value) {
  return value * (EffectParameter[effect].MAX_VALUE - EffectParameter[effect].MIN_VALUE) / EffectValue.MAX + EffectParameter[effect].MIN_VALUE + EffectParameter[effect].UNIT;
}

function applyEffect(value) {
  if (defaultClass) {
    imgPreviewElement.style.filter = '';
  } else {
    imgPreviewElement.style.filter = EffectParameter[currentEffectName].PROPERTY + '(' + getFilterValue(currentEffectName, value) + ')';
  }
}

function setPinPosition(value) {
  effectPinElement.style.left = value + '%';
  effectLevelValueElement.value = Math.round(value);
  effectDepthElement.style.width = effectPinElement.style.left;
  applyEffect(value);
}

function checkRepeatHashtags(hashtags) {
  for (var i = 0; i < hashtags.length; i++) {
    var currentHashtag = hashtags[i];
    for (var j = 0; j < hashtags.length; j++) {
      if (currentHashtag === hashtags[j] && i !== j) {
        return true;
      }
    }
  }
  return false;
}

function validateHashtags(hashtags) {
  for (var i = 0; i < hashtags.length; i++) {
    hashtags[i] = hashtags[i].toLowerCase();
    if (hashtags[i][0] !== Hashtag.HASH_SYMBOL && hashtags[i][0] !== ' ') {
      hashtagElement.setCustomValidity('Хэштег должен начинаться с символа # и не содержать пробелов');
    } else if (hashtags[i].length > Hashtag.MAX_LENGTH) {
      hashtagElement.setCustomValidity('Длина хештега не может превышать 20 символов');
    } else if (hashtags[i].length === 1) {
      hashtagElement.setCustomValidity('Одна решетка для хештега? Нет нет нет дружочек:)');
    } else if (hashtags.length > Hashtag.QUANITY) {
      hashtagElement.setCustomValidity('Допустимое количество  хэштегов  не более 5');
    } else if (checkRepeatHashtags(hashtags)) {
      hashtagElement.setCustomValidity('Хэштеги не должны повторяться');
    } else if (hashtags[i].indexOf('#', 1) !== -1) {
      hashtagElement.setCustomValidity('Хэштеги разделяются пробелами');
    } else {
      hashtagElement.setCustomValidity('');
    }
  }
}

function highlightInvalidField(field) {
  if (!field.validity.valid) {
    field.style.border = '2px solid red';
  } else {
    field.style.border = 'none';
  }
}


hashtagElement.addEventListener('input', function () {
  var hashtags = hashtagElement.value.toLowerCase().split(' ');
  validateHashtags(hashtags);
  highlightInvalidField(hashtagElement);
});

uploadSubmitElement.addEventListener('submit', function () {
  highlightInvalidField(hashtagElement);
  highlightInvalidField(uploadTextAreaElement);
});


hashtagElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onFormEscPress);
});

hashtagElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', onFormEscPress);
});

descriptionElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onFormEscPress);
});

descriptionElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', onFormEscPress);
});
