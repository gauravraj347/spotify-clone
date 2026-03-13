import express, { Router } from "express"
import { addAlbum } from "./constroller.js";
import uploadFile, { isAuth } from "./middleware.js";

const router = express.Router();

router.post("/album/new", isAuth, uploadFile, addAlbum);

export default router;