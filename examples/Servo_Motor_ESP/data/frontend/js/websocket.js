/*
  Selectors
*/
const ipSelect = document.querySelector(".ip-select");
const networkStatusSelector = document.querySelector('.ip-container__status');

/*
    Variables
*/
// Global Variables
let ip_address = "192.168.0.30";
let ws = null;

/*
    Functions
*/
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
  if (ws) {
    ws.send(code);
  }
};

const res = () => {
  // Receive Response from WebSocket Server
};




