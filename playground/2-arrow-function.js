// const square = function(x){
//     return x * x;
// }

// const square = (x) => {
//     return x * x;
// }

const square = (x) => x * x;

console.log(square(5));

const event = {
    name: 'Birthday Party',
    invitation: ['Andrew', 'seraj', 'divyesh'],
    printGuest(){
        this.invitation.forEach((host) => {
            console.log('Welcome to ' + this.name + ' of ' + host);
        })
    }
}

event.printGuest();