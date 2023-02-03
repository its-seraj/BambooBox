const fs = require('fs');

// fs.writeFileSync("temp.txt", "Created by Nodejs. 2");

// fs.appendFileSync('temp1.txt', 'file appended.');


const name = 'seraj', lastname = 'khan';

console.log('app.js');
// module.exports = {
//     name: name,
//     lastname: lastname
// }

module.exports.add = (a, b) => a + b;


module.exports.name = name;
module.exports.lastname = lastname;
