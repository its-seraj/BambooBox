const doCallback = (callback) => {
    setTimeout(() => {
        // callback('Error occurs.', undefined)
        callback(undefined, [1, 4, 7, 11])
    }, 2000)
}

doCallback((error, result) => {
    if(error) return console.log(error)

    console.log(result)
})