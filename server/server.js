require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const clients = require('./api/v1/routes/client.routes'); 
const user = require('./api/v1/routes/user.routes'); 
const { mongoose } = require('./api/v1/db/mongoose');
const configOpts = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "exposedHeaders": "x-auth",
    "allowedHeaders": ['Content-Type', 'x-auth']
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(configOpts));
app.use('/clients', clients);
app.use('/user', user);

app.get('/', (req, res) => {
    res.send('welcome to fitbox');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});