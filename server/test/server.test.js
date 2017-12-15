const { app } = require('../server');
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
// const rewire = require('rewire');
const User = require('../api/v1/models/user.model');

describe('Server', () => {

    // describe('GET /', () => {
    //     it('should return message', (done) => {
    //         request(app)
    //             .get('/')
    //             .expect(200)
    //             .expect((res) => {
    //                 expect(res.body).toInclude({ message: 'Welcome to Fitbox v1.0' });
    //             })
    //             .end(done);
    //     });
    // });


    var users = [{
            _id: new ObjectID(),
            username:'test1',
            password: 'turtle',
            __v: 0
        }, {
            _id: new ObjectID(),
            username:'test2',
            password: 'bacon',
            __v: 0
        }, {
            _id: new ObjectID(),
            username:'test3',
            password: 'woof',
            __v: 0
        }
    ];

    beforeEach((done) => {
        User.remove({}).then(() => {
            return User.insertMany(users);
        }).then(() => done());
    });

    describe('POST /users', () => {

        it('should create a new user', (done) => {
            var user = {
                username:'test4',
                password: 'turtle'
            }

            request(app)
                .post('/users')
                .send(user)
                .expect(200)
                .expect((res) => {
                    expect(res.body.user.username).toBe(user.username);
                    expect(res.body.user.password).toBe(user.password);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    } 
                    User.find({ username: user.username }).then((users) => {
                        expect(users.length).toBe(1);
                        done();
                      }).catch((e) => done(e));
                });
        });
    });

    describe('GET /users', () => {
        it('should return all users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body.users.length).toBe(3);
                })
                .end(done);
        });
    });

    describe('GET /users/:id', () => {
        it('should return a user by id', (done) => {
            request(app)
                .get(`/users/${users[0]._id.toHexString()}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.user).toInclude({
                        _id: users[0]._id.toHexString(),
                        username:'test1',
                        password: 'turtle',
                        __v: 0
                    })
                })
                .end(done);
        });

        it('should return 404 if user not found', (done) => {
            request(app)
                .get(`/users/${new ObjectID().toHexString()}`)
                .expect(404)
                .expect((res) => {
                    expect(res.body.user).toBe();
                })
                .end(done);
        });

        it('should return 404 if id not valid', (done) => {
            request(app)
                .get(`/users/abcd1234`)
                .expect(404)
                .end(done);
        })

    });

    describe('DELETE /user/:id', () => {
        it('should delete a user by id', (done) => {
            request(app)
                .delete(`/users/${users[0]._id.toHexString()}/delete`)
                .expect(200)
                .end(done);
        });
    });
});