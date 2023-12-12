import { Router } from 'express';
import RoomController from '../controllers/room.controller.js';

const router = new Router();

router.post('/rooms', RoomController.createRoom);
router.get('/rooms', RoomController.getRooms);
router.get('/rooms/:id', RoomController.getOneRoom);
router.put('/rooms', RoomController.updateRoom);
router.delete('/rooms/:id', RoomController.removeRoom);

export default router;
