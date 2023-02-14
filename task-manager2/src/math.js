const fahrenheitToCelcius = (temp) => {
    return (temp - 32) / 1.8;
}
const celciusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
}

module.exports = {
    fahrenheitToCelcius,
    celciusToFahrenheit
}