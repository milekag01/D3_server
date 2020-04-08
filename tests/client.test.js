const app = require('../src/app');
const request = require('supertest');
const Client = require('../src/models/client');
const {userOne, userOneId, setupDatabase} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Create a client', async () => {
    const response = await request(app)
        .post('/clients')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            client_name: "bpl6",
            email: "bpl6@gmail.com",
            point_of_contact: "Jitesh Sir"
        })
        .expect(201)

    // assertion that db was changed correctly
    const client = await Client.findById(response.body._id)
    expect(client).not.toBeNull();
})

test('Fetch user clients', async () => {
    const response = await request(app)
        .get('/clients')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.myClients.length + response.body.invitedClients.length).toEqual(2);
})