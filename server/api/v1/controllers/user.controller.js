const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports = {
    getUsers: function(req, res) {
        return User.find({}, (err, users) => {
            if (err) { 
                throw new Error(err);
                res.status(400).send({ message: "Bad Request: Could not retrieve users"});
            }
            res.send(users);
        });
    },
    createUser: function(req, res) {
        return User.create({ username: req.body.username, password: req.body.password }, (err, user) => {
            if (err) { 
                throw new Error(err);
                res.status(500).send({ message: "Server Error: Could not create user"});
            }
            res.send(user);
        });
    },
    getUser: function(req, res) {
        return User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                throw new Error(err);
                res.status(400).send({ message: "Bad Request: Could not retrieve user by username"});
            }
            res.send(user);
        });
    },
    
    
}
