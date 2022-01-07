import { Router } from "express";
import resizeImageController from "./resizeToThreeDimensionsController";
import requireAuthentication from './requireAuthentication';

const thumbnailGeneratorRouter = Router()
const resizeImageRouter = Router()

resizeImageRouter.use(requireAuthentication);
resizeImageRouter.post('/resize-to-three-dimensions', resizeImageController.handle.bind(resizeImageController))

thumbnailGeneratorRouter.use('/thumbnail', resizeImageRouter)
thumbnailGeneratorRouter.get('/', async (req, res, next) => {
  return res.status(200).send('Thumbnail app is running...')
})

export default thumbnailGeneratorRouter;