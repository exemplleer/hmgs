import prisma from '../prisma';
import { Prisma } from '@prisma/client';
import { IRoomsGetOptions } from '../types/room.types';

const roomModel = prisma.room;
const roomStatusModel = prisma.roomStatus;

export default class RoomRepository {
  static async createRoom(data: Prisma.roomCreateInput) {
    return await roomModel.create({ data });
  }

  static async getRooms(options: IRoomsGetOptions) {
    const pagination = options.pagination;
    const sort = options.sort;
    const filter = options.filter;

    return await roomModel.findMany({
      take: pagination.limit,
      skip: pagination.offset,
      orderBy: { [sort.by]: sort.order },
      where: {
        AND: [
          {
            title: { contains: filter.title },
          },
          {
            num: { equals: filter.num },
          },
        ],
      },
    });
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
