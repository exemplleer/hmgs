import { Prisma } from '@prisma/client';
import prisma from '../prisma';

const roomModel = prisma.room;
const roomStatusModel = prisma.roomStatus;

export default class RoomRepository {
  static async createRoom(data: Prisma.roomCreateInput) {
    return await roomModel.create({ data });
  }

  static async getRooms() {
    return await roomModel.findMany({ orderBy: { num: 'asc' } });
  }

  static async getRoomById(id: number) {
    return await roomModel.findUnique({ where: { id } });
  }

  static async getRoomByNum(num: number) {
    return await roomModel.findUnique({ where: { num } });
  }

  static async updateRoomByNum(num: number, data: Prisma.roomCreateInput) {
    return await roomModel.upsert({
      where: { num },
      create: data,
      update: data,
    });
  }

  static async removeRoomByNum(num: number) {
    return await roomModel.delete({ where: { num } });
  }

  static async getAllRoomStatuses(roomId: number) {
    return await roomStatusModel.findMany({ where: { roomId } });
  }

  static async getRoomStatus(roomId: number, targetDate: Date) {
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
