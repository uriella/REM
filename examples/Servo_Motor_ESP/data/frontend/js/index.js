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

const ipSelect = document.querySelector(".ip-select");
const sliderContainer = document.querySelector('.slider-container');
const networkStatusSelector = document.querySelector('.ip-container__status');

/*
    Variables
*/
// Constants
const INIT_RANGE = 1500;
const MIN_RANGE = 0;
const MAX_RANGE = 3000;

// Global Variables
let ip_address = "192.168.0.30";
let ws = null;

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

const openWebsocket = () => {
  ip_address = document.querySelector(".ip-container input").value;
  ws = new WebSocket("ws://" + ip_address + "/end");
  document.querySelector("#connect").disabled = true;
  document.querySelector("#disconnect").disabled = false;

  ws.onopen = () => {
    networkStatusSelector.textContent = "Connected";
    document.querySelector(".ip-container__status").style.background = "#77AA77";
  };

  ws.onclose = () => {
    networkStatusSelector.textContent = "Not Connected";
    document.querySelector(".ip-container__status").style.background = "#AA7777";
  };
};

const closeWebsocket = () => {
  document.querySelector("#connect").disabled = false;
  document.querySelector("#disconnect").disabled = true;
  ws.close();
};

const req = () => {
  let code = '';
  for (let slider of sliders) {
    code += slider.code + slider.range.toString().padStart(4, "0");
  }
  //  console.log('code: ' + code); 
  /* code expected output: a1000b2000c3000d4000 */
  ws.send(code);
};

const res = () => {
  // Receive Response from WebSocket Server
};

const initializeSliders = () => {};

const initialize = () => {
  for (let i = 0; i < 4; i++) {
    updateDisplayText(sliders[i]);
  }
};



const reset = () => {
  for (let i = 0; i < 4; i++) {
    sliders[i].input.value = 1500;
  }
};

/*
    Keyboard Event Listener

    w/W/ArrowUp => Arm Joint Up
    s/S/ArrowDown => Arm Joint Down

    d/D/ArrowRight => Base Right
    a/A/ArrowLeft => Base Left

    q/Q => Grip close
    e/E => Grip Open
*/

const addSliderHandler = (event) => {
  addSliderListener(event);
}

document.addEventListener("keydown", addSliderHandler, false);

initialize();
