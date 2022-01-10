import ExpressWebService from "./src/adapters/expressWebService";
import router            from "./src/adapters/router";

const webService = new ExpressWebService(router);
webService.start(3000);