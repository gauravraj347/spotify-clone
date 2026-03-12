import expess from 'express';
import { loginUser, registerUser } from './controller.js';

const router = expess.Router();

router.post('/user/register', registerUser);
router.post("/user/login", loginUser);

export default router;