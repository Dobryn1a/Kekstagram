'use strict';

(function () {
  var KEYCODE_ESC = 27;
  window.util = {
    getRandomElement: function (element) {
      return element[Math.floor(Math.random() * element.length)];
    },
    isEscEvent: function (evt, action) {
      if (evt.KEYCODE_ESC === KEYCODE_ESC) {
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
