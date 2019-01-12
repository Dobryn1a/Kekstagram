'use strict';

(function () {

  var DEFAULT_EFFECT = 'none';

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

  var EffectValue = {
    MAX: 100,
    DEFAULT: 100,
  };

  var PinValue = {
    MIN: 0,
    MAX: 100
  };

  var uploadElement = document.querySelector('.img-upload');
  var imgPreviewElement = uploadElement.querySelector('.img-upload__preview img');
  var effectLevelElement = uploadElement.querySelector('.effect-level');
  var effectsListElement = uploadElement.querySelector('.effects__list');
  var effectPinElement = effectLevelElement.querySelector('.effect-level__pin');
  var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
  var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
  var currentEffectName = effectsListElement.querySelector('.effects__radio:checked');
  var defaultElement = effectsListElement.querySelector('#effect-' + DEFAULT_EFFECT);
  var effectLevelLineElement = effectLevelElement.querySelector('.effect-level__line');

  function applyEffect(value) {
    if (currentEffectName === DEFAULT_EFFECT) {
      imgPreviewElement.style.filter = '';
    } else {
      imgPreviewElement.style.filter = EffectParameter[currentEffectName].PROPERTY + '(' + getFilterValue(currentEffectName, value) + ')';
    }
    setPinPosition(value);
  }

  function setPinPosition(value) {
    effectPinElement.style.left = value + '%';
    effectLevelValueElement.value = Math.round(value);
    effectDepthElement.style.width = effectPinElement.style.left;
  }

  function setDefaultEffect() {
    defaultElement.checked = true;
    imgPreviewElement.classList = '';
    imgPreviewElement.style.filter = '';
    imgPreviewElement.classList.add('effects__preview--' + DEFAULT_EFFECT);
    effectLevelElement.classList.add('hidden');
    setPinPosition(PinValue.DEFAULT);
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

  function getFilterValue(effect, value) {
    return value * (EffectParameter[effect].MAX_VALUE - EffectParameter[effect].MIN_VALUE) / EffectValue.MAX + EffectParameter[effect].MIN_VALUE + EffectParameter[effect].UNIT;
  }

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
    setDefaultEffect: setDefaultEffect,
    PinValue: PinValue
  };
})();
