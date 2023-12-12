import roomRepository from '../repositories/room.repository.js';

class RoomService {
  async createRoom(dto) {
    const newRoom = await roomRepository.createRoom(dto);
    return newRoom;
  }

  async getAllRooms() {
    const rooms = await roomRepository.getAllRooms();
    return rooms;
  }

  async getOneRoom(id) {
    const room = await roomRepository.getRoomById(Number(id));
    return room;
  }

  async updateRoom(id, dto) {
    const updatedRoom = await roomRepository.updateRoom(Number(id), dto);
    return updatedRoom;
  }

  async removeRoom(id) {
    const removeRoom = await roomRepository.removeRoom(Number(id));
    return removeRoom;
  }

  async setRoomStatus(id, startDate, endDate) {}
  
  async getRoomStatus(id, date) {}
}

export default new RoomService();
