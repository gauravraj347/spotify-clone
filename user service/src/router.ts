import expess from 'express';
import { addToPlaylist, loginUser, myProfile, registerUser } from './controller.js';
import { isAuth } from './middleware.js';

const router = expess.Router();

router.post('/user/register', registerUser);
router.post("/user/login", loginUser);
router.get('/user/me', isAuth, myProfile)
router.post("/song/:id", isAuth, addToPlaylist);

export default router;