/*
    Modules
*/
const express = require('express');

/*
    Router & Controllers Setup
*/
const router = express.Router();
const macroController = require('../controllers/macro');

/*
    Get All Macro
    path: /macro
    method: GET
    description: 
        Get all macros from the database and send it to the views.
*/
router.get('/macro', macroController.getMacros);

/*
    Add Macro
    path: /macro
    method: PUT
    description:
        Put a macro inside the database.
*/
router.post('/macro', macroController.addMacro);


/*
    Get Specific Macro
    path: /macro/:macroId
    method: GET
    description:
        Get a specific macro based on the macroId params.
*/
router.get('/macro/:macroId', macroController.getMacro);


module.exports = router;