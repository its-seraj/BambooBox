const fs = require('fs');

const book = {
    title: 'How make money',
    author: 'Andrew Tate',
}

// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);
// store in a json file
// fs.writeFileSync('1-json.json', bookJSON);

// fetch
const bufferdata = fs.readFileSync('1-json.json');
console.log(bufferdata.toString());
// parsing
const data = JSON.parse(bufferdata.toString());
console.log(data.title);
// manipulate
data.age = 52;
fs.writeFileSync('1-json.json', JSON.stringify(data));
// read file to check updated or not
const newBufferData = fs.readFileSync('1-json.json');
const newData = newBufferData.toString();
console.log(JSON.parse(newData));

// const parseData = JSON.parse(bookJSON);
// console.log(parseData);