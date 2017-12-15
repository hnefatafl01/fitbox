const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../models/user.model');
const UserQ = require('../controllers/user.controller');

router.delete('/:id/delete', UserQ.deleteUser);
router.put('/:id/edit', UserQ.updateUser);
router.get('/:id', UserQ.getUser);
router.get('/', UserQ.getUsers);
router.post('/', UserQ.createUser);

module.exports = router;