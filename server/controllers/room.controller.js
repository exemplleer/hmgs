import RoomDto from '../dtos/room.dto.js';
import roomService from '../services/room.service.js';

class RoomController {
  async createRoom(req, res) {
    try {
      const roomDto = new RoomDto(req.body);
      const newRoom = await roomService.createRoom(roomDto);
      res.status(200).json({ success: true, result: newRoom });
    } catch (error) {
      conosle.error(error);
      res.status(500).json({ success: false });
    }
  }

  async getRooms(req, res) {
    try {
      const rooms = await roomService.getAllRooms();
      res.status(200).json({ success: true, result: rooms });
    } catch (error) {
      conosle.error(error);
      res.status(500).json({ success: false });
    }
  }

  async getOneRoom(req, res) {
    try {
      const id = req.params.id;
      const room = await roomService.getOneRoom(id);
      const roomStatus = await roomService.getRoomStatus(
        id,
        '2023-12-12 07:41:36',
      );
      res.status(200).json({ success: true, result: room, roomStatus });
    } catch (error) {
      conosle.error(error);
      res.status(500).json({ success: false });
    }
  }

  async updateRoom(req, res) {
    try {
      const { id, ...data } = req.body;
      const roomDto = new RoomDto(data);
      const updatedRoom = await roomService.updateRoom(id, roomDto);
      res.status(200).json({ success: true, result: updatedRoom });
    } catch (error) {
      conosle.error(error);
      res.status(500).json({ success: false });
    }
  }

  async removeRoom(req, res) {
    try {
      const id = req.params.id;
      const remove = await roomService.removeRoom(id);
      res.status(200).json({ success: true, result: remove });
    } catch (error) {
      conosle.error(error);
      res.status(500).json({ success: false });
    }
  }
}

export default new RoomController();
