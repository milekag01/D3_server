const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017' 
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.id)
// console.log(id.toHexString())

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database');
    }
    console.log('connection successful')

    const db = client.db(databaseName)


    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.result)
    // }).catch((error) => {
    //     console.log(error)
    // });

    

    // db.collection('users').findOne({name: 'milek'},(error,user) => {
    //     console.log(user);
    // });

    // db.collection('users').findOne({_id: new ObjectID('5e868f15da7906639d66be12')},(error,user) => {
    //     console.log(user);
    // });

    // db.collection('users').find({}).toArray((error,users) => {
    //     console.log(users);
    // });

    

    // this is async so we can pass a callback-------------------------
    // db.collection('users').insertOne({
    //     name: 'hastin',
    //     age: 21
    // }, (error, result) => {
    //     if(error) {
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Rohan',
    //         age: 21
    //     }, {
    //         name: 'smit',
    //         age: 21
    //     }
    // ], (error,result) => {
    //     if(error) {
    //         return console.log('unable to insert document')
    //     }
    //     console.log(result.ops)
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'this is a dell laptop',
    //         completed: true
    //     }, {
    //         description: 'have to complete SEN project',
    //         completed: false
    //     }, {
    //         description: 'ML project',
    //         completed: 'false'
    //     }
    // ],(error,result) => {
    //     if(error) {
    //         return console.log('unable to insert tasks')
    //     }
    //     console.log(result.ops)
    // })

    // console.log('insertion complete');
});