const app = require('../server/server').app;
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
// const rewire = require('rewire');

describe('Server', () => {
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
        Todo.remove({}).then(() => {
            return User.insertMany(users);
        }).then(() => done());
    });

    describe('GET /', () => {
        it('should return message', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({ message: 'Welcome to Fitbox v1.0' });
                })
                .end(done);
        });
    });

    // describe('GET /users', () => {
    //     it('should return all users', (done) => {
    //         request(app)
    //             .get('/users')
    //             .expect(200)
    //             .expect((res) => {
    //                 // expect(res.body).toInclude({
    //                 //     _id: users[0]._id.toHexString(),
    //                 //     username:'test1',
    //                 //     password: 'turtle',
    //                 //     __v: 0
    //                 // });
    //                 expect(res.body).toInclude({
    //                     _id: '5a2ebfdf5ffe5a1ff871973a',
    //                     username:'turtle',
    //                     password: 'turtlehead',
    //                     __v: 0
    //                 })
    //             })
    //             .end(done);
    //     });
    // });

    // describe('POST /users', () => {
    //     let user = {
    //         // _id: users[0]._id.toHexString(),
    //         username:'test4',
    //         password: 'turtle',
    //         // __v: 0
    //     }

    //     it('should create a new user', (done) => {
    //         request(app)
    //             .post('/users')
    //             .expect(200)
    //             .send(user)
    //             .expect((res) => {
    //                 expect(res.body.username).toBe(user.username);
    //             })
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 User.findOne(user._id).then((users) => {
    //                     // expect(users.length).toBe(1);
    //                     expect(users[0].username).toBe('test');
    //                     done();
    //                   }).catch((e) => done(e));
    //             });
    //     });
    // });

    // describe('GET /users/:id', () => {
    //     it('should return a user by id', (done) => {
    //         request(app)
    //             .get(`/users/${users[0]._id.toHexString()}`)
    //             .expect(200)
    //             .expect(res => {
    //                 expect(res.body).toInclude({
    //                     _id: users[0]._id.toHexString(),
    //                     username:'test1',
    //                     password: 'turtle',
    //                     __v: 0
    //                 })
    //             })
    //             .end(done);
    //     });
    // });

    // describe('DELETE /user/:id', () => {
    //     it('should delete a user by id', (done) => {
    //         request(app)
    //             .delete(`/users/${users[0]._id.toHexString()}`)
    //             .expect(200)
    //             .end(done);
    //     });
    // });
});