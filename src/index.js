const express = require('express');
const app = express();
require('./db/mongoose');
const User = require('./models/user');
const Client = require('./models/client');
const Project = require('./models/project');
const Task = require('./models/task');

// ---------------------------User Routes--------------------------- //
app.post('/users', async (req,res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user)
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

app.get('/users', async (req,res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

app.get('/users/:id', async (req,res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send('Unable to find user')
        }
        res.send(user);
    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

// ---------------------------Client Routes-------------------------- //
app.post('/clients', async (req,res) => {
    const client = new Client(req.body);

    try {
        await client.save();
        res.status(201).send(client)
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

app.get('/clients', async (req,res) => {

    try {
        const clients = await Client.find({});
        res.send(clients);
    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

app.get('/clients/:id', async (req,res) => {
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


// ---------------------------Project Routes------------------------  //
app.post('/projects', async (req,res) => {
    const project = new Project(req.body);

    try {
        await project.save();
        res.status(201).send(response);
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

app.get('/projects', async (req,res) => {

    try {
        const projects = await Project.find({});
        res.send(projects);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

app.get('/projects/:id', async (req,res) => {
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


// ---------------------------Task Routes---------------------------- //
app.post('/tasks', async (req,res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(response)
    
    } catch(error) {
        res.status(400).send(error);    // client error
    }
})

app.get('/tasks', async (req,res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);

    } catch(error) {
        res.status(500).send(error);    // Server error
    }
})

app.get('/tasks/:id', async (req,res) => {
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


// ---------------------------Server -------------------------------- //
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log('server is running on port: ' + port);
})