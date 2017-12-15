const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const status = {
    BadReq: { message: "Bad Request: Could not retrieve users"},
    DeleteError: { message: "ServerError: Could not delete user"},
    CreateError: { message: "ServerError: Could not delete user"},
}
const Auth = require('../auth/authHelpers');

module.exports = {
    getUsers: function(req, res) {
        return User.find({}, (err, users) => {
            if (err) { 
                throw new Error(err);
                res.status(400).send(status.BadReq);
            }
            res.send({users});
        });
    },
    createUser: function(req, res) {
        // let hashed = Auth.hashPassword(req.body.password);
        return User.create(
            { username: req.body.username, password: req.body.password },
            (err, user) => {
                if (err) { 
                    throw new Error(err);
                    res.status(500).send(status.CreateError);
                }
                res.send({user});
            }
        );
    },
    getUser: function(req, res) {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send()
        }
        return User.findOne({ _id: req.params.id }, (err, user) => {
            if (!user || err) {
                return res.status(404).send();
            }
            res.send({user});
        });
    },
    updateUser: function(req, res) {
        return User.findOneAndUpdate(
            { _id: req.params.id }, 
            {$set: { 
                username: req.body.username,
                password: req.body.password 
            }},
            { new: true },
            (err, user) => {
                if (err) {
                    throw new Error(err);
                    res.status(400).send(status.BadReq);
                }
                res.send({user});
        });
    },
    deleteUser: function(req, res) {
        return User.findByIdAndRemove({ _id: req.params.id }, (err, result) => {
            if (err) {
                throw new Error(err);
                res.status(500).send(status.DeleteError);
            }
            res.send("Deleted user with ID: " + result._id);
        });
    }
}
