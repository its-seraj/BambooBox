let data = '';
const doPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        data = 'The BOYS.'
        resolve([12, 34, 09, 76])

        // reject('error occurs.')
    }, 2000)
})

doPromise.then((result) => {
    console.log(result)
    console.log(data)
}).catch((error) => {
    console.log(error)
})