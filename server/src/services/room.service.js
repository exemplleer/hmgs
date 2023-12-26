import RoomDto from '../dtos/room.dto.js';
import roomRepository from '../repositories/room.repository.js';

class RoomService {
  async createRoom(dto) {
    const entity = dto.toEntity();
    return await roomRepository.createRoom(entity);
  }

  async getAllRooms() {
    return (await roomRepository.getAllRooms()).map(
      (room) => new RoomDto(room),
    );
  }

  async getOneRoomById(id) {
    return await roomRepository.getRoomById(Number(id));
  }

  async getOneRoomByNumber(number) {
    const roomEntity = await roomRepository.getRoomByNum(Number(number));
    const roomStatuses = await roomRepository.getAllRoomStatuses(roomEntity.id);
    const roomDto = new RoomDto(roomEntity);
    return { ...roomDto, statuses: roomStatuses };
  }

  async updateRoomByNumber(number, dto) {
    return await roomRepository.updateRoomByNum(Number(number), dto.toEntity());
  }

  async removeRoomByNumber(number) {
    return await roomRepository.removeRoomByNum(Number(number));
  }

  async setRoomStatus(id, startDate, endDate, isAvailable) {
    const roomStatus = await roomRepository.setRoomStatus(
      Number(id),
      new Date(startDate),
      new Date(endDate),
      isAvailable ?? false,
    );
    return roomStatus;
  }
}

export default new RoomService();
