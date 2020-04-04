const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});




// const me = User({
//     name: 'Abhi',
//     age: 21
// });

// me.save().then((res) => {
//     console.log(res)
// }).catch((error) => {
//     console.log(error)
// });