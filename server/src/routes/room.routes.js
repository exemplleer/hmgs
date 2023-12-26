import { Router } from 'express';
import RoomController from '../controllers/room.controller.js';
import roomValidation from '../validations/room.validation.js';

const router = new Router();

router.post('/rooms', roomValidation, RoomController.createRoom);
router.get('/rooms', RoomController.getRooms);
router.get('/rooms/:number', RoomController.getOneRoom);
router.put('/rooms/:number', roomValidation, RoomController.updateRoom);
router.delete('/rooms/:number', RoomController.removeRoom);
router.post('/rooms/:number/status', RoomController.setRoomStatus);

export default router;
