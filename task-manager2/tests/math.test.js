const {celciusToFahrenheit, fahrenheitToCelcius} = require('../src/math')

test('Hello world', () => {

})

test('Falied test case', () => {
    // throw new Error('Test must failed')
})

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelcius(32)
    expect(temp).toBe(0)
})
test('Should convert 0 C to 32 F', () => {
    const temp = celciusToFahrenheit(0)
    expect(temp).toBe(32)
})

afterEach(() => {
   console.log('after Each') 
})