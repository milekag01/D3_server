const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});




// const me = User({
//     name: 'Rihaan',
//     age: 21
// });

// me.save().then((res) => {
//     console.log(res)
// }).catch((error) => {
//     console.log(error)
// });