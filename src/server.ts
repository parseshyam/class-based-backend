import { socketInit } from './services/socket.service';
import app from './app'
import socketIO from 'socket.io';
import { PORT } from './configs/keys';
import logger from './services/logger.service';

let server = app.listen(PORT, () => logger.info(`Http server is up and running on port -> ${PORT}`));
export const io = socketIO(server);
socketInit(io, PORT);
