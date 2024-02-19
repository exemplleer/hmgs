import { Router } from 'express';
import RoomController from '../controllers/room.controller';

const router = Router();

router.post('/', RoomController.createRoom);
router.get('/', RoomController.getRooms);
router.get('/:num', RoomController.getOneRoom);
router.put('/:num', RoomController.updateRoom);
router.delete('/:num', RoomController.removeRoom);
// router.post('/rooms/:num/status', RoomController.setRoomStatus);

export default router;
