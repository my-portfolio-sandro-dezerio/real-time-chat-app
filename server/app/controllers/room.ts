import { Request, Response } from "express";
import RoomService from "../services/room";

export default class RoomController {
    private _room_service: RoomService = new RoomService();

    grid = async (req: Request, res: Response) => {
        try {
            const offset = Number(req.query.offset) || 0;
            const limit = Number(req.query.limit) || 5;

            const rooms = await this._room_service.grid(offset, limit);

            return res.status(200).json(rooms);
        } catch (error) {
            console.log("ERR -> ", error);
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const room = await this._room_service.getById(req.params.id);

            if(!room) {
                return res.sendStatus(204);
            }

            return res.status(200).json(room);
        } catch (error) {
            console.log("ERR -> ", error);
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const room = await this._room_service.create(req.body);

            return res.status(201).json(room);
        } catch (error) {
            console.log("ERR -> ", error);
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            await this._room_service.update(req.body, req.params.id);

            return res.sendStatus(200);
        } catch (error) {
            console.log("ERR -> ", error);
        }
    }

    deleteById = async (req: Request, res: Response) => {
        try {
            if (!await this._room_service.getById(req.params.id)) {
                return res.sendStatus(404);
            }

            await this._room_service.deleteById(req.params.id);

            return res.sendStatus(200);
        } catch (error) {
            console.log("ERR -> ", error);
        }
    }
}