const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery_track');
const buttonLeft = document.querySelector('.gallery_button__left');
const buttonRight = document.querySelector('.gallery_button__right');
const galleryItems = document.querySelectorAll('.gallery_item');

const slider = new Slider(gallery, track, buttonLeft, buttonRight, galleryItems);
slider.transitionDuration = 300;
slider.render();
