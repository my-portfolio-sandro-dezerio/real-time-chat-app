import { Application } from "express";
import RoomController from "../controllers/room";

export default class RoomRoutes {
    private _room_controller: RoomController = new RoomController();

    route = (app: Application) => {
        app.get('/rooms/grid', this._room_controller.grid);

        app.get('/rooms/:id', this._room_controller.getById);

        app.post('/rooms', this._room_controller.create);

        app.put('/rooms/:id', this._room_controller.update);

        app.delete('/rooms/:id', this._room_controller.deleteById);
    }
}