const { ObjectID } = require('mongodb');
const Client = require('../models/client.model');

module.exports = {
    getClients: function(req, res) {
        return Client.find({ _creator: req.user._id }, (err, clients) => {
            if (err) { 
                throw new Error(err);
                res.status(400).send({ message: 'bad request' });
            }
            res.send(clients);
        });
    },
    createClient: function(req, res) {
        return Client.create(
            { name: req.body.name, _creator: req.user._id },
            (err, client) => {
            if (err) {
                throw new Error(err);
                res.status(500).send({ message: 'could not create user' });
            }
            res.send(client);
        });
    },
    getClient: function(req, res) {
        const id = req.params.id;
        return Client.findOne(
            { _id: id, _creator:req.user._id },
            (err, client) => {
                if (err) {
                    throw new Error(err);
                    res.status(404).send({ message: "Client not found"});
                }
                res.send(client);
        });
    },
    deleteClient: function(req, res) {
        const id = req.params.id;
        return Client.findOneAndRemove({_creator:req.user._id, _id : id}, (err, client) => {
            if (err) {
                throw new Error(err);
                res.status(500).send({ message: "Could not remove client" });
            }
            res.send(client);
        });
    }
}
