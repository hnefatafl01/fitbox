"use strict";
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const app = express();

const db = require('./api/v1/db/mongoose');
const users = require('./api/v1/routes/user.routes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', users);

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.json({ message: "Welcome to Fitbox v1.0" });
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})

function validateUser(username, password) {
    
}

module.exports.app = app;