console.log('start');

// settimeout is a async function   
setTimeout(() => {
    console.log('after 2 sec');
}, 2000);

setTimeout(() => {
    console.log('after 0 sec');
}, 0);


console.log('end');