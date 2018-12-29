'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

  var onDocumentClick = function (evt) {
    if (evt.target.tagName === 'SECTION') {
      closeModal();
    }
  };

  var closeModal = function () {
    var modalElement = mainElement.querySelector('.modal');
    mainElement.removeChild(modalElement);
    document.removeEventListener('keydown', onModalEscPress);
    modalElement.removeEventListener('click', onDocumentClick);
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };

  var showModalError = function (text) {
    mainElement.appendChild(errorModalTemplate);
    errorModalTemplate.querySelector('.error__title').textContent = text;
    errorModalTemplate.querySelector('.error__button').addEventListener('click', function () {
      closeModal();
    });
    errorModalTemplate.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onModalEscPress);
  };

  window.error = {
    show: showModalError
  };

})();
