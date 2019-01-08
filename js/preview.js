'use strict';

(function () {

  var DISPLAY_COMMENTS = 5;

  var SliceValue = {
    START: 0,
    END: 5
  };

  var bigPicture = document.querySelector('.big-picture');
  var socialLoader = document.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.social__comment-count');
  // socialLoader.classList.add('visually-hidden');
  // commentsCount.classList.add('visually-hidden');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  function loadComments(evt) {
    var commentElements = bigPicture.querySelectorAll('.social__comment.visually-hidden');
    [].slice.call(commentElements).slice(SliceValue.START, SliceValue.END).forEach(function (item) {
      item.classList.remove('visually-hidden');
    });
    if (bigPicture.querySelectorAll('.social__comment.visually-hidden').length === 0) {
      evt.target.classList.add('visually-hidden');
    }
  }

  function showCommentsCount(comments) {
    var displayedComments = bigPicture.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCountElement = displayedComments + ' из ' + '<span class="comments-count">' + comments.length + '</span>' + ' комментариев';
    commentsCount.innerHTML = commentsCountElement;
  }

  function createComment(comment) {
    var commentElement = commentTemplate.cloneNode(true);
    // commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(Avatar.MIN, Avatar.MAX) + '.svg';
    // commentElement.querySelector('.social__text').textContent = comment;
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').title = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
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
    // bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    renderComments(photo.comments);
    showCommentsCount(photo.comments);
    bigPicture.querySelector('.comments-loader').addEventListener('click', loadComments);
    bigPicture.querySelector('.comments-loader').addEventListener('click', function () {
      showCommentsCount(photo.comments);
    });
    if (bigPicture.querySelectorAll('.social__comment.visually-hidden').length > 1) {
      socialLoader.classList.remove('visually-hidden');
    }
  }

  window.preview = {
    renderBigPicture: renderBigPicture,
    loadComments: loadComments
  };

})();
