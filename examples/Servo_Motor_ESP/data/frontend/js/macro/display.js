/*
    Functions
*/

/*
    A. Display Controller Functions
*/
const hideMacroContainer = (container) => {
    if (container.classList) {
        container.classList.add('hide-container');
    }
};

const showMacroContainer = (container) => {
    hideMacroContainer(lastMacroContainer);

    if (container.classList) {
        container.classList.remove('hide-container');
    };

    lastMacroContainer = container;
};

const hideListContainer = (container) => {
    container.classList.add('hide-container');
};

const showListContainer = (container) => {
    hideListContainer(lastListContainer);
    container.classList.remove('hide-container');
    lastListContainer = container;
};

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
};

const deleteAllNumberDiv = () => {
    while (movementSelectorContainer.firstChild) {
        movementSelectorContainer.removeChild(movementSelectorContainer.lastChild);
    }
}

const resetAllNumberDivs = () => {
    deleteAllNumberDiv();
    currentIndex = 0;
    lastIndex = 0;
    createNumberDiv();
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
    resetMovementInput();
}

const toggleInSliderListener = (input) => {
    document.removeEventListener('keydown', addSliderHandler, false);
}

const toggleOutSliderListener = () => {
    document.addEventListener('keydown', addSliderHandler, false);
}
