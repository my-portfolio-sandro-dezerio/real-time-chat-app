import { Server as ServerHttp } from "http";
import { Server as ServerSocket, Socket as SocketType } from "socket.io";

export default class Socket {
    private _io: ServerSocket;

    constructor(server: ServerHttp) {
        this._io = new ServerSocket(server, {
            cors: {
                origin: "http://localhost:3000",
                credentials: true
            }
        });
    }

    run(): void {
        this._io.on('connection', (socket: SocketType) => {
            console.log(`User connected: ${socket.id}`);

            socket.on('join_room', (data) => {
                socket.join(data);
                console.log(`User with id: ${socket.id} joined room: ${data}`);
            });
        
            socket.on('send_message', (data) => {
                socket.to(data.room).emit('receive_message', data);
            });
        
            socket.on('disconnect', () => {
                console.log(`User disconnected ${socket.id}`);
            });
        });
    }
}