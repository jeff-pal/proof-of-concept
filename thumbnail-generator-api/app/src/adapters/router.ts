import { Router }            from "express";
import swaggerUi             from 'swagger-ui-express'
import resizeImageController from "./resizeToThreeDimensionsController";
import requireAuthentication from './requireAuthentication';
import options               from './swaggerUiOptions';

const swaggerDocument   = require('./swagger.json');
const rootRouter        = Router();
const resizeImageRouter = Router();
const docsRouter        = Router();

// /thumbnail
resizeImageRouter.use(requireAuthentication);
resizeImageRouter.post('/resize-to-three-dimensions', resizeImageController.handle.bind(resizeImageController))

// /docs
docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))


rootRouter.get('/', async (req, res, next) => {
  return res.status(200).send('Thumbnail app is running...')
})
rootRouter.use('/thumbnail', resizeImageRouter);
rootRouter.use('/docs', docsRouter);



export default rootRouter;