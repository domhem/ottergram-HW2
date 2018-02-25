/*eslint quotes: ["error", "single"]*/
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var thumb_index = 0;

//changes the detail image and title
function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

//get the image from the data-image-url
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

//get the title from the data-image-title
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

//uses the three previous functions to set the detail image and title
function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

//event listener for thumbnails
function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

//event listener for prev/next buttons
function addButtonClickHandler() {
  'use strict';
  var prev = document.getElementById('prev');
  prev.addEventListener('click', function(event) {
    event.preventDefault();
    prevButton();
  });
  var next = document.getElementById('next');
  next.addEventListener('click', function(event) {
    event.preventDefault();
    nextButton();
  });
}

//get the array of thumbnails
function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

//function takes current index and decrements to go the the past index
function prevButton() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  //if the current image is the first, go to the last image in the array
  if (thumb_index == 0) {
    thumb_index = thumbnails.length;
  }
  thumb_index--;
  setDetailsFromThumb(thumbnails[thumb_index]);
}

//function takes current index and increments to go the the next index
function nextButton() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  //if the current image is the last, go to first image in the array
  if (thumb_index >= thumbnails.length - 1) {
    thumb_index = 0;
  } else {
    thumb_index++;
  }
  setDetailsFromThumb(thumbnails[thumb_index]);
}

//get the array of thumbnails and iterate through while adding a click handler to each thumbnail
function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addButtonClickHandler();
}

initializeEvents();
