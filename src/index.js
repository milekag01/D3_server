const express = require('express');
const app = express();
require('./db/mongoose');
const User = require('./models/user');
const Client = require('./models/client');
const Project = require('./models/project');
const Task = require('./models/task');

// ---------------------------User Routes--------------------------- //
app.post('/users', (req,res) => {
    const user = new User(req.body);

    user.save().then((response) => {
        res.status(201).send(response)
    }).catch((error => {
        res.status(400).send(error);    // client error
    }))
})

app.get('/users', (req,res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})

app.get('/users/:id', (req,res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send('Unable to find user')
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})

// ---------------------------Client Routes-------------------------- //
app.post('/clients', (req,res) => {
    const client = new Client(req.body);

    client.save().then((response) => {
        res.status(201).send(response)
    }).catch((error => {
        res.status(400).send(error);    // client error
    }))
})

app.get('/clients', (req,res) => {
    Client.find({}).then((clients) => {
        res.send(clients);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})

app.get('/clients/:id', (req,res) => {
    const _id = req.params.id;

    Client.findById(_id).then((client) => {
        if(!client) {
            return res.status(404).send('Unable to find client')
        }
        res.send(client);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})


// ---------------------------Project Routes------------------------  //
app.post('/projects', (req,res) => {
    const project = new Project(req.body);

    project.save().then((response) => {
        res.status(201).send(response)
    }).catch((error => {
        res.status(400).send(error);    // client error
    }))
})

app.get('/projects', (req,res) => {
    Project.find({}).then((projects) => {
        res.send(projects);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})

app.get('/projects/:id', (req,res) => {
    const _id = req.params.id;

    Project.findById(_id).then((project) => {
        if(!project) {
            return res.status(404).send('Unable to find project')
        }
        res.send(project);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})


// ---------------------------Task Routes---------------------------- //
app.post('/tasks', (req,res) => {
    const task = new Task(req.body);

    task.save().then((response) => {
        res.status(201).send(response)
    }).catch((error => {
        res.status(400).send(error);    // client error
    }))
})

app.get('/tasks', (req,res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})

app.get('/tasks/:id', (req,res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send('Unable to find task')
        }
        res.send(task);
    }).catch((error) => {
        res.status(500).send(error);    // Server error
    })
})


// ---------------------------Server -------------------------------- //
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log('server is running on port: ' + port);
})