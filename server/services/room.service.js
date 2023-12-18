import RoomDto from '../dtos/room.dto.js';
import roomRepository from '../repositories/room.repository.js';

class RoomService {
  async createRoom(dto) {
    const entity = dto.toEntity();
    return await roomRepository.createRoom(entity);
  }

  async getAllRooms() {
    return (await roomRepository.getAllRooms())
      .map((room) => new RoomDto(room))
      .reverse();
  }

  async getOneRoomById(id) {
    return await roomRepository.getRoomById(Number(id));
  }

  async getOneRoomByNumber(number) {
    const roomEntity = await roomRepository.getRoomByNumbr(Number(number));
    const roomStatuses = await roomRepository.getAllRoomStatuses(roomEntity.id);
    const roomDto = new RoomDto(roomEntity);
    return { ...roomDto, statuses: roomStatuses };
  }

  async updateRoomByNumber(number, dto) {
    return await roomRepository.updateRoomByNumbr(
      Number(number),
      dto.toEntity(),
    );
  }

  async removeRoomByNumber(number) {
    return await roomRepository.removeRoomByNumbr(Number(number));
  }

  async setRoomStatus(id, startDate, endDate, isAvalible) {
    const roomStatus = await roomRepository.setRoomStatus(
      Number(id),
      new Date(startDate),
      new Date(endDate),
      isAvalible ?? false,
    );
    return roomStatus;
  }
}

export default new RoomService();
