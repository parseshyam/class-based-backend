import * as socketIO from 'socket.io';
import logger from './logger'
let activeUsers: socketIO.Socket[] = [];
export const socketInit = (io: socketIO.Server, port: any) => {
    logger.info(`Socket service is up and running on port -> ${port}`)
    io.on("connection", async (socket: socketIO.Socket) => {
        // push into array.
        activeUsers.push(socket)

        io.on("disconnect", () => {
            // socket is disconnected 
            let i = activeUsers.indexOf(socket);
            activeUsers.splice(i, 1);
        });

        socket.on('joinRooms', (roomsArray: string[]) => {
            socket.join(roomsArray, () => {
                console.log(`Successfully joined to rooms: ${roomsArray}`);
            });
        });
        socket.on('leaveRoom', (room: string) => {
            // do stuff  
        })
    });
}