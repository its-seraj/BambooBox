const names = ['Andrew', 'Seraj', 'Binod'];
const shortNames = names.filter((name) => {
    return name.length >= 6;
})

console.log(shortNames);

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0,
        }
    
        callback(data);
    }, 2000);
    
}
geocode('Delhi', (data) => {
    console.log(data);
});


// Task to add with callback
const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 2000)
}
add(2, 5, (sum) => console.log(sum));