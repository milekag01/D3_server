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

app.patch('/users/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if(!user) {
            res.status(404).send('unable to find the user to update');
        }
        res.send(user);

    } catch(error) {
        res.status(400).send(error);
    }
})

app.delete('/users/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if(!user) {
            return res.status(404).send('No user to delete with given id');
        }
        res.send(user);

    } catch(error) {
        res.status(500).send(error);
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

app.patch('/clients/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const client = await Client.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if(!client) {
            res.status(404).send('unable to find the client to update');
        }
        res.send(client);

    } catch(error) {
        res.status(400).send(error);
    }
})

app.delete('/clients/:id', async (req,res) => {
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

app.patch('/projects/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const project = await Project.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if(!project) {
            res.status(404).send('unable to find the project to update');
        }
        res.send(project);

    } catch(error) {
        res.status(400).send(error);
    }
})

app.delete('/projects/:id', async (req,res) => {
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

app.patch('/tasks/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if(!task) {
            res.status(404).send('unable to find the task to update');
        }
        res.send(task);

    } catch(error) {
        res.status(400).send(error);
    }
})

app.delete('/tasks/:id', async (req,res) => {
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

// ---------------------------Server -------------------------------- //
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log('server is running on port: ' + port);
})