import app from './app'
import spdy from 'spdy';
import fs from 'fs'
import IO from 'socket.io'
import { config } from 'dotenv';
config();

let PORT = process.env.PORT || 7000;

let server = spdy.createServer({
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/server.crt'),
}, app);

export const io = IO(server); // set up socket.io and bind it to our http server.

server.listen(PORT, () => {
    console.log(`SERVER IS UP ON PORT ${PORT}`)
});

require('./services/socket.service').socketInit(io);