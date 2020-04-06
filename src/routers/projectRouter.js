const express = require('express');
const Project = require('../models/project');
const router = new express.Router();

router.post('/projects', async (req, res) => {
    const project = new Project(req.body);

    try {
        await project.save();
        res.status(201).send(response);
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

router.get('/projects', async (req, res) => {

    try {
        const projects = await Project.find({});
        res.send(projects);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.get('/projects/:id', async (req, res) => {
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

router.patch('/projects/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);

    try {
        // const project = await Project.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});

        const project = await Project.findById(_id);

        updates.forEach((update) => {
            project[update] = req.body[update]
        });
        await project.save();

        if(!project) {
            res.status(404).send('unable to find the project to update');
        }
        res.send(project);

    } catch(error) {
        res.status(400).send(error);
    }
})

router.delete('/projects/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const project = await Project.findByIdAndDelete(_id);
        if(!project) {
            return res.status(404).send('No project to delete with given id');
        }
        res.send(project);

    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;