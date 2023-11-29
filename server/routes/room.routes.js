import { Router } from 'express';
import RoomController from '../controller/room.controller.js';

const router = new Router();

router.post('/room', RoomController.createRoom);
router.get('/room', RoomController.getRooms);
router.get('/room/:id', RoomController.getOneRoom);
router.put('/room', RoomController.updateRoom);
router.delete('/room/:id', RoomController.removeRoom);

export default router;
