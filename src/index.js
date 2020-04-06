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

// setting up middlewares

// ---------Maintainance middleware--------------
// app.use((req,res,next) => {
//     res.status(503).send('Site is currently in maintainance mode. Check back soon!!!');
// })

// ---------Blocking all GET requests------------
// app.use((req,res,next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next();
//     }
// })

// ---------------------------Server -------------------------------- //
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server is running on port: ' + port);
})