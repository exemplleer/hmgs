import roomRepository from '../repositories/room.repository';
import RoomDto from '../dtos/room.dto';
import { BadRequest } from '../errors/api.error';
import { room as RoomEntity } from '@prisma/client';

class RoomService {
  async createRoom(roomData: any) {
    const roomDto = new RoomDto(roomData);
    const roomExists = await roomRepository.getRoomByNum(roomDto.num);

    if (roomExists) {
      throw new BadRequest('Комната с таким номером уже существует');
    }

    return await roomRepository.createRoom(roomDto);
  }

  async getRooms() {
    const rooms = await roomRepository.getRooms();
    return rooms.map((room) => new RoomDto(room));
  }

  async getOneRoomById(id: number) {
    return await roomRepository.getRoomById(id);
  }

  async getOneRoomByNum(num: number) {
    const room: RoomEntity | null = await roomRepository.getRoomByNum(num);

    if (!room) {
      throw new BadRequest('Комната с таким номером не существует');
    }

    const roomStatuses = await roomRepository.getAllRoomStatuses(room.id);
    const roomDto = new RoomDto(room);
    return { ...roomDto, statuses: roomStatuses };
  }

  async updateRoomByNum(num: number, roomData: any) {
    const roomDto = new RoomDto(roomData);
    return await roomRepository.updateRoomByNum(num, roomDto);
  }

  async removeRoomByNum(num: number) {
    return await roomRepository.removeRoomByNum(num);
  }

  // async setRoomStatus(id, { startDate, endDate, isAvailable }) {
  //   const roomStatus = await roomRepository.setRoomStatus(
  //     Number(id),
  //     new Date(startDate),
  //     new Date(endDate),
  //     isAvailable ?? false,
  //   );
  //   return roomStatus;
  // }
}

export default new RoomService();
