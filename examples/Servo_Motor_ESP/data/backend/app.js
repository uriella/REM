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
const cors = require('cors');

/*
    Express Setup 
*/
const app = express();

app.use(bodyParser.json());

app.use(cors({
    credentials: true,
    origin: true
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization",'Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});


dotenv.config();


/*
    Routes
*/
const macroRoutes = require('./routes/macro');

app.use(macroRoutes);

/*
    Error Handling
*/
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message: message,
        data: data
    })
});

/*
    Database & Server Setup
*/
mongoose.connect(process.env.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => {
    app.listen(process.env.PORT, () => {
        console.log('REM server has started on port ' + process.env.PORT);
    });
})
.catch(err => {
    console.log(err);
});

