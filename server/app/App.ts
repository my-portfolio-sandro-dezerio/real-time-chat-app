import express, { Express } from 'express';
import cors from 'cors';
import http, { Server } from 'http';

import config from './config/config';
import Socket from './Socket';

export default class App {
    private _app: Express;
    private _port: Number;
    private _server: Server;

    constructor() {
        this._app = express();
        this._port = config.port;
        this._server = http.createServer(this._app);
    }

    run(): void {
        this._app.use(cors());

        const socket = new Socket(this._server);

        socket.run();

        this._server.listen(this._port, () => {
            console.log(`Server running on port: ${this._port}`);
        });
    }
}