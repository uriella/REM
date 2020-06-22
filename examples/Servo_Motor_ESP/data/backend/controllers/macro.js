/*
    Models
*/
const Macro = require('../models/macro');

/*
    Functions
*/
// getMacros -- '/macro' - GET
exports.getMacros = (req, res, next) => {
    Macro.find().
    then(macros => {
        res.status(200).json({
            message: "Fetched All Macros successfully.",
            macros: macros
        })
    })
    .catch(err => {
        console.log(err);
    })
};

// getMacro -- '/macro/:macroId' - GET
exports.getMacro = (req, res, next) => {
    Macro.findById(macroId)
    .then(macro => {
        res.status(200).json({
            message: "Fetched Macro successfully.",
            macro: macro
        });
    }) 
    .catch(err => {
        console.log(err);
    })
};

// addMacro -- '/macro' - PUT
exports.addMacro = (req, res, next) => {

};