import RoomDto from '../dtos/room.dto.js';
import roomService from '../services/room.service.js';

class RoomController {
  async createRoom(req, res) {
    try {
      const roomDto = new RoomDto(req.body);
      const newRoom = await roomService.createRoom(roomDto);
      res.status(201).json({ result: newRoom });
    } catch (error) {
      res.status(500);
      console.error(error);
    }
  }

  async getRooms(req, res) {
    try {
      const rooms = await roomService.getAllRooms();
      res.status(200).json({ result: rooms });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error);
    }
  }

  async getOneRoom(req, res) {
    try {
      const number = req.params.number;
      const room = await roomService.getOneRoomByNumber(number);
      res.status(200).json({ result: room });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error);
    }
  }

  async updateRoom(req, res) {
    try {
      const number = req.params.number;
      const data = req.body;
      const roomDto = new RoomDto(data);
      const updatedRoom = await roomService.updateRoomByNumber(number, roomDto);
      res.status(200).json({ result: updatedRoom });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error);
    }
  }

  async removeRoom(req, res) {
    try {
      const number = req.params.number;
      const remove = await roomService.removeRoomByNumber(number);
      res.status(200).json({ result: remove });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error);
    }
  }

  async setRoomStatus(req, res) {
    try {
      const id = req.params.id;
      const { startDate, endDate, isAvalible } = req.body;
      const roomStatus = await roomService.setRoomStatus(
        id,
        startDate,
        endDate,
        isAvalible,
      );
      res.status(200).json({ result: roomStatus });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error);
    }
  }
}

export default new RoomController();
