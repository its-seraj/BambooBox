const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log(`Count updated and values = ${count}`)
// })

// const increment = document.querySelector("#increment")
// increment.addEventListener('click', () => {
//     socket.emit("increment")
// })

// socket.on('message', (message) => {
//     console.log(message);
// })


const input_message = document.querySelector('#input_message')
const form = document.querySelector('#form')
const chatbody = document.querySelector('#chatbody')
const button = document.querySelector('button[type=submit]')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // disabled send button
    button.setAttribute('disabled', 'disabled')

    const message = input_message.value
    // console.log(message)
    
    socket.emit("send-message", message, (error) => {
        button.removeAttribute('disabled') // enable button
        input_message.value = '';
        input_message.focus()

        if(error) return console.log(error)

        console.log('Delivered')
    })

})

socket.on('recieve-message', (message) => {
    chatbody.insertAdjacentHTML('afterEnd', `<div class="message">${message}</div>`)
})

socket.on('new-user', (message) => {
    const myAlert = document.getElementById('myAlert');
    myAlert.textContent = message;

    myAlert.style.backgroundColor = '#26cd5e';
    myAlert.style.display = 'block';
    myAlert.style.animation = 'fadeIn 1s forwards';


    setTimeout(function() {
        myAlert.style.animation = 'fadeOut 1s forwards';
    }, 3000);
})

socket.on('disconnects', (message) => {
    const myAlert = document.getElementById('myAlert');
    myAlert.textContent = message;

    myAlert.style.backgroundColor = '#ff6666';
    myAlert.style.display = 'block';
    myAlert.style.animation = 'fadeIn 1s forwards';


    setTimeout(function() {
        myAlert.style.animation = 'fadeOut 1s forwards';
    }, 3000);
})

const location_button = document.querySelector('#location')
location_button.addEventListener('click', (e) => {
    e.preventDefault();
    location_button.setAttribute('disabled', 'disabled') // disabled button
    
    if(!navigator.geolocation) return alert('Geolocation not supprted by your browser.')

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude, long = position.coords.longitude;
        // console.log(lat, long)
        socket.emit('location-share', {latitude: lat, longitude: long}, () => {            
            location_button.removeAttribute('disabled') // enable location button
            console.log('Location Delivered')
        })
    })
})
socket.on('location', (message) => {
    return chatbody.insertAdjacentHTML('afterEnd', `<div class="message">Latitude: ${message.latitude}, Longitude: ${message.longitude}</div>`)
})