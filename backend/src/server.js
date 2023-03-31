const app = require('./app');
const swaggerDocs = require('../swagger');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.set('io', io);

io.on('connection', (socket) => {});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Run server in ${process.env.host}/`);
    swaggerDocs(app, PORT);
});
