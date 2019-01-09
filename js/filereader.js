'use strict';

(function () {

  window.fileReader = {
    init: function () {
      var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
      var uploadElement = document.querySelector('.img-upload');
      var uploadFileElement = uploadElement.querySelector('#upload-file');
      var imgPreviewElement = uploadElement.querySelector('.img-upload__preview img');

      var file = uploadFileElement.files[0];
      var filename = file.name.toLowerCase();

      var types = FILE_TYPES.some(function (it) {
        return filename.endsWith(it);
      });
      if (types) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          imgPreviewElement.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };
})();
