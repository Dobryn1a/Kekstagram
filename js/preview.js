'use strict';

(function () {

  var DISPLAY_COMMENTS = 5;

  var Avatar = {
    MIN: 1,
    MAX: 6
  };

  var bigPicture = document.querySelector('.big-picture');
  var socialLoader = document.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.social__comment-count');
  socialLoader.classList.add('visually-hidden');
  commentsCount.classList.add('visually-hidden');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  function createComment(comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(Avatar.MIN, Avatar.MAX) + '.svg';
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

  window.preview = {
    renderBigPicture: renderBigPicture
  };

})();
