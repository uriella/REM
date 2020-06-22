/*
  Global Variables
*/
let isSideContainerOpen = true;
let lastActiveContainer;

/*
  Selectors
*/
const sideContainerA = document.querySelector('.container-side-a');
const sideContainerB = document.querySelector('.container-side-b');

const keyboardContainer = document.querySelector('.keyboard-container');
const sliderContainer = document.querySelector('.slider-container');
const networkContainer = document.querySelector('.network-container');
const macroContainer = document.querySelector('.macro-container');

const networkContainerButton = document.querySelector('.network-container-button');
const macroContainerButton = document.querySelector('.macro-container-button');
const keyboardContainerButton = document.querySelector('.keyboard-container-button');

const toggleSideContainerButton = document.querySelector('.main-toggle-button');


/*
    Functions
*/

// a. Helper Functions
const hideSideContainer = (container) => {
  container.classList.add('hide-container');

  sideContainerA.classList.remove('side-container');
  sideContainerA.classList.add('container-side-a-full');

  isSideContainerOpen = false;
};

const showSideContainer = (container) => {
  container.classList.remove('hide-container');

  sideContainerA.classList.remove('container-side-a-full');
  sideContainerA.classList.add('side-container');

  isSideContainerOpen = true;
};

const toggleSideContainer = (container) => {
  if (isSideContainerOpen) {
    hideSideContainer(container);
  }
  else {
    showSideContainer(container);
  }
};

const hideContainer = (container) => {
  container.classList.add('hide-container');

};

const showContainer = (container) => {
  hideContainer(lastActiveContainer);
  container.classList.remove('hide-container');
  lastActiveContainer = container;
};

/*
    Event Listeners
*/
networkContainerButton.addEventListener('click', () => showContainer(networkContainer));
macroContainerButton.addEventListener('click', () => showContainer(macroContainer))
keyboardContainerButton.addEventListener('click', () => showContainer(keyboardContainer));

toggleSideContainerButton.addEventListener('click', () => toggleSideContainer(sideContainerB))

/*
    Initializer
*/
const initializeContainer = () => {
  lastActiveContainer = networkContainer;
  hideContainer(macroContainer);
  hideContainer(keyboardContainer);
}

initializeContainer();
