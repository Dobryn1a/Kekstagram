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
  MAX_LENGTH: 20
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
var currentEffectClass = 'effects__preview--' + currentEffectName;
// var defaultClass = effectsListElement.querySelector('.effects__preview--none');

var hashtagElement = document.querySelector('.text__hashtags');
var descriptionElement = document.querySelector('.text__description');
var uploadSubmitElement = uploadElement.querySelector('.img-upload__submit');

var defaultElement = effectsListElement.querySelector('#effect-' + DEFAULT_EFFECT);
var effectLevelLineElement = effectLevelElement.querySelector('.effect-level__line');

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

function setPinPosition(value) {
  effectPinElement.style.left = value + '%';
  effectLevelValueElement.value = Math.round(value);
  effectDepthElement.style.width = effectPinElement.style.left;
}

function setDefaultPinPosition() {
  effectLevelValueElement.value = PinValue.MAX;
  effectPinElement.style.left = EffectValue.DEFAULT + '%';
  effectDepthElement.style.width = effectPinElement.style.left;
}

function setDefaultEffect() {
  defaultElement.checked = true;
  imgPreviewElement.classList = '';
  imgPreviewElement.style.filter = '';
  imgPreviewElement.classList.add(DEFAULT_EFFECT);
  effectLevelElement.classList.add('hidden');
  setDefaultPinPosition();
}

function onImageEffectClick(evt) {
  var target = evt.target;
  if (target.tagName !== 'INPUT') {
    return;
  }
  imgPreviewElement.classList = '';
  currentEffectName = target.value;
  imgPreviewElement.classList.add('effects__preview--' + currentEffectName);
  imgPreviewElement.style.filter = '';

  if (currentEffectName === DEFAULT_EFFECT) {
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');
  }
  effectLevelValueElement.value = EffectValue.DEFAULT;
  applyEffect(EffectValue.DEFAULT);
  setPinPosition();
}

// function getFilterValue(effect, value) {
//   return value * (EffectParameter[effect].MAX_VALUE - EffectParameter[effect].MIN_VALUE) / EffectValue.MAX + EffectParameter[effect].MIN_VALUE + EffectParameter[effect].UNIT;
// }

function applyEffect(value) {
  // if (defaultClass) {
  //   imgPreviewElement.style.filter = '';
  // } else {
  //   imgPreviewElement.style.filter = EffectParameter[currentEffectName].PROPERTY + '(' + getFilterValue(currentEffectName, value) + ')';
  // }
  switch (currentEffectClass) {
    case EffectParameter.chrome.CLASS:
      imgPreviewElement.style.filter = EffectParameter.chrome.PROPERTY + '(' + (value) / EffectValue.DEFAULT + EffectParameter.chrome.UNIT + ')';
      break;
    case EffectParameter.sepia.CLASS:
      imgPreviewElement.style.filter = EffectParameter.sepia.PROPERTY + '(' + (value) / EffectValue.DEFAULT + EffectParameter.sepia.UNIT + ')';
      break;
    case EffectParameter.marvin.CLASS:
      imgPreviewElement.style.filter = EffectParameter.marvin.PROPERTY + '(' + (value) * EffectParameter.marvin.MAX_VALUE / EffectValue.MAX + EffectParameter.marvin.UNIT + ')';
      break;
    case EffectParameter.phobos.CLASS:
      imgPreviewElement.style.filter = EffectParameter.phobos.PROPERTY + '(' + (value) * EffectParameter.phobos.MAX_VALUE / EffectValue.DEFAULT + EffectParameter.phobos.UNIT + ')';
      break;
    case EffectParameter.heat.CLASS:
      imgPreviewElement.style.filter = EffectParameter.heat.PROPERTY + '(' + ((value) / (EffectValue.MAX / (EffectParameter.heat.MAX_VALUE - EffectParameter.heat.MIN_VALUE)) + EffectParameter.heat.MIN_VALUE) + EffectParameter.heat.UNIT + ')';
      break;
    default:
      imgPreviewElement.style.filter = '';
  }
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

function hashtagValidity() {
  hashtagElement.style.outline = '';
  var errorMessage = '';
  var hashtagValue = hashtagElement.value.trim();

  if (hashtagValue === '') {
    hashtagElement.setCustomValidity(errorMessage);
    return;
  }
  var hashtags = hashtagValue.toLowerCase().split(' ');
  hashtags.forEach(function (hashtagItem) {
    if (hashtagItem.charAt(0) !== Hashtag.HASH_SYMBOL) {
      errorMessage = 'Хэштег должен начинаться с символа #';
    } else if (hashtagItem.indexOf(Hashtag.HASH_SYMBOL, 1) > 1) {
      errorMessage = 'Хэш-теги разделяются пробелами';
    } else if (hashtagItem.charAt(0) === Hashtag.HASH_SYMBOL && hashtagItem.length === 1) {
      errorMessage = 'Хеш-тег не может состоять только из одной решётки';
    } else if (hashtags.length > Hashtag.QUANITY) {
      errorMessage = 'Допустимое количество  хэштегов  не более 5';
    } else if (hashtagItem.length > Hashtag.MAX_LENGTH) {
      errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    } else if (checkRepeatHashtags(hashtags)) {
      errorMessage = 'Хэштеги не должны повторяться';
    }
  });

  hashtagElement.setCustomValidity(errorMessage);

}

hashtagElement.addEventListener('input', hashtagValidity);

function highlightInvalidField(field) {
  if (!field.validity.valid) {
    field.style.outline = '2px solid red';
  } else {
    field.style.outline = 'none';
  }
}


uploadSubmitElement.addEventListener('click', function () {
  highlightInvalidField(hashtagElement);
});

uploadSubmitElement.addEventListener('submit', function () {
  highlightInvalidField(hashtagElement);
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


function onMouseDown(evt) {
  var startCoordX = evt.clientX;
  var sliderEffectLineRect = effectLevelLineElement.getBoundingClientRect();
  var clickedPosition = (startCoordX - sliderEffectLineRect.left) / sliderEffectLineRect.width * 100;

  setPinPosition(clickedPosition);
  applyEffect(clickedPosition);

  var onMouseMove = function (moveEvt) {
    var shiftX = startCoordX - moveEvt.clientX;
    startCoordX = moveEvt.clientX;
    var movePosition = (effectPinElement.offsetLeft - shiftX) / sliderEffectLineRect.width * 100;

    if (movePosition <= PinValue.MIN) {
      movePosition = PinValue.MIN;
      effectLevelValueElement.value = PinValue.MIN;
    } else if (movePosition >= PinValue.MAX) {
      movePosition = PinValue.MAX;
      effectLevelValueElement.value = PinValue.MAX;
    }

    setPinPosition(movePosition);
    applyEffect(movePosition);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousemove', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

effectsListElement.addEventListener('click', onImageEffectClick);
effectLevelLineElement.addEventListener('mousedown', onMouseDown);

window.effects = {
  setDefaultEffect: setDefaultEffect
};
