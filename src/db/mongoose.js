const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
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