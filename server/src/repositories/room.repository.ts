import { Prisma } from '@prisma/client';
import prisma from '../prisma';

const roomModel = prisma.room;
const roomStatusModel = prisma.roomStatus;

class RoomRepository {
  async createRoom(data: Prisma.roomCreateInput) {
    return await roomModel.create({ data });
  }

  async getRooms() {
    return await roomModel.findMany({ orderBy: { num: 'asc' } });
  }

  async getRoomById(id: number) {
    return await roomModel.findUnique({ where: { id } });
  }

  async getRoomByNum(num: number) {
    return await roomModel.findUnique({ where: { num } });
  }

  async updateRoomByNum(num: number, data: Prisma.roomCreateInput) {
    return await roomModel.upsert({
      where: { num },
      create: data,
      update: data,
    });
  }

  async removeRoomByNum(num: number) {
    return await roomModel.delete({ where: { num } });
  }

  async getAllRoomStatuses(roomId: number) {
    return await roomStatusModel.findMany({ where: { roomId } });
  }

  async getRoomStatus(roomId: number, targetDate: Date) {
    return roomStatusModel.findFirst({
      where: {
        roomId,
        AND: [
          {
            startDate: {
              lte: targetDate,
            },
          },
          {
            endDate: {
              gte: targetDate,
            },
          },
        ],
      },
    });
  }

  // async setRoomStatus(roomId, { startDate, endDate, isAvailable }) {
  //   return await roomStatusModel.create({
  //     data: {
  //       room_id: roomId,
  //       begin_date: startDate,
  //       end_date: endDate,
  //       is_available: isAvailable,
  //     },
  //   });
  // }
}

export default new RoomRepository();
