'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var successModalTemplate = document.querySelector('#success').content.querySelector('.success');

  var closeModal = function () {
    var modalElement = mainElement.querySelector('.modal');
    mainElement.removeChild(modalElement);
    document.removeEventListener('keydown', onModalEscPress);
    modalElement.removeEventListener('click', onDocumentClick);
  };

  var onDocumentClick = function (evt) {
    if (evt.target.tagName === 'SECTION') {
      closeModal();
    }
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };
  var showModalSucces = function () {
    document.addEventListener('keydown', onModalEscPress);
    mainElement.appendChild(successModalTemplate);
    successModalTemplate.querySelector('.success__button').addEventListener('click', function () {
      closeModal();
    });
    successModalTemplate.addEventListener('click', onDocumentClick);
  };

  window.success = {
    show: showModalSucces
  };

})();
