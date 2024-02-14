import { Router } from 'express';
import RoomController from '../controllers/room.controller';
import roomValidation from '../validations/room.validation.js';

const router = Router();

router.post('/rooms', roomValidation, RoomController.createRoom);
router.get('/rooms', RoomController.getRooms);
router.get('/rooms/:num', RoomController.getOneRoom);
router.put('/rooms/:num', roomValidation, RoomController.updateRoom);
router.delete('/rooms/:num', RoomController.removeRoom);
// router.post('/rooms/:num/status', RoomController.setRoomStatus);

export default router;
