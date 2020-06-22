
/*
    postMacro()
    description:
    Post a macro into the REST API database.
*/
const postMacro = () => {
    fetch('http://localhost:3030/macro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: macroNameInput.value,
            movements: movements
        })
    })
    .then(res => {
        if (res.status != 201) {
            throw new Error('Failed to post macro data.');
        }
        return res.json();
    })
    .then(resData => {
        console.log(resData.message);
        console.log('Created Macro: ' + resData.macro);
        fetchMacro();
        resetAllMovements();
        resetAllNumberDivs();
    })
    .catch(err => {
        console.log(err);
    })
}

/*
    fetchMacro()
    description: 
    fetch all the macros from the database.
*/
const fetchMacro = () => {
    let index = 0;

    fetch('http://localhost:3030/macro', {
        method: 'GET'
    })
    .then(res => {
        if (res.status != 200) {
            throw new Error('Failed to fetch macro data.');
        }
        return res.json();
    })
    .then(resData => {
        console.log("Successfully fetched macros: " + resData.macros);
        macros = [
            ...resData.macros
        ]

        while (macroListSelector.firstChild) {
            macroListSelector.removeChild(macroListSelector.lastChild);
        }

        for (let macro of macros) {
            let newElement;
            let newElementButton;
            let newElementSpan;
            let currentIndex = index;
            newElement = document.createElement('li');

            newElementSpan = document.createElement('span');
            newElementSpan.textContent = macro.macroName;

            newElementButton = document.createElement('button');
            newElementButton.textContent = '+';
            newElementButton.addEventListener('click', () => loadMovements(currentIndex));

            newElement.appendChild(newElementSpan);
            newElement.appendChild(newElementButton)
            macroListSelector.appendChild(newElement);

            index += 1;
        }
    })
    .catch(err => {
        console.log(err);
    });
}

/*
    loadMovements()
    description:
    load movements from a certain macro index.
*/
const loadMovements = (macroIndex) => {
    showListContainer(movementListContainer);

    while (movementListSelector.firstChild) {
        movementListSelector.removeChild(movementListSelector.lastChild);
    }

    for (let element of movementListDiv.childNodes) {
        if (element.classList) {
            if (element.classList.contains('movement__list-button')) {
                movementListDiv.removeChild(element);
            }
        }
    }

    const currentMovements = macros[macroIndex].movements;
    let index = 0;
    for (let movement of currentMovements) {
        let currentIndex = index;
        let newEl;
        let newElButton;
        let newExecutionButton;
        let newElSpan;

        newEl = document.createElement('li');

        newElSpan = document.createElement('span');
        newElSpan.textContent = movement.movementName;

        newElButton = document.createElement('button');
        newElButton.textContent = 'x';
        newElButton.addEventListener('click', () => executeMovement(macroIndex, currentIndex))

        newEl.appendChild(newElSpan);
        newEl.appendChild(newElButton);
        movementListSelector.appendChild(newEl);

        index += 1;
    }
        newExecutionButton = document.createElement('button');
        newExecutionButton.textContent = 'Execute Movement';
        newExecutionButton.classList.add('movement__list-button');
        newExecutionButton.addEventListener('click', () => executeMacro(macroIndex));

        movementListDiv.appendChild(newExecutionButton);
}

/*
    executeMovement()
    description:
    Execute a certain movement from a set of angles. 
*/
const executeMovement = (macroIndex, movementIndex) => {
    const currentMovement = macros[macroIndex].movements[movementIndex];

    const angles = currentMovement.angles;

    sliders[0].range = angles.angleOne;
    sliders[1].range = angles.angleTwo;
    sliders[2].range = angles.angleThree;
    sliders[3].range = angles.angleFour;

    sliders[0].input.value = angles.angleOne;
    sliders[1].input.value = angles.angleTwo;
    sliders[2].input.value = angles.angleThree;
    sliders[3].input.value = angles.angleFour;

    for (let slider of sliders) {
        updateDisplayText(slider);
    }

    req();
}

/*
    executeMacro()
    description:
    Execute a whole macro with a set of movements.
*/

const executeMacro = (macroIndex) => {
    const macro = macros[macroIndex];

    let movementIndex = 0;

    let movementInterval = window.setInterval(() => {
        if (!(movementIndex < macro.movements.length)) {
            clearInterval(movementInterval);    
            return;
        }
        console.log(movementIndex);
        executeMovement(macroIndex, movementIndex);
        movementIndex += 1;
    }, 1500) 
};



