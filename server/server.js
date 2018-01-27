require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const clients = require('./api/v1/routes/client.routes'); 
const user = require('./api/v1/routes/user.routes'); 
const { mongoose } = require('./api/v1/db/mongoose');

app.use(bodyParser.json());
app.use(cors());
app.use('/clients', clients);
app.use('/user', user);

app.get('/', (req, res) => {
    res.send('welcome to fitbox');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});