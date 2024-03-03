import { Router } from 'express';
import TokenService from '../services/token.service';
import roomRoutes from './room.routes';
import authRoutes from './auth.routes';

const router = Router();

// router.use('/rooms', TokenService.checkAccess, roomRoutes);
router.use('/rooms', roomRoutes);
router.use('/auth', authRoutes);

export default router;
