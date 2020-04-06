require('../src/db/mongoose');
const User = require('../src/models/user')
const Task = require('../src/models/task')

User.findByIdAndUpdate('userid', {/*update*/name: 'milek' }).then((user) => {
    console.log(user);
    return User.countDocuments({name: 'milek'})
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

Task.findByIdAndDelete('taskid').then((task) => {
    console.log(task);
    return Task.countDocuments({status: 'Incomplete'})
}).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})

// asyncawait method for above promise chaining
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age});
    const count = await User.countDocuments({age: age});
    return {user, count};
}

updateAgeAndCount('12345werty', 3).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
});