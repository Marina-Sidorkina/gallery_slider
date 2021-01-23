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
    this._indicatorsList = null;
    this._indicatorColor = null;
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

  set indicatorsList(params) {
    const {size, background, color, space, border, bottom} = params;
    const indicatorsBlock = Slider.createIndicatorsBlock(bottom);

    for(let i = 0; i < this._photosAmount; i++) {
      Slider.createIndicator(indicatorsBlock, size, background, space, border)
    }

    this._indicatorsList = indicatorsBlock.querySelectorAll('div');
    this._indicatorColor = color;
    this._indicatorsList[0].style.backgroundColor = this._indicatorColor;
    this._gallery.appendChild(indicatorsBlock);
  }

  _moveRight() {
    if(this._state.count < this._photosAmount) {
      this._state.shift -= this._shiftStep;
      this._track.style.transform = `translateX(${this._state.shift}px)`;
      if(this._indicatorsList) {
        this._indicatorsList[this._state.count].style.backgroundColor = this._indicatorColor;
        this._indicatorsList[this._state.count - 1].style.backgroundColor = 'transparent';
      }
      this._state.count++;
    } 
  }

  _moveLeft() {
    if(this._state.count !== 1) {
      this._state.shift += this._shiftStep;
      this._track.style.transform = `translateX(${this._state.shift}px)`;
      this._state.count--;
      if(this._indicatorsList) {
        this._indicatorsList[this._state.count - 1].style.backgroundColor = this._indicatorColor;
        this._indicatorsList[this._state.count].style.backgroundColor = 'transparent';
      }
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

  static createIndicator(container, size, background, space, border) {
    const indicator = document.createElement('div');
    indicator.style.margin = 'auto';
    indicator.style.width = `${size}px`;
    indicator.style.height = `${size}px`;
    indicator.style.background = background;
    indicator.style.border = border;
    indicator.style.borderRadius = '50%';
    indicator.style.marginRight = `${space}px`;
    container.appendChild(indicator);
  }

  static createIndicatorsBlock(bottom) {
    const indicatorsBlock = document.createElement('div');
    indicatorsBlock.style.position = 'absolute';
    indicatorsBlock.style.display = 'flex';
    indicatorsBlock.style.bottom = `${bottom}px`;
    indicatorsBlock.style.left = `50%`;
    indicatorsBlock.style.transform = 'translate(-50%, -50%)';
    return indicatorsBlock;
  }
};
