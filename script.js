const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery_track');
const buttonLeft = document.querySelector('.gallery_button__left');
const buttonRight = document.querySelector('.gallery_button__right');
const galleryItems = document.querySelectorAll('.gallery_item');
const photosAmount = galleryItems.length;
const shiftStep = galleryItems[0].offsetWidth;
const hammer = new Hammer(gallery);

let count = 1;
let shift = 0;

function moveRight() {
  if(count !== photosAmount) {
    shift -= shiftStep;
    track.style.transform = `translateX(${shift}px)`;
    count++;
  } 
}

function moveLeft() {
  if(count !== 1) {
    shift += shiftStep;
    track.style.transform = `translateX(${shift}px)`;
    count--;
  }
}

track.style.transitionProperty = 'transform';
track.style.transitionDuration = '300ms';

hammer.get("swipe");
hammer.on("swipeleft", () => {
     moveRight();
});
hammer.on("swiperight", () => {
    moveLeft()
});

buttonRight.addEventListener('click', () => {
  moveRight()
});

buttonLeft.addEventListener('click', () => {
  moveLeft()
});

gallery.addEventListener('pointerdown', () => {
  gallery.classList.add('grabbing');
});

document.addEventListener('pointerup', () => {
  if(gallery.classList.contains('grabbing')) {
    gallery.classList.remove('grabbing');
  }
});


// Touch Slider on native JavaScript https://codepen.io/i-did/pen/yLYRvVL
// Hammer.js https://hammerjs.github.io/getting-started/
// Bootstrap carousel https://getbootstrap.com/docs/4.0/components/carousel/
// Example https://itchief.ru/examples/lab.php?topic=javascript&file=chiefslider-example-12