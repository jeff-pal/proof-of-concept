import { Router } from "express";
import resizeImageController from "./thumbnailGeneratorController";

const thumbnailGeneratorRouter = Router()
const resizeImageRouter = Router()

resizeImageRouter.post('/resize-image', resizeImageController)

thumbnailGeneratorRouter.use('/thumbnail-generator', resizeImageRouter)

export default thumbnailGeneratorRouter;