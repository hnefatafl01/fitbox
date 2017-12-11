const mongoose = require('mongoose');
const User = require('../models/user.model');
const status = {
    BadReq: { message: "Bad Request: Could not retrieve users"},
    ServerError: { message: "Server Error: Could not create user"}
}


module.exports = {
    getUsers: function(req, res) {
        return User.find({}, (err, users) => {
            if (err) { 
                throw new Error(err);
                res.status(400).send(status.BadReq);
            }
            res.send(users);
        });
    },
    createUser: function(req, res) {
        return User.create({ username: req.body.username, password: req.body.password }, (err, user) => {
            if (err) { 
                throw new Error(err);
                res.status(500).send(status.ServerError);
            }
            res.send(user);
        });
    },
    getUser: function(req, res) {
        return User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                throw new Error(err);
                res.status(400).send(status.BadReq);
            }
            res.send(user);
        });
    },
    updateUser: function(req, res) {
        return User.findOneAndUpdate(
            { _id: req.params.id }, 
            { username: req.body.username, password: req.body.password },
            { new: true },
            (err, user) => {
                if (err) {
                    throw new Error(err);
                    res.status(400).send(status.BadReq);
                }
                res.send(user);
        });
    }
    
}
