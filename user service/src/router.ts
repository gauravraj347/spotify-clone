import expess from 'express';
import { registerUser } from './controller.js';

const router = expess.Router();

router.post('/user/register', registerUser);

export default router;