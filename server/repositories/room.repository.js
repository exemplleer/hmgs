import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

prisma.$on('query', (e) => {
  console.log('Duration query: ' + e.duration + 'ms');
});

class RoomRepository {
  async createRoom(fields) {
    return await prisma.room.create({
      data: fields,
    });
  }

  async getAllRooms() {
    const rooms = await prisma.room.findMany({
      orderBy: {
        num: 'asc',
      },
    });
    return rooms;
  }

  async getRoomById(id) {
    return await prisma.room.findUnique({
      where: { id },
    });
  }

  async getRoomByNum(num) {
    return await prisma.room.findUnique({
      where: { num },
    });
  }

  async updateRoomByNum(num, fields) {
    return await prisma.room.upsert({
      where: { num },
      update: fields,
      create: fields,
    });
  }

  async removeRoomByNum(num) {
    return await prisma.room.delete({
      where: { num },
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

  async setRoomStatus(roomId, startDate, endDate, isAvailable) {
    return await prisma.room_status.create({
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
