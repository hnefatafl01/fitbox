const mongoose = require('mongoose');
const router = require('express').Router();
const UserQ = require('../controllers/user.controller');
/* Admin Routes
router.delete('/:id/delete', UserQ.deleteUser);
router.patch('/:id/edit', UserQ.updateUser);
router.get('/:id', UserQ.getUser);
router.get('/', UserQ.getUsers);
*/

router.post('/signup', UserQ.signupUser);
router.post('/login', UserQ.loginUser);
router.delete('/logout', UserQ.logoutUser);

module.exports = router;