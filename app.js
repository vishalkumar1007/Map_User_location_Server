// importing all required modules
const express = require('express');
const { createServer } = require('node:http');
const socketIo = require('socket.io');
const path = require('path');

// create server using express with app variable
const app = express();
const server = createServer(app);

// defining server port
const PORT = process.env.PORT || 4001;

// socket io run on http, so we call it with server
console.log('step 1'); //...........................
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
console.log('step 2'); //...........................

console.log('step 3'); //...........................
io.on('connection', (socket) => {
    console.log('step 4'); //...........................
    console.log('A user connected:', socket.id);
    console.log('step 5'); //...........................
    socket.on('send_user_location', (locationCoordinate) => {
        console.log('step 6'); //...........................
        io.emit('receive_user_location', { id: socket.id, ...locationCoordinate });
        console.log('step 7'); //...........................
    });
    console.log('step 8'); //...........................

    socket.on("disconnect", () => {
        console.log('step 9'); //...........................
        io.emit("user_disconnected", socket.id);
        console.log('step 10'); //...........................
    });
    console.log('step 11'); //...........................
});
console.log('step 12'); //...........................

// setting up ejs
console.log('step 13'); //.................
app.set('view engine', 'ejs');
console.log('step 14'); // ............................
app.set('views', path.join(__dirname, 'views'));
console.log('step 15'); // ............................
app.use(express.static(path.join(__dirname, 'public')));
console.log('step 16'); // ............................

// setup our entry point of our app with '/' location
app.get('/', (req, res) => {
    console.log('step 0.0 '); //..........................
    res.render('index');
    console.log('step 0.1'); //..........................
});

// make listen our server on specific port 
server.listen(PORT, () => {
    console.log(`server running at PORT ${PORT}`);
});
