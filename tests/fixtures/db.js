const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Client = require('../../src/models/client');

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

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "milek3",
    email: "milek3@gmail.com",
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

const clientOne = {
    _id: new mongoose.Types.ObjectId(),
    client_name: "bpl1",
    email: "bpl1@gmail.com",
    point_of_contact: "Jitesh Sir",
    owner: userOne._id
}
const clientTwo = {
    _id: new mongoose.Types.ObjectId(),
    client_name: "bpl2",
    email: "bpl2@gmail.com",
    point_of_contact: "Jitesh Sir",
    owner: userOne._id
}
const clientThree = {
    _id: new mongoose.Types.ObjectId(),
    client_name: "bpl3",
    email: "bpl3@gmail.com",
    point_of_contact: "Jitesh Sir",
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Client.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Client(clientOne).save();
    await new Client(clientTwo).save();
    await new Client(clientThree).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}