import sls                      from 'serverless-http';
import ExpressWebService        from "../src/adapters/expressWebService";
import router                   from "../src/adapters/router";

const webService = new ExpressWebService(router);
const app = webService.app;
module.exports.server = sls(app);