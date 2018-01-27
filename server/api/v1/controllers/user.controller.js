const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const { User } = require('../models/user.model');
const _ = require('lodash');

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
            res.send(users);
        });
    },
    getUser: function(req, res) {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(404).send()
        }
        return User.findOne({ _id: req.params.id }, (err, user) => {
            if (!user || err) {
                return res.status(404).send();
            }
            res.send(user);
        });
    },
    updateUser: function(req, res) {
        if (!ObjectID.isValid(req.params.id)) {
            res.status(404).send();
        }
        return User.findByIdAndUpdate(
            req.params.id, 
            { $set: {
                username: req.body.username,
                password: req.body.password 
              }
            },
            { new: true },
            (err, user) => {
                if (!user) {
                    return res.status(404).send();
                }
                if (err) {
                    console.error(err);
                    res.status(400).send();
                }
                res.send(user);
        });
    },
    deleteUser: function(req, res) {
        if (!ObjectID.isValid(req.params.id)) {
            res.status(404).send();
        }
        return User.findByIdAndRemove(req.params.id, (err, user) => {
            if (!user) {
               return res.status(404).send();
            } 
            if (err) {
                throw new Error(err);
                res.status(400).send({})
            }
            res.send(user);
        });
    },
    signupUser: function (req, res) {
        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);
        user.save()
            .then((user) => {
                if (!user) {
                    res.status(400).send({})
                }
                const token = user.generateAuthToken();
                res.header('x-auth', token).send(user);
            });
    },
    loginUser: (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);
        User.findByCredentials(body.email, body.password)
            .then((user) => {
                if(!user) {
                    res.status(400).send({});
                }
                const token = user.generateAuthToken();
                res.header('x-auth', token).send(user);
            });
    },
    logoutUser: function(req, res) { 
        if (!req.token) {
            res.status(400).send();
        }
        req.user.removeToken(req.token);
        res.status(200).send();
    }
}
