/*
    Global Variables
*/
let macros = [];
let movements = [];
let currentIndex = 0;
const baseURL = 'http://localhost:3020';

/*
    Query Selectors
*/
const movementSelectorContainer = document.querySelector('.movement-number');
const numberDivArray = document.querySelectorAll('.movement-number-div');

const fetchMacroButton = document.querySelector('.macro__list-button');
const addMacroButton = document.querySelector(".form-button-add");
const addMovementButton = document.querySelector(".movement-button-add");
const removeMovementButton = document.querySelector('.movement-button-delete');
const executeMovementsButton = document.querySelector('.movement__list-button');

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
/* Helper Functions */
const removeCurrentActiveClass = () => {
    const temporaryArray = []
    if (movements.length > 0) {
        for (let numberDiv of movementSelectorContainer.childNodes) {
            if (numberDiv.classList) {
                    temporaryArray.push(numberDiv);
                if (numberDiv.classList.contains('active')) { 
                    numberDiv.classList.remove('active'); 
                }
            }
        }
    }

    return temporaryArray;
}

const setCurrentActiveClass = (index) => {
    const temporaryArray = [];
    if (movements.length > 0) {
        for (let numberDiv of movementSelectorContainer.childNodes) {
            if (numberDiv.classList) {
                temporaryArray.push(numberDiv);
            }
        }
    }
    temporaryArray[index].classList.add('active');

}

const getMovementInput = () => {
    angles = []; 
    for (let angle of angleInputs) {
        angles.push(angle.value);
    }
     return {
        name: movementNameInput.value,
        angles: angles
      };
}

const resetMovementInput = () => {
    movementNameInput.value = '';
    for (let angle of angleInputs) {
        angle.value = '';
    }
}

const showMovement = (index) => {
    const tempArr = removeCurrentActiveClass();
    currentIndex = index;
    if (index == tempArr.length - 1)  {
        resetMovementInput();
    }
    else {
        movementNameInput.value = movements[index].name;
        let i = 0;
        for (let angleInput of angleInputs) {
            angleInput.value = +movements[index].angles[i];
            i++;
        }
    }

    setCurrentActiveClass(index);
}

const createNumberDiv = () => {
    const numberElement = document.createElement('div');
    /* Remove active class from currentIndex - 1 and pass it into the currently created NumberSpan */
    removeCurrentActiveClass();
    let curIndex = currentIndex;

    numberElement.classList.add('movement-number-div');
    numberElement.classList.add('active');
    numberElement.textContent = String(+movements.length + 1);
    numberElement.addEventListener('click', () => showMovement(curIndex));

    movementSelectorContainer.appendChild(numberElement);
}

const deleteNumberDiv = () => {
    let numberDivs = movementSelectorContainer.childNodes;
    let len = numberDivs.length;
    for (let i = 0; i < len; i++) {
        if (numberDivs[i].classList) {
            if (numberDivs[i].classList.contains('active')) { 
               return movementSelectorContainer.removeChild(numberDivs[i + 1]);
            }
        }
    }
}

/* Main Functions */
const addNewMovement = () => {
    const newMovement = getMovementInput();
    movements.push(newMovement);
    currentIndex += 1;
    createNumberDiv();
    resetMovementInput();

};

const deleteCurrentMovement = () => {
    movements.splice(currentIndex, 1);
    deleteNumberDiv();
    resetMovementInput();
    
};

const fetchMacro = () => {
    // fetch(baseURL + '/devices/userId?');
    let newElement;
    let newElementButton;
    let newElementSpan;
    let index = 0;

    while (macroListSelector.firstChild) {
        macroListSelector.removeChild(macroListSelector.firstChild);
    }

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
        movements: movements
    }

    macros.push(newMacro);
    movements = [];
    // fetch()
}

const toggleInSliderListener = (input) => {
    document.removeEventListener('keydown', addSliderHandler, false);
}

const toggleOutSliderListener = () => {
    document.addEventListener('keydown', addSliderHandler, false);
}

/* Initializer function */
const init = () => {
    createNumberDiv();
}

/*
    Event Listeners
*/
fetchMacroButton.addEventListener('click', fetchMacro);
addMacroButton.addEventListener('click', postMacro);
addMovementButton.addEventListener('click', addNewMovement);
removeMovementButton.addEventListener('click', deleteCurrentMovement);

executeMovementsButton.addEventListener('click', executeMacro);

movementNameInput.addEventListener('focusin', (e) => toggleInSliderListener(e));
for (let angleInput of angleInputs) {
    angleInput.addEventListener('focusin', (e) => toggleInSliderListener(e));
}

movementNameInput.addEventListener('focusout', (e) => toggleOutSliderListener(e));
for (let angleInput of angleInputs) {
    angleInput.addEventListener('focusout', (e) => toggleOutSliderListener(e))
}

/* Initializer */
init();


