import RoomRepository from '../repositories/room.repository';
import RoomDto from '../dtos/room.dto';
import { BadRequest } from '../errors/api.error';
import { room as RoomEntity } from '@prisma/client';

export default class RoomService {
  static async createRoom(roomData: any) {
    const roomDto = new RoomDto(roomData);
    const roomExists = await RoomRepository.getRoomByNum(roomDto.num);

    if (roomExists) {
      throw new BadRequest('Комната с таким номером уже существует');
    }

    return await RoomRepository.createRoom(roomDto);
  }

  static async getRooms() {
    const rooms = await RoomRepository.getRooms();
    return rooms.map((room) => new RoomDto(room));
  }

  static async getOneRoomById(id: number) {
    return await RoomRepository.getRoomById(id);
  }

  static async getOneRoomByNum(num: number) {
    const room: RoomEntity | null = await RoomRepository.getRoomByNum(num);

    if (!room) {
      throw new BadRequest('Комната с таким номером не существует');
    }

    const roomStatuses = await RoomRepository.getAllRoomStatuses(room.id);
    const roomDto = new RoomDto(room);
    return { ...roomDto, statuses: roomStatuses };
  }

  static async updateRoomByNum(num: number, roomData: any) {
    const roomDto = new RoomDto(roomData);
    return await RoomRepository.updateRoomByNum(num, roomDto);
  }

  static async removeRoomByNum(num: number) {
    return await RoomRepository.removeRoomByNum(num);
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
