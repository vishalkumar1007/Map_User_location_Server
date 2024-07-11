// importing all required modules
const express = require('express');
const { createServer } = require('node:http');
const socketIo = require('socket.io');
const path = require('path');

// create server using express with app variable
const app = express();
const server = createServer(app);

// defining server port 
const PORT = 4001;

// socket io run on http , so we call it with server
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('send_user_location', (locationCoordinate)=>{
        io.emit('receive_user_location', {id:socket.id , ...locationCoordinate});
    })

    socket.on("disconnect",()=>{
        io.emit("user_disconnected",socket.id);
    })
});

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// setup our entry point of our app with '/' location
app.get('/', (req, res) => {
    res.render('index');  // Render 'index' view
});

// make listen our server on specific port 
server.listen(PORT, () => {
    console.log(`server running at PORT ${PORT}`);
});
