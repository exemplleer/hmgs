import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RoomRepository {
  async createRoom(fields) {
    return await prisma.room.create({
      data: fields,
    });
  }

  async getAllRooms() {
    return await prisma.room.findMany();
  }

  async getRoomById(id) {
    return await prisma.room.findUnique({
      where: { id },
    });
  }

  async getRoomByNumbr(numbr) {
    return await prisma.room.findUnique({
      where: { numbr },
    });
  }

  async updateRoomByNumbr(numbr, fields) {
    return await prisma.room.update({
      where: { numbr },
      data: fields,
    });
  }

  async removeRoomByNumbr(numbr) {
    return await prisma.room.delete({
      where: { numbr },
    });
  }

  async getAllRoomStatuses(roomId) {
    return await prisma.room_status.findMany({
      where: {
        room_id: roomId,
      },
    });
  }

  async getRoomStatus(roomId, targetDate) {
    const roomStatus = await prisma.room_status.findFirst({
      where: {
        room_id: roomId,
        AND: [
          {
            begin_date: {
              lte: targetDate,
            },
          },
          {
            end_date: {
              gte: targetDate,
            },
          },
        ],
      },
    });
    return roomStatus;
  }

  async setRoomStatus(roomId, startDate, endDate, isAvalible) {
    return await prisma.room_status.create({
      data: {
        room_id: roomId,
        begin_date: startDate,
        end_date: endDate,
        is_avalible: isAvalible,
      },
    });
  }
}

export default new RoomRepository();
