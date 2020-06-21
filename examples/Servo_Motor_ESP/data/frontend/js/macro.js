/*
    Global Variables
*/
let macros = [];
let movements = [];
let currentIndex = 0;
let lastIndex = 0;
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
/* Helper Functions */

const getNumberDivs = () => {
    const numberDivs = [];
    for (let numberDiv of movementSelectorContainer.childNodes) {
        if (numberDiv.classList) {
                numberDivs.push(numberDiv);
        }
    }
    return numberDivs;
}

const searchAddedNumberDiv = () => {
    const numberDivs = getNumberDivs();
    for (let numberDiv of numberDivs) {
        if (numberDiv.classList.contains('movement-is-added')) {
            return numberDiv;
        }
    }
}

const searchActiveNumberDiv = () => {
    const numberDivs = getNumberDivs();
    for (let numberDiv of numberDivs) {
           if (numberDiv.classList.contains('active')) { 
               return numberDiv;
        }
    }
}

const removeCurrentActiveClass = () => {
    const activeNumberDiv = searchActiveNumberDiv();
    if (activeNumberDiv) {
        activeNumberDiv.classList.remove('active');
    }
};

const setCurrentActiveClass = (index) => {
    const numberDivs = getNumberDivs();
    numberDivs[index].classList.add('active');
};

const setCurrentAddedClass = (index) => {
    const numberDivs = getNumberDivs();
    if (numberDivs[index]) {
        numberDivs[index].classList.add('movement-is-added-active');
    }
};

const removeCurrentAddedActiveClass = () => {
    const addedNumberDiv = searchAddedNumberDiv();
    addedNumberDiv.classList.remove('movement-is-added-active');
};

const transformAddedMovementClass = () => {
    const activeNumberDiv = searchActiveNumberDiv();
    activeNumberDiv.classList.remove('active');
    activeNumberDiv.classList.add('movement-is-added');
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
    console.log('idx: ' + index);
    const numberDivs = getNumberDivs();
    if (numberDivs[currentIndex].classList.contains('movement-is-added')) {
        removeCurrentAddedActiveClass();
    }
    else {
        removeCurrentActiveClass();
    }


    currentIndex = index;

    if (movements[index]) {
        movementNameInput.value = movements[index].name;
        let i = 0;
        for (let angleInput of angleInputs) {
            angleInput.value = +movements[index].angles[i];
            i++;
        }
    }
    else {
        resetMovementInput();
    }


    if (numberDivs[index].classList.contains('movement-is-added')) {
        setCurrentAddedClass(index);
    }
    else {
        setCurrentActiveClass(index);
    }
}

const createNumberDiv = () => {
    const numberElement = document.createElement('div');
    /* Remove active class from currentIndex - 1 and pass it into the currently created NumberSpan */
    removeCurrentActiveClass();
    let nextIndex = lastIndex;

    numberElement.classList.add('movement-number-div');
    numberElement.classList.add('active');
    numberElement.textContent = String(+nextIndex + 1);
    numberElement.addEventListener('click', () => showMovement(+nextIndex));

    movementSelectorContainer.appendChild(numberElement);
}

const deleteNumberDiv = () => {
    let numberDivs = movementSelectorContainer.childNodes;
    let len = numberDivs.length;
    let i = 0;

    for (let numberDiv of numberDivs) {
        if (numberDiv.classList) {
            if (numberDiv.classList.contains('active')) { 
                if (i == len - 1) {
                    movementSelectorContainer.removeChild(numberDiv);
                }
                else {
                    movementSelectorContainer.removeChild(numberDivs[i + 1]);
                }
            }
        }
        i += 1;
    }
}

/* Main Functions */
const addNewMovementCheck = () => {
    let angleInputCheck = true;
    let movementNameInputCheck = true;

    for (let angle of angleInputs) {
        if (angle.value == null || angle.value == '') {
            angleInputCheck = false;
        }
    }
    if (movementNameInput.value == '') {
        movementNameInputCheck = false;
    }
    return angleInputCheck && movementNameInputCheck;
}

const addedMovementCheck = (index) => {
    let canMovementBeAddedCheck = true;

    const numberDivs = getNumberDivs();
    if (numberDivs[index].classList.contains('movement-is-added')) {
            canMovementBeAddedCheck = false;
    }

    return canMovementBeAddedCheck;
}

const addNewMovement = () => {
    let localCurrentIndex = currentIndex;

    let checkOne = addNewMovementCheck();
    let checkTwo = addedMovementCheck(localCurrentIndex);

    if (checkOne && checkTwo){
        const newMovement = getMovementInput();
        movements.push(newMovement);
        transformAddedMovementClass();
    }
};

const addNewMovementPage = () => {
    lastIndex += 1;
    currentIndex = lastIndex;
    createNumberDiv();
    resetMovementInput();
}

const deleteCurrentMovement = () => {
    let movementsLengthCheck = true;
    if (movements.length == 0) {
        movementsLengthCheck = false;
    }

    if (movementsLengthCheck) {
        movements.splice(currentIndex, 1);
        deleteNumberDiv();
        resetMovementInput();
    }
};

const resetAllMovements = () => {
    while (movements.length != 0) {
        deleteCurrentMovement();
    }
}

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
    fetchMacro();
    resetAllMovements();
    
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
addMovementPageButton.addEventListener('click', addNewMovementPage)

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


