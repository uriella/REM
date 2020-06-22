const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const macroSchema = new Schema({
    macroName: {
        type: String,
        required: true
    },
    movements: [{
        movementName: {
            type: String,
            required: true
        },
        angles: {
            angleOne: {
                type: Number,
                required: true
            },
            angleTwo: {
                type: Number,
                required: true
            },
            angleThree: {
                type: Number,
                required: true
            },
            angleFour: {
                type: Number,
                required: true
            }
        },
    }]
});

module.exports = mongoose.model('Macro', macroSchema);