console.log('step on script : 1.1');
const serverUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:4001'
    : 'https://map-user-location-server.vercel.app';

const socket = io(serverUrl);

console.log('step on script : 1.2');


socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

if (navigator.geolocation) {
    console.log('step on script : 1.3');
    navigator.geolocation.watchPosition((position) => {
        console.log('step on script : 1.4');
        const { latitude, longitude } = position.coords;
        console.log('step on script : 1.5');
        
        try {
            socket.emit('send_user_location', { latitude, longitude });
            console.log('step on script : 1.6');
            console.log(`latitude : ${latitude}  and longitude : ${longitude}`);
        } catch (error) {
            console.error('Error emitting location:', error);
        }

    }, (error) => {
        console.log('step on script : 1.7');
        console.log('error on watch position ', error);
    }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
}
console.log('step on script : 1.8');

const map = L.map('map').setView([0, 0], 10);
console.log('step on script : 1.9');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://vishalkumar07.me">@develop vishal</a>'
}).addTo(map);
console.log('step on script : 1.10');

const User_markers = {};
console.log('step on script : 1.11');
socket.on('receive_user_location', (locationData) => {
    console.log('step on script : 1.12');
    const { id, latitude, longitude } = locationData;
    console.log('step on script : 1.13');
    map.setView([latitude, longitude]);
    console.log('step on script : 1.14');
    if (User_markers[id]) {
        console.log('step on script : 1.15');
        User_markers[id].setLatLng([latitude, longitude]);
        console.log('step on script : 1.16');
    } else {
        console.log('step on script : 1.17');
        User_markers[id] = L.marker([latitude, longitude]).addTo(map);
        console.log('step on script : 1.18');
    }
    console.log('step on script : 1.19');
});
console.log('step on script : 1.20');

socket.on('user_disconnected', (id) => {
    console.log('step on script : 1.21');
    if (User_markers[id]) {
        console.log('step on script : 1.22');
        map.removeLayer(User_markers[id]);
        console.log('step on script : 1.23');
        delete User_markers[id];
        console.log('step on script : 1.24');
    }
    console.log('step on script : 1.25');
});
console.log('step on script : 1.26');
