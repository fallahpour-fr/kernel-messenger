const express = require('express');
const app = express();
const routers = require('./app/routes');
const http = require('http');
require('dotenv').config();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routers);

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`app listen to port ${port}`);
})