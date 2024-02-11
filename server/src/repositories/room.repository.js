import prisma from '../prisma.js';

const roomModel = prisma.room;
const roomStatusModel = prisma.room_status;

class RoomRepository {
  async createRoom(data) {
    return await roomModel.create({ data });
  }

  async getRooms() {
    return await roomModel.findMany({
      orderBy: {
        num: 'asc',
      },
    });
  }

  async getRoomById(id) {
    return await roomModel.findUnique({
      where: { id },
    });
  }

  async getRoomByNum(num) {
    return await roomModel.findUnique({
      where: { num },
    });
  }

  async updateRoomByNum(num, data) {
    return await roomModel.upsert({
      where: { num },
      update: data,
      create: data,
    });
  }

  async removeRoomByNum(num) {
    return await roomModel.delete({
      where: { num },
    });
  }

  async getAllRoomStatuses(roomId) {
    return await roomStatusModel.findMany({
      where: {
        room_id: roomId,
      },
    });
  }

  async getRoomStatus(roomId, targetDate) {
    return roomStatusModel.findFirst({
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
  }

  async setRoomStatus(roomId, { startDate, endDate, isAvailable }) {
    return await roomStatusModel.create({
      data: {
        room_id: roomId,
        begin_date: startDate,
        end_date: endDate,
        is_available: isAvailable,
      },
    });
  }
}

export default new RoomRepository();
