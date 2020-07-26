import app from './app'
import spdy from 'spdy';
import fs from 'fs';
import IO from 'socket.io';
import logger from './services/logger';
import { config } from 'dotenv';
config();

let PORT = process.env.PORT || 7000;

let server = spdy.createServer({
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/server.crt'),
}, app);

export const io = IO(server); // set up socket.io and bind it to our http server.

server.listen(PORT, () => {
    logger.info(`Http2 server is up and running on port -> ${PORT}`);
});

require('./services/socket.service').socketInit(io, PORT);