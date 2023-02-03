const fs = require('fs');
const yargs = require('yargs');

// add note
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    handler: function(param){
        fs.appendFileSync('note.txt', '\n' + param['_'][1]);

        // console.log(fs.readFileSync('note.txt').toString());
        console.log('Your note has been added.');
    }
})
// view all notes
yargs.command({
    command: 'view',
    describe: 'See all notes.',
    handler: function(){
        console.log(fs.readFileSync('note.txt').toString());
    }
})
// delete a note
yargs.command({
    command: 'delete',
    describe: 'Delete a note.',
    builder: {
        row: 'Row number',
        demandOption: true,
    },
    handler: function(param){
        const notes = fs.readFileSync('note.txt').toString().split('\n');
        
        let newNotes = "";
        for(let i = 0; i < notes.length; i++){
            // console.log(param.row)
            if(notes[i] && (i + 1 != param.row)){
                newNotes += '\n' + notes[i];
            }
        }
        // console.log(newNotes);
        fs.writeFileSync('note.txt', newNotes);

        console.log('Row ' + param.row + ' has been deleted.');
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a line',
    handler: function(param){
        const notes = fs.readFileSync('note.txt').toString().split('\n')[param['_'][1]];
        console.log(notes);
    }
})
yargs.parse();