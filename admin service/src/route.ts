import express, { Router } from "express"
import { addAlbum, addSong, addThumbnail } from "./constroller.js";
import uploadFile, { isAuth } from "./middleware.js";

const router = express.Router();

router.post("/album/new", isAuth, uploadFile, addAlbum);
router.post("/song/new", isAuth, uploadFile, addSong);
router.post("/song/:id", isAuth, uploadFile, addThumbnail);

export default router;