const app = require('./app');

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