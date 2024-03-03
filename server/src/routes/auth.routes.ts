import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);

export default router;
