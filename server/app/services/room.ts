import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class RoomService {
    grid = async (offset: Number, limit: Number) => {
        await prisma.$connect();

        const rooms = await prisma.rooms.findMany();

        return rooms;
    }

    getById = async (id: any) => {
        await prisma.$connect();

        const room = await prisma.rooms.findUnique({
            where: {
                id
            }
        });

        return room;articulo
    }

    create = async (payload: any) => {
        await prisma.$connect();

        const room = await prisma.rooms.create({
            data: payload
        });

        return room;
    }

    update = async (payload: any, id: any) => {
        await prisma.$connect;

        await prisma.rooms.update({
            where: {
                id
            },
            data: payload
        });
    }

    deleteById = async (id: any) => {
        await prisma.$connect;

        await prisma.rooms.delete({
            where: {
                id
            }
        });
    }
}