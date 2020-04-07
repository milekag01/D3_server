const express = require('express');
const Project = require('../models/project');
const Client = require('../models/client');
const router = new express.Router();
const auth = require('../middleware/auth')

router.post('/clients/:id/projects', auth, async (req, res) => {
    const _id = req.params.id;

    const client = Client.findOne({_id, owner: req.user._id});
    const project = new Project(req.body);

    if(!client) {
        return res.status(404).send('Unable to find client');
    }
    try {
        await project.save();
        client.projects = client.projects.concat(project._id);
        await (await client).save();
    } catch(error) {
        res.status(500).send('Cannot save the project...Some error occured');
    }
})

router.get('/clients/:id/projects', auth, async (req, res) => {

    const _id = req.params.id;  // get client id from url
    try {
        const projects = await Project.find({projects: _id});   // fetch all projects with given client id
        res.send(projects);
    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

// fetch project with given project id
router.get('/clients/projects/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const project = await Project.findById(_id);
        if(!project) {
            return res.status(404).send('Unable to find project')
        }
        res.send(project);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.patch('/clients/projects/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);

    try {
        // const project = await Project.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});

        const project = await Project.findById(_id);

        if(!project) {
            res.status(404).send('unable to find the project to update');
        }

        updates.forEach((update) => {
            project[update] = req.body[update]
        });
        await project.save();
        res.send(project);

    } catch(error) {
        res.status(400).send(error);
    }
})

router.delete('/clients/:cid/projects/:pid', auth, async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid;
    try {
        const project = await Project.findByIdAndDelete({_id: pid});
        const client = Client.findOne({_id: cid, owner: req.user._id});

        if(!project) {
            return res.status(404).send('No project to delete with given id');
        }
        if(!client) {
            return res.status(404).send('cannot find the client');
        }
        client.projects = client.projects.filter((projectID) => {
            return projectID!==pid;
        });
        await client.save();
        res.send(project);

    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;