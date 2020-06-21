/*
    Keyboard Event Listener

    w/W/ArrowUp => Arm Joint Up
    s/S/ArrowDown => Arm Joint Down

    d/D/ArrowRight => Base Right
    a/A/ArrowLeft => Base Left

    q/Q => Grip close
    e/E => Grip Open
*/
/*
    Selectors
*/
const sliders = [
  {
    input: document.querySelector(".slider-1 input"),
    text: document.querySelector(".slider-1 div"),
    range: 1500,
    code: "a",
  },
  {
    input: document.querySelector(".slider-2 input"),
    text: document.querySelector(".slider-2 div"),
    range: 1500,
    code: "b",
  },
  {
    input: document.querySelector(".slider-3 input"),
    text: document.querySelector(".slider-3 div"),
    range: 1500,
    code: "c",
  },
  {
    input: document.querySelector(".slider-4 input"),
    text: document.querySelector(".slider-4 div"),
    range: 1500,
    code: "d",
  },
];

const sliderContainer = document.querySelector('.slider-container');

/*
    Variables
*/
// Constants
const INIT_RANGE = 1500;
const MIN_RANGE = 0;
const MAX_RANGE = 3000;


/*
    Functions
*/
const operations = {
  '+': (operand1, operand2) => {
        return operand1 + operand2;
  },
  '-': (operand1, operand2) => {
        return operand1 - operand2;
  }
};

const updateDisplayText = (slider) => {
  slider.range = slider.input.value;

  if (slider.text.textContent) {
    slider.text.textContent = "";
  }

  const text = document.createElement("p");
  text.innerHTML = "<p>" + slider.input.value + "</p>";

  slider.text.appendChild(text);
};

const updateSliderValueKeyboard = (sliders, operators) => {
  const STEP = 50;
  
  sliders.range = operations[operators](+sliders.range, STEP);
  sliders.input.value = +sliders.range;
  updateDisplayText(sliders);
};

const updateSliderValueDirect = (slider) => {
    updateDisplayText(slider);
    req();
}

const addSliderListener = (event) => {

  switch (event.code) {
    case "KeyW":
    case "ArrowUp":
      updateSliderValueKeyboard(sliders[2], '+');
      break;
    case "KeyS":
    case "ArrowDown":
      updateSliderValueKeyboard(sliders[2], '-');
      break;
    case "KeyD":
    case "ArrowRight":
      updateSliderValueKeyboard(sliders[0], '+');
      break;
    case "KeyA":
    case "ArrowLeft":
      updateSliderValueKeyboard(sliders[0], '-');
      break;
    case "KeyE":
      updateSliderValueKeyboard(sliders[1], '+');
      break;
    case "KeyQ":
      updateSliderValueKeyboard(sliders[1], '-');
      break;
    case "KeyC":
      updateSliderValueKeyboard(sliders[3], '+');
      break;
    case "KeyZ":
      updateSliderValueKeyboard(sliders[3], '-');
      break;
  }
  req();
}

const initialize = () => {
  for (let i = 0; i < 4; i++) {
    updateDisplayText(sliders[i]);
  }
};

const resetValue = () => {
  for (let slider of sliders) {
      slider.input.value = 1500;
      updateDisplayText(slider);
  }
};

const addSliderHandler = (event) => {
  addSliderListener(event);
}

document.addEventListener("keydown", addSliderHandler, false);

initialize();

