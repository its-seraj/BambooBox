const display = function(){
    console.log('display');
}

const display2 = function(disp){
    console.log('display2');
    disp();
}

display2(display);