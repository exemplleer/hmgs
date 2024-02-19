import RoomService from '../services/room.service';
import ErrorUtils from '../errors/api.error';
import { Request, Response } from 'express';
import { roomCreateSchema } from '../validations/room.validation';

export default class RoomController {
  static async createRoom(req: Request, res: Response) {
    try {
      const roomData = roomCreateSchema.parse(req.body);
      const newRoom = await RoomService.createRoom(roomData);
      res.status(201).json({ result: newRoom });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  static async getRooms(req: Request, res: Response) {
    try {
      const rooms = await RoomService.getRooms();
      res.status(200).json({ result: rooms });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  static async getOneRoom(req: Request, res: Response) {
    try {
      const num = Number(req.params.num);
      const room = await RoomService.getOneRoomByNum(num);
      res.status(200).json({ result: room });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  static async updateRoom(req: Request, res: Response) {
    try {
      const num = Number(req.params.num);
      const roomData = roomCreateSchema.parse(req.body);
      const updatedRoom = await RoomService.updateRoomByNum(num, roomData);
      res.status(200).json({ result: updatedRoom });
    } catch (error) {
      ErrorUtils.catchError(res, error);
    }
  }

  static async removeRoom(req: Request, res: Response) {
    try {
      const num = Number(req.params.num);
      const remove = await RoomService.removeRoomByNum(num);
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
