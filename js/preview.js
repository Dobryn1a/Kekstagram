'use strict';

(function () {

  var DISPLAY_COMMENTS = 5;

  var SliceValue = {
    START: 0,
    END: 5
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var socialLoaderElement = document.querySelector('.comments-loader');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  function loadComments(evt) {
    var commentElements = bigPictureElement.querySelectorAll('.social__comment.visually-hidden');
    [].slice.call(commentElements).slice(SliceValue.START, SliceValue.END).forEach(function (item) {
      item.classList.remove('visually-hidden');
    });
    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length === 0) {
      evt.target.classList.add('visually-hidden');
    }
  }

  function showCommentsCount(comments) {
    var displayedComments = bigPictureElement.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCountElement = displayedComments + ' из ' + '<span class="comments-count">' + comments.length + '</span>' + ' комментариев';
    commentsCount.innerHTML = commentsCountElement;
  }

  function createComment(comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').title = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  }

  function renderComments(comments) {
    var commentsList = bigPictureElement.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    comments.forEach(function (currentItem, index) {
      var comment = createComment(currentItem);
      if (index >= DISPLAY_COMMENTS) {
        comment.classList.add('visually-hidden');
      }
      fragment.appendChild(comment);
    });
    commentsList.appendChild(fragment);
  }

  function renderBigPicture(photo) {
    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    renderComments(photo.comments);
    showCommentsCount(photo.comments);
    bigPictureElement.querySelector('.comments-loader').addEventListener('click', loadComments);
    bigPictureElement.querySelector('.comments-loader').addEventListener('click', function () {
      showCommentsCount(photo.comments);
    });
    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length > 1) {
      socialLoaderElement.classList.remove('visually-hidden');
    }
  }

  window.preview = {
    renderBigPicture: renderBigPicture,
    loadComments: loadComments
  };

})();
