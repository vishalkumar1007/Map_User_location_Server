const express = require('express');
const {createServer} = require('node:http');

const app = express();
const server = createServer(app);

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('Jai ram ji ki');
});

server.listen(PORT , ()=>{
    console.log(`server run at PORT ${PORT}`);
})