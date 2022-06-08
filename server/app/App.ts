import express, { Express } from 'express';
import cors from 'cors';
import http, { Server } from 'http';

import config from './config/config';
import Socket from './Socket';
import RoomRoutes from './routes/room';
import bodyParser from 'body-parser';

export default class App {
    private _app: Express;
    private _port: Number;
    private _server: Server;

    private _room_router: RoomRoutes;

    constructor() {
        this._app = express();
        this._port = config.port;
        this._server = http.createServer(this._app);

        this._room_router = new RoomRoutes();
    }

    run(): void {
        this._app.use(cors());
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));

        this._room_router.route(this._app);

        const socket = new Socket(this._server);

        socket.run();

        this._server.listen(this._port, () => {
            console.log(`Server running on port: ${this._port}`);
        });
    }
}