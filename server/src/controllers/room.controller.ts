import roomService from '../services/room.service';
import ErrorUtils from '../errors/api.error';
import { Request, Response } from 'express';

class RoomController {
  async createRoom(req: Request, res: Response) {
    try {
      const roomData = req.body;
      const newRoom = await roomService.createRoom(roomData);

      res.status(201).json({ result: newRoom });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async getRooms(req: Request, res: Response) {
    try {
      const rooms = await roomService.getRooms();

      res.status(200).json({ result: rooms });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async getOneRoom(req: Request, res: Response) {
    try {
      const num: number = Number(req.params.num);
      const room = await roomService.getOneRoomByNum(num);

      res.status(200).json({ result: room });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async updateRoom(req: Request, res: Response) {
    try {
      const num: number = Number(req.params.num);
      const roomData = req.body;
      const updatedRoom = await roomService.updateRoomByNum(num, roomData);

      res.status(200).json({ result: updatedRoom });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  async removeRoom(req: Request, res: Response) {
    try {
      const num: number = Number(req.params.num);
      const remove = await roomService.removeRoomByNum(num);

      res.status(200).json({ result: remove });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  // async setRoomStatus(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const roomStatusData = req.body;
  //     const roomStatus = await roomService.setRoomStatus(id, roomStatusData);

  //     res.status(200).json({ result: roomStatus });
  //   } catch (error) {
  //     ErrorUtils.catchError(res, error);
  //   }
  // }
}

export default new RoomController();
