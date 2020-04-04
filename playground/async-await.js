// async functions always returns a promise
const add = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(a<0 || b<0) {
                return reject('Numbers must be non-negative')
            }
            resolve(a+b)
        }, 2000)
    })
}

const dowork = async () => {
    const sum1 = await add(1,99);
    const sum2 = await add(sum1,43);
    const sum3 = await add(sum2,12);

    return sum3;
}

dowork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
});
