/*
  Global Variables
*/
let lastActiveContainer;

/*
  Selectors
*/
const keyboardContainer = document.querySelector('.keyboard-container');
const sliderContainer = document.querySelector('.slider-container');
const networkContainer = document.querySelector('.network-container');
const macroContainer = document.querySelector('.macro-container');

const networkContainerButton = document.querySelector('.network-container-button');
const macroContainerButton = document.querySelector('.macro-container-button');
const keyboardContainerButton = document.querySelector('.keyboard-container-button');


/*
    Functions
*/

// a. Helper Functions
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

/*
    Initializer
*/
const initializeContainer = () => {
  lastActiveContainer = networkContainer;
  hideContainer(macroContainer);
  hideContainer(keyboardContainer);
}

initializeContainer();
