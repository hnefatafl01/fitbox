const mongoose = require('mongoose');
const router = require('express').Router();
const { authenticate } = require('../auth/authenticate');
const Client = require('../controllers/client.controller');

router.delete('/:id/delete', authenticate , Client.deleteClient);
router.get('/:id', authenticate , Client.getClient);
router.post('/', authenticate , Client.createClient);
router.get('/' , authenticate, Client.getClients);

module.exports = router;