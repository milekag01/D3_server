const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req,res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task)
    
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

router.get('/tasks', async (req,res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send('Unable to find task')
        }
        res.send(task);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

router.patch('/tasks/:id', async (req,res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body)

    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        
        const task = await Task.findById(_id);    
        
        updates.forEach((update) => {
            task[update] = req.body[update]
        });
        await task.save();

        if(!task) {
            res.status(404).send('unable to find the task to update');
        }
        res.send(task);

    } catch(error) {
        res.status(400).send(error);
    }
})

router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id);
        if(!task) {
            return res.status(404).send('No task to delete with given id');
        }
        res.send(task);

    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;