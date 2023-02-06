const greeter = (name = 'User', age) => {
    console.log('Hello ', name)
}

greeter('Andrew')
greeter()

const product = {
    label: 'Games',
    stock: 201,
    sell: 230,
}

const trans = (type, {label = 'Null', stock = 0} = {}) => { //  default value for destructuring
    console.log(type, label, stock)
}
trans('order')