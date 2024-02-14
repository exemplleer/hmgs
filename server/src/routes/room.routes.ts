import { Router } from 'express';
import RoomController from '../controllers/room.controller';

const router = Router();

router.post('/rooms', RoomController.createRoom);
router.get('/rooms', RoomController.getRooms);
router.get('/rooms/:num', RoomController.getOneRoom);
router.put('/rooms/:num', RoomController.updateRoom);
router.delete('/rooms/:num', RoomController.removeRoom);
// router.post('/rooms/:num/status', RoomController.setRoomStatus);

export default router;
