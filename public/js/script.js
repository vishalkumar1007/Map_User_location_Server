const socket = io();
console.log('hello from script');

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude , longitude} = position.coords;
        // const rand = Math.random();
        // const randLat = latitude+rand;
        // const randLon = longitude+rand;
        socket.emit('send_user_location',{latitude,longitude});
        console.log(`latitude : ${latitude}  and longitude : ${longitude} `);
    },
    (error)=>{
        console.log('error on watch position ',error);
    },
    {
        enableHighAccuracy:true,
        timeout:10000,
        maximumAge:0
    }
)
}

const map = L.map('map').setView([0,0],10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution : '<a href="https://vishalkumar07.me">@develop vishal</a>'
}).addTo(map);

const User_markers = {} ;
socket.on('receive_user_location' , (locationData)=>{
    const {id,latitude,longitude} = locationData;
    map.setView([latitude,longitude]);
    if(User_markers[id]){
        User_markers[id].setLatLng([latitude,longitude]);
    }else{
        User_markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
})

socket.on('user_disconnected', (id)=>{
    if(User_markers[id]){
        map.removeLayer(User_markers[id]);
        delete User_markers[id];
    }
})