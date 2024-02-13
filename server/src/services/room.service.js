import RoomDto from '../dtos/room.dto.js';
import roomRepository from '../repositories/room.repository.js';
import { BadRequest } from '../errors/api.error.js';

class RoomService {
  async createRoom(roomData) {
    const roomDto = new RoomDto(roomData);
    const roomExists = await roomRepository.getRoomByNum(roomDto.num);

    if (roomExists) {
      throw new BadRequest('Комната с таким номером уже существует');
    }

    console.log(roomDto);

    return await roomRepository.createRoom(roomDto);
  }

  async getRooms() {
    const rooms = await roomRepository.getRooms();
    return rooms.map((room) => new RoomDto(room));
  }

  async getOneRoomById(id) {
    return await roomRepository.getRoomById(Number(id));
  }

  async getOneRoomByNum(num) {
    const roomEntity = await roomRepository.getRoomByNum(Number(num));
    const roomStatuses = await roomRepository.getAllRoomStatuses(roomEntity.id);
    const roomDto = new RoomDto(roomEntity);
    return { ...roomDto, statuses: roomStatuses };
  }

  async updateRoomByNum(num, roomData) {
    const roomDto = new RoomDto(roomData);
    return await roomRepository.updateRoomByNum(Number(num), roomDto);
  }

  async removeRoomByNum(num) {
    return await roomRepository.removeRoomByNum(Number(num));
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
