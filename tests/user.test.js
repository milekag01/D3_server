const app = require('../src/app');
const request = require('supertest');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "milek1",
    email: "milek1@gmail.com",
    bio: "blah blah blah",
    role: "Content writer",
    password: "qwerty123",
    authorised: true,
    isAdmin: false,
    links: [],
    tokens: [{
        token: jwt.sign({_id: userOneId}, '13reasonswhy')
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
})
test('Signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "milek2",
        email: "milek2@gmail.com",
        bio: "blah blah blah ",
        role: "Content writer",
        password: "qwerty123",
        authorised: true,
        isAdmin: false,
        links: []
    }).expect(201)

    // assertion that db was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();

    // Assertion about teh response
    expect(response.body).toMatchObject({
        user: {
            name: "milek2",
            email: "milek2@gmail.com"
        },
        token: user.tokens[0].token
    })
})

test('Login a user', async () => {
    const response = await request(app).post('/users/login').send({
        email: 'milek1@gmail.com',
        password: 'qwerty123'
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
});

test('Not login a non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: 'milek3@gmail.com',
        password: 'qwerty123'
    }).expect(400)
});

test('Get profile of signed in user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Not get profile of unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('delete account of signed in user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
});

test('do not delete account of unauthorised user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId);
    // expect({}).toEqual({})   // toEqual() uses == whereas tobe() uses ===
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Update a valid user field for authorised user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            bio: "Latitude e7440"
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.bio).toEqual('Latitude e7440')
})