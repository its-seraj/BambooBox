// object property shorthand

const name = 'Andrew', age = 29;

const user = {
    name,
    age: age,
    location: 'Bengaluru, Karnataka'
}

console.log(user)

// object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
}

// const label = product.label
// const price = product.price

const {label, price} = product

console.log(label, price);