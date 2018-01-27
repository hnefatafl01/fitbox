const mongoose = require('mongoose');
const router = require('express').Router();
const Client = require('../controllers/client.controller');

router.delete('/:id/delete', Client.deleteClient);
router.get('/:id', Client.getClient);
router.post('/', Client.createClient);
router.get('/', Client.getClients);

module.exports = router;