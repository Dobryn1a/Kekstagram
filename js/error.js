'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

  function onDocumentClick(evt) {
    if (evt.target.tagName === 'SECTION') {
      closeModal();
    }
  }

  function closeModal() {
    var modalElement = mainElement.querySelector('.modal');
    mainElement.removeChild(modalElement);
    document.removeEventListener('keydown', onModalEscPress);
    modalElement.removeEventListener('click', onDocumentClick);
  }

  function onModalEscPress(evt) {
    window.util.isEscEvent(evt, closeModal);
  }

  function showModalError(text) {
    mainElement.appendChild(errorModalTemplate);
    errorModalTemplate.querySelector('.error__title').textContent = text;
    errorModalTemplate.querySelector('.error__button').addEventListener('click', function () {
      closeModal();
    });
    errorModalTemplate.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onModalEscPress);
  }

  window.error = {
    show: showModalError
  };

})();
