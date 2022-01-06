import sls                      from 'serverless-http';
import ExpressWebService        from "../src/adapters/expressWebService";
import thumbnailGeneratorRoutes from "../src/adapters/thumbnailRoutes";

const webService = new ExpressWebService(thumbnailGeneratorRoutes);
const app = webService.app;
module.exports.server = sls(app);