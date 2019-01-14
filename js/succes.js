'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var successModalTemplate = document.querySelector('#success').content.querySelector('.success');

  function closeModal() {
    var modalElement = mainElement.querySelector('.modal');
    mainElement.removeChild(modalElement);
    document.removeEventListener('keydown', onModalEscPress);
    modalElement.removeEventListener('click', onDocumentClick);
  }

  function onDocumentClick(evt) {
    if (evt.target.tagName === 'SECTION') {
      closeModal();
    }
  }

  function onModalEscPress(evt) {
    window.util.isEscEvent(evt, closeModal);
  }

  function showModalSucces() {
    document.addEventListener('keydown', onModalEscPress);
    mainElement.appendChild(successModalTemplate);
    successModalTemplate.querySelector('.success__button').addEventListener('click', function () {
      closeModal();
    });
    successModalTemplate.addEventListener('click', onDocumentClick);
  }

  window.success = {
    show: showModalSucces
  };

})();
