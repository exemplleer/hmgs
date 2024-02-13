import roomService from '../services/room.service.js';
import ErrorUtils from '../errors/api.error.js';

class RoomController {
  async createRoom(req, res) {
    try {
      const roomData = req.body;
      const newRoom = await roomService.createRoom(roomData);

      res.status(201).json({ result: newRoom });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async getRooms(req, res) {
    try {
      const rooms = await roomService.getRooms();

      res.status(200).json({ result: rooms });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async getOneRoom(req, res) {
    try {
      const num = req.params.num;
      const room = await roomService.getOneRoomByNum(num);

      res.status(200).json({ result: room });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async updateRoom(req, res) {
    try {
      const num = req.params.num;
      const roomData = req.body;
      const updatedRoom = await roomService.updateRoomByNum(num, roomData);

      res.status(200).json({ result: updatedRoom });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async removeRoom(req, res) {
    try {
      const num = req.params.num;
      const remove = await roomService.removeRoomByNum(num);

      res.status(200).json({ result: remove });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async setRoomStatus(req, res) {
    try {
      const { id } = req.params;
      const roomStatusData = req.body;
      const roomStatus = await roomService.setRoomStatus(id, roomStatusData);

      res.status(200).json({ result: roomStatus });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }
}

export default new RoomController();
