const chalk = require('chalk');

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    }, {
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    progress(){
        this.tasks.forEach((task) => {
            console.log('Task : "' + task.text + '" is ' + (task.completed ? chalk.green.bold('completed.') : chalk.red.bold('not completed.')));
        })
    },
    pending(){
        return this.tasks.filter((task) => task.completed === false);
    }
}

tasks.progress();
const pending = tasks.pending();
console.log(pending);