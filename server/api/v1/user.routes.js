const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('./models/user.model');
const UserQ = require('./controllers/user.controller');

router.get('/:id', UserQ.getUser);
router.get('/', UserQ.getUsers);
router.post('/', UserQ.createUser);

module.exports = router;