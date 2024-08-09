import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { getUser } from '../controllers/userController';

const router = Router();

router.get('/users/:id', getUser);
router.post('/sign-up', register);
router.post('/sign-in', login);

export default router;
