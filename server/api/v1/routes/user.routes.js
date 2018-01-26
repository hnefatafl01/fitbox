const mongoose = require('mongoose');
const router = require('express').Router();
const UserQ = require('../controllers/user.controller');

router.delete('/:id/delete', UserQ.deleteUser);
router.patch('/:id/edit', UserQ.updateUser);
router.get('/:id', UserQ.getUser);
router.get('/', UserQ.getUsers);
router.post('/', UserQ.createUser);

module.exports = router;