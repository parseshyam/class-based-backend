import app from './app'
import IO from 'socket.io';
import logger from './services/logger';
import { config } from 'dotenv';
import { socketInit } from './services/socket.service';
config();

let PORT = process.env.PORT || 7000;
let server = app.listen(PORT, () => logger.info(`Http server is up and running on port -> ${PORT}`));
export const io = IO(server);
socketInit(io, PORT);