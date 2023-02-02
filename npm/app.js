const chalk = require('chalk')
const yargs = require('yargs')
const validator = require('validator');

const email = 'seraj/khan@boombox.in';

// console.log(validator.isEmail(email));


// console.log(chalk.hex('#33DDAA').bold('Hello buddy.'))
// console.log(chalk.green.bold('success party.'));

// console.log(process.argv);
// console.log(yargs.argv);

yargs.version('0.0.1');

// create a yargs command
// yargs.command({
//     command: 'add',
//     describe: 'Add a note',
//     handler: function(){
//         console.log('Note has been added.')
//     }
// })

yargs.command({
    command: 'edit',
    describe: 'Edit a note',
    handler: function(){
        console.log('Note has been edited.');
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete a note',
    handler: function(){
        console.log('Note has been deleted.')
    }
})

console.log(yargs.argv);

// yargs command with builder property
yargs.command({
    command: 'add',
    describe: 'Add a Title',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, // by default false
            type: 'string' // check ip data type
        }
    },
    handler: function(T){
        console.log('Title is : ' + T.title);
    }
})

// body inside the the builder property
yargs.command({
    command: 'add',
    describe: 'This is a description',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(T){
        console.log('Title is : ' + T.title);
        console.log('Body is : ' + T.body);
    }
})
yargs.parse();