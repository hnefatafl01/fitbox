"use strict";
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const users = require('./api/v1/user.routes');

const db = mongoose.connect(process.env.DB_URI, { useMongoClient: true });
db.on('error', () => {
    console.error.bind(console, 'connection error');
    process.exit();
});
db.once('open', () => console.log('connected db'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Fitbox"});
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})

