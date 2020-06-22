/*
    Global Variables
*/
let lastMacroContainer;
let lastListContainer;
let lastMacroListContainer;


let macros = [];
let movements = [];
let currentIndex = 0;
let lastIndex = 0;

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

const movementListBackButton = document.querySelector('.movement__list-back-button');

const macroNameInput = document.querySelector('.macro__form input');
const movementNameInput = document.querySelector('.movement-name input');
const angleInputs = [
     document.querySelector('.movement-angle1 input'),
     document.querySelector('.movement-angle2 input'),
     document.querySelector('.movement-angle3 input'),
     document.querySelector('.movement-angle4 input')
];

const movementListDiv = document.querySelector('.movement__list');

const macroListSelector = document.querySelector('.macro__list ul');
const movementListSelector = document.querySelector('.movement__list ul');
/*
    Functions
*/
/* Display Handler */



