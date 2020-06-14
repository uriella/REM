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
const updateDisplayText = (slider) => {
  slider.range = slider.input.value;

  if (slider.text.textContent) {
    slider.text.textContent = "";
  }

  const text = document.createElement("p");
  text.innerHTML = "<p>" + slider.input.value + "</p>";

  slider.text.appendChild(text);
};

const openWebsocket = () => {
  ip_address = document.querySelector(".ip-container input").value;
  ws = new WebSocket("ws://" + ip_address + "/end");
  document.querySelector("#connect").disabled = true;
  document.querySelector("#disconnect").disabled = false;

  ws.onopen = () => {
    // document.querySelector(".slider-container").style.display = "block";
  };

  ws.onclose = () => {
    // document.querySelector(".slider-container").style.display = "none";
  };
};

const closeWebsocket = () => {
  document.querySelector("#connect").disabled = false;
  document.querySelector("#disconnect").disabled = true;
  ws.close();
};

const req = (slider) => {
  updateDisplayText(slider);
  ws.send(slider.code + slider.range);
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

document.addEventListener("keydown", (event) => {
  const STEP = 50;

  switch (event.code) {
    case "KeyW":
    case "ArrowUp":
      sliders[2].range = +sliders[2].range + STEP;
      sliders[2].input.value = sliders[2].range;
      req(sliders[2]);
      break;
    case "KeyS":
    case "ArrowDown":
      sliders[2].range = +sliders[2].range - STEP;
      sliders[2].input.value = sliders[2].range;
      req(sliders[2]);
      break;
    case "KeyD":
    case "ArrowRight":
      sliders[0].range = +sliders[0].range + STEP;
      sliders[0].input.value = sliders[0].range;
      req(sliders[0]);
      break;
    case "KeyA":
    case "ArrowLeft":
      sliders[0].range = +sliders[0].range - STEP;
      sliders[0].input.value = sliders[0].range;
      req(sliders[0]);
      break;
    case "KeyE":
      sliders[1].range = +sliders[1].range + STEP;
      sliders[1].input.value = sliders[1].range;
      req(sliders[1]);
      break;
    case "KeyQ":
      sliders[1].range = +sliders[1].range - STEP;
      sliders[1].input.value = sliders[1].range;
      req(sliders[1]);
      break;
    case "KeyC":
      sliders[3].range = +sliders[3].range + STEP;
      sliders[3].input.value = +sliders[3].range;
      req(sliders[3]);
      break;
    case "KeyZ":
      sliders[3].range = +sliders[3].range - STEP;
      sliders[3].input.value = +sliders[3].range;
      req(sliders[3]);
      break;
  }
});

initialize();
