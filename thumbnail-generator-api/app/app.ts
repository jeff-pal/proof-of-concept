import ExpressWebService        from "./src/adapters/expressWebService";
import thumbnailGeneratorRoutes from "./src/adapters/thumbnailRoutes";

const webService = new ExpressWebService(thumbnailGeneratorRoutes);
webService.start(3000);