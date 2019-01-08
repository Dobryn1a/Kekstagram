'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomElement: function (element) {
      return element[Math.floor(Math.random() * element.length)];
    },
    KeyCode: {
      ENTER: 13,
      ESC: 27
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.util.KeyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.util.KeyCode.ENTER) {
        action();
      }
    },
    shuffleArray: function (array) {
      var results = [];
      for (var i = 0; i < array.length; i++) {
        var element = this.getRandomElement(array);
        if (results.indexOf(element) !== -1) {
          element = this.getRandomElement(array);
          i--;
        } else {
          results.push(element);
        }
      }
      return results;
    }
  };

})();
