import { Router } from "express";
import resizeImageController from "./resizeImageController";

const router = Router()

router.post('/resize-image', resizeImageController)

export default router;