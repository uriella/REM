/*
    postMacro()
    description:
    Post a macro into the REST API database.
*/
const postMacro = () => {
    const newMacro = {
        name: macroNameInput.value,
        movements: [
            ...movements
        ]
    }

    // fetch(baseURL);

    macros.push(newMacro);
    fetchMacro();
    resetAllMovements();
    resetAllNumberDivs();
}

/*
    fetchMacro()
    description: 
    fetch all the macros from the database.
*/
const fetchMacro = () => {
    // fetch(baseURL + '/devices/userId?');
    let newElement;
    let newElementButton;
    let newElementSpan;
    let index = 0;

    
    console.log('test1');

    for (let macro of macros) {
        console.log('test2');
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

/*
    executeMovement()
    description:
    Execute a certain movement from a set of angles. 
*/
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

/*
    loadMovements()
    description:
    load movements from a certain macro index.
*/
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

/*
    executeMacro()
    description:
    Execute a whole macro with a set of movements.
*/
const executeMacro = (macroIndex) => {
    const macro = macros[macroIndex];
    for (let movement of macro.movements) {
        executeMovement(movement.angles)
    }
};

