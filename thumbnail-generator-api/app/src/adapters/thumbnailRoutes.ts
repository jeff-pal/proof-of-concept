import { Router } from "express";
import resizeImageController from "./resizeToThreeDimensionsController";

const thumbnailGeneratorRouter = Router()
const resizeImageRouter = Router()

resizeImageRouter.post('/resize-to-three-dimensions', resizeImageController.handle.bind(resizeImageController))

thumbnailGeneratorRouter.use('/thumbnail', resizeImageRouter)

export default thumbnailGeneratorRouter;