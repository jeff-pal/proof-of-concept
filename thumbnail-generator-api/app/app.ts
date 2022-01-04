import ExpressWebService        from "./src/adapters/expressWebService";
import thumbnailGeneratorRoutes from "./src/adapters/thumbnailGeneratorRoutes";

const webService = new ExpressWebService(thumbnailGeneratorRoutes);
webService.start(3000);