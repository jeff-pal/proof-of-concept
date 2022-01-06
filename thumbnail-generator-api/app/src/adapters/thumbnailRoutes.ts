import { Router } from "express";
import resizeImageController from "./resizeToThreeDimensionsController";

const thumbnailGeneratorRouter = Router()
const resizeImageRouter = Router()

resizeImageRouter.post('/resize-to-three-dimensions', resizeImageController.handle.bind(resizeImageController))

thumbnailGeneratorRouter.use('/thumbnail', resizeImageRouter)
thumbnailGeneratorRouter.get('/', async (req, res, next) => {
      res.status(200).send('Thumbnail app is running...')
    })

export default thumbnailGeneratorRouter;