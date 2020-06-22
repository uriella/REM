/*
    Global Variables
*/
let lastMacroContainer;
let lastListContainer;

let macros = [];
let movements = [];
let currentIndex = 0;
let lastIndex = 0;
const baseURL = 'http://localhost:3020';

/*
    Query Selectors
*/
const macroFirstContainer = document.querySelector('.macro-first-container');
const macroSecondContainer = document.querySelector('.macro-second-container');
const macroThirdContainer = document.querySelector('.macro-third-container')

const macroListContainer = document.querySelector('.macro__list-container');
const movementListContainer = document.querySelector('.movement__list-container')

const movementSelectorContainer = document.querySelector('.movement-number');
const numberDivArray = document.querySelectorAll('.movement-number-div');

const showMacroListButton = document.querySelector('.macro-list-button');
const showAddMacroButton = document.querySelector('.add-macro-button');

const fetchMacroButton = document.querySelector('.macro__list-button');
const addMacroButton = document.querySelector(".form-button-add");
const addMovementButton = document.querySelector(".movement-button-add");
const removeMovementButton = document.querySelector('.movement-button-delete');
const executeMovementsButton = document.querySelector('.movement__list-button');
const addMovementPageButton = document.querySelector('.movement-add button');

const macroNameInput = document.querySelector('.macro__form input');
const movementNameInput = document.querySelector('.movement-name input');
const angleInputs = [
     document.querySelector('.movement-angle1 input'),
     document.querySelector('.movement-angle2 input'),
     document.querySelector('.movement-angle3 input'),
     document.querySelector('.movement-angle4 input')
];

const macroListSelector = document.querySelector('.macro__list ul');
const movementListSelector = document.querySelector('.movement__list ul');
/*
    Functions
*/
/* Display Handler */

const fetchMacro = () => {
    // fetch(baseURL + '/devices/userId?');
    let newElement;
    let newElementButton;
    let newElementSpan;
    let index = 0;
    console.log('asd1');
    while (macroListSelector.firstChild) {
        macroListSelector.removeChild(macroListSelector.firstChild);
    }
    console.log('asd2');

    for (let macro of macros) {
        let currentIndex = index;
        newElement = document.createElement('li');

        newElementSpan = document.createElement('span');
        newElementSpan.textContent = macro.name;

        newElementButton = document.createElement('button');
        newElementButton.textContent = '+';
        newElementButton.addEventListener('click', () => loadMovements(currentIndex));

        newElement.appendChild(newElementSpan);
        newElement.appendChild(newElementButton)
        macroListSelector.appendChild(newElement);

        index += 1;
    }
}

const executeMovement = (angles) => {
    let index = 0;
    console.log('angles arr: ' + angles);
    for (let angle of angles) {
        console.log('angles #' + index + ': ' + angle);
        sliders[index].range = angle;
        sliders[index].input.value = angle;
        updateDisplayText(sliders[index]);
        index += 1;
    }

    req()
}

const loadMovements = (macroIndex) => {
    const currentMovements = macros[macroIndex].movements;
    let index = 0;
    for (let movement of currentMovements) {
        let currentIndex = index;
        newElement = document.createElement('li');

        newElementSpan = document.createElement('span');
        newElementSpan.textContent = movement.name;

        newElementButton = document.createElement('button');
        newElementButton.textContent = 'Exec';
        newElementButton.addEventListener('click', executeMovement(movement.angles))
        index += 1;
    }
}

const executeMacro = (macroIndex) => {
    const macro = macros[macroIndex];
    for (let movement of macro.movements) {
        executeMovement(movement.angles)
    }
};

const postMacro = () => {
    const newMacro = {
        name: macroNameInput.value,
        movements: [
            ...movements
        ]
    }

    macros.push(newMacro);
    fetchMacro();
    resetAllMovements();
    resetAllNumberDivs();
    // fetch()
}


