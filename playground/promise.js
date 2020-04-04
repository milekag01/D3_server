const task = new Promise((resolve,reject)=> {
    setTimeout(() => {
        resolve('success');
        // reject('error occured');
    },2000)
})

task.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
});