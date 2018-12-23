'use strict';

(function () {

  var uploadElement = document.querySelector('.img-upload');
  var uploadFileElement = uploadElement.querySelector('#upload-file');
  var uploadPopupElement = uploadElement.querySelector('.img-upload__overlay');
  var uploadPopupCloseElement = uploadElement.querySelector('#upload-cancel');
  var hashtagElement = document.querySelector('.text__hashtags');
  var descriptionElement = document.querySelector('.text__description');

  function openForm() {
    uploadPopupElement.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
  }

  function closeForm() {
    uploadPopupElement.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
  }

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
  });

  uploadPopupCloseElement.addEventListener('click', function () {
    closeForm();
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

})();
