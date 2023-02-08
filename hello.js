console.log("Hello! welcome to Node.js course.");

const arr = [5, 3, 2, 1, 10]

const arr2 = arr.map((val) => val * 2)

const filter_arr = arr.filter((val) => (val & 1) === 0)

const sum = arr.reduce((acc, cur) => {
    acc += cur;
    return acc;
}, 0)

const product = arr.reduce((acc, cur) => {
    acc *= cur;
    return acc;
}, 1)

console.log(arr2)
console.log(filter_arr)
console.log(sum)
console.log(product)