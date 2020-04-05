const express = require('express');
const Client = require('../models/client');
const router = new express.Router();

router.post('/clients', async (req,res) => {
    const client = new Client(req.body);

    try {
        await client.save();
        res.status(201).send(client)
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

router.get('/clients', async (req,res) => {

    try {
        const clients = await Client.find({});
        res.send(clients);
    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.get('/clients/:id', async (req,res) => {
    const _id = req.params.id;

    try {
        const client = await Client.findById(_id);
        if(!client) {
            return res.status(404).send('Unable to find client')
        }
        res.send(client);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.patch('/clients/:id', async (req,res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);

    try {
        // const client = await Client.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        
        const client = await Client.findById(_id);    
        
        updates.forEach((update) => {
            client[update] = req.body[update]
        });
        await client.save();
        
        if(!client) {
            res.status(404).send('unable to find the client to update');
        }
        res.send(client);

    } catch(error) {
        res.status(400).send(error);
    }
})

router.delete('/clients/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const client = await Client.findByIdAndDelete(_id);
        if(!client) {
            return res.status(404).send('No client to delete with given id');
        }
        res.send(client);

    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;