const task = (callback) => {
    setTimeout(() => {
        callback('error occured',undefined);
        // callback(undefined,'success');
    },2000);
}

task((error,res) => {
    if(error) {
        return console.log(error)
    }
    console.log(res);
});