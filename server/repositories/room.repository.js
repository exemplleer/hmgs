import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RoomRepository {
  async createRoom(fields) {
    const room = await prisma.room.create({ data: fields });
    return room;
  }

  async getAllRooms() {
    const rooms = await prisma.room.findMany();
    return rooms;
  }

  async getRoomById(id) {
    const room = await prisma.room.findUnique({
      where: { id },
    });
    return room;
  }

  async updateRoom(id, fields) {
    const updateRoom = await prisma.room.update({
      where: { id },
      data: fields,
    });
    return updateRoom;
  }

  async removeRoom(id) {
    const removeRoom = await prisma.room.delete({
      where: { id },
    });
    return removeRoom;
  }

  async setRoomStatus(id, startDate, endDate) {}

  async getRoomStatus(id, date) {}
}

export default new RoomRepository();
