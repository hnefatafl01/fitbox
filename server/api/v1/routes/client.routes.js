const mongoose = require('mongoose');
const router = require('express').Router();
const Client = require('../controllers/client.controller');

router.post('/', Client.createClient);
router.get('/', Client.getClients);

module.exports = router;