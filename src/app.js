const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/userRouter');
const clientRouter = require('./routers/clientRouter');
const projectRouter = require('./routers/projectRouter');
const taskRouter = require('./routers/taskRouter');

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(clientRouter);
app.use(projectRouter);
app.use(taskRouter);

module.exports = app;