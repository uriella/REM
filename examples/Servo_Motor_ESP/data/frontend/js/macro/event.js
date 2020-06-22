
/* Initializer function */
const macroInitialize = () => {
    lastMacroContainer = macroFirstContainer;
    lastListContainer = macroListContainer;
    hideMacroContainer(macroSecondContainer);
    hideListContainer(movementListContainer);
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

showMacroListButton.addEventListener('click', () => showListContainer(macroListContainer));
showAddMacroButton.addEventListener('click', () => showListContainer(macroSecondContainer));

movementNameInput.addEventListener('focusin', (e) => toggleInSliderListener(e));
for (let angleInput of angleInputs) {
    angleInput.addEventListener('focusin', (e) => toggleInSliderListener(e));
}

movementNameInput.addEventListener('focusout', (e) => toggleOutSliderListener(e));
for (let angleInput of angleInputs) {
    angleInput.addEventListener('focusout', (e) => toggleOutSliderListener(e))
}

/* Initializer */
macroInitialize();
