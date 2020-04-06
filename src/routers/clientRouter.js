const express = require('express');
const Client = require('../models/client');
const router = new express.Router();

// middlewares
const auth = require('../middleware/auth');

router.post('/clients', auth, async (req, res) => {
    // const client = new Client(req.body);

    const client = new Client({
        ...req.body,
        owner: req.user._id
    })

    try {
        await client.save();
        res.status(201).send(client)
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

//fuzzy search
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.get('/clients',auth,async (req,res) => {
    const match = {};
    const sort = {};

    
        // sorting of clients based on a given property in asc or desc order
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('=');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    
        // filtering the clients based on search queries when there is no pagination type query
        // Also, converted to regex for fuzzy search
    } else if(req.query.limit==undefined && req.query.skip==undefined) {
        const queries = Object.keys(req.query);
        queries.forEach((query) => {
            match[query] = new RegExp(escapeRegex(req.query[query]), 'gi');
        });
    }
    console.log(req.query);
    try {
        // const clients = await Client.find({owner: req.user._id});
        await req.user.populate({
            path: 'clients',
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        }).execPopulate();
        res.send(req.user.clients);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.get('/clients/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        // const client = await Client.findById(_id);
        const client = await Client.findOne({_id, owner: req.user._id});

        if(!client) {
            return res.status(404).send('Unable to find client')
        }
        res.send(client);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.patch('/clients/:id', auth, async (req, res) => {
    // const _id = req.params.id;
    const updates = Object.keys(req.body);

    try {
        // const client = await Client.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});

        // const client = await Client.findById(_id);
        const client = await Client.findOne({_id: req.params.id, owner: req.user._id});

        if(!client) {
            res.status(404).send('unable to find the client to update');
        }

        updates.forEach((update) => {
            client[update] = req.body[update]
        });
        await client.save();


        res.send(client);

    } catch(error) {
        res.status(400).send(error);
    }
})

router.delete('/clients/:id', auth, async (req, res) => {
    // const _id = req.params.id;
    try {
        // const client = await Client.findByIdAndDelete(_id);
        const client = await Client.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!client) {
            return res.status(404).send('No client to delete with given id');
        }
        res.send(client);

    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;