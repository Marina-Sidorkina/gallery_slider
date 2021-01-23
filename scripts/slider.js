class Slider {
  constructor(container, trackBlock, buttonLeft, buttonRight, itemsList, pointer = true) {
    this._gallery = container;
    this._track = trackBlock;
    this._buttonLeft = buttonLeft;
    this._buttonRight = buttonRight;
    this._photosAmount = itemsList.length;
    this._shiftStep = itemsList[0].offsetWidth;
    this._hammer = new Hammer(this._gallery);
    this._hasPointer = pointer;
    this._addGrabPointer = this._addGrabPointer.bind(this);
    this._removeGrabPointer = this._removeGrabPointer.bind(this);
    this._moveRight = this._moveRight.bind(this);
    this._moveLeft = this._moveLeft.bind(this);
    this._state = {
      count: 1,
      shift: 0,
      isRendered: false
    }
  }

  set transitionDuration(value) {
    this._track.style.transitionProperty = 'transform';
    this._track.style.transitionDuration = `${value}ms`;
  }

  _moveRight() {
    if(this._state.count !== this._photosAmount) {
      this._state.shift -= this._shiftStep;
      this._track.style.transform = `translateX(${this._state.shift}px)`;
      this._state.count++;
    } 
  }

  _moveLeft() {
    if(this._state.count !== 1) {
      this._state.shift += this._shiftStep;
      this._track.style.transform = `translateX(${this._state.shift}px)`;
      this._state.count--;
    }
  }

  _addGrabPointer() {
    this._gallery.classList.add('grabbing');
  }

  _removeGrabPointer() {
    if(this._gallery.classList.contains('grabbing')) {
      this._gallery.classList.remove('grabbing');
    }
  }

  _createListeners() {
    this._hammer.on('swipeleft', this._moveRight);
    this._hammer.on('swiperight', this._moveLeft);
    this._buttonRight.addEventListener('click',  this._moveRight);
    this._buttonLeft.addEventListener('click', this._moveLeft);
    if(this._hasPointer) {
      this._gallery.addEventListener('pointerdown', this._addGrabPointer);
      document.addEventListener('pointerup', this._removeGrabPointer); 
    }
  }

  _removeListeners() {
    this._hammer.off('swipeleft', this._moveRight);
    this._hammer.off('swiperight', this._moveLeft);
    this._buttonRight.removeEventListener('click',  this._moveRight);
    this._buttonLeft.removeEventListener('click', this._moveLeft);
    if(this._hasPointer) {
      this._gallery.removeEventListener('pointerdown', this._addGrabPointer);
      document.removeEventListener('pointerup', this._removeGrabPointer);
    }
  }

  render() {
    if (!this._state.isRendered) {
      if(this._hasPointer) {
        this._gallery.classList.add('grab');
      }
      this._hammer.get('swipe');
      this._createListeners();
      this._state.isRendered = true;
    }
  }

  unrender() {
    if (this._state.isRendered) {
      if(this._hasPointer) {
        this._gallery.classList.remove('grab');
      }
      this._removeListeners();
      this._hammer.remove('swipe');
      this._state.isRendered = false;
    }
  }
};
