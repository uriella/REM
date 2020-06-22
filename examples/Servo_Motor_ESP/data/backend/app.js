/*
    Modules
*/
// Core Modules
const path = require('path');

// NPM Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

/*
    Express Setup 
*/
const app = express();
dotenv.config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Authorization");
    next();
});

app.use(bodyParser.json());

/*
    Routes
*/

/*
    Error Handling
*/


/*
    Database & Server Setup
*/
const port = 3030;
mongoose.connect(process.env.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => {
    app.listen(port, () => {
        console.log('REM server has started.')
    });
})
.catch(err => {
    console.log(err);
});

