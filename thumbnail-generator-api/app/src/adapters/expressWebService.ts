import bodyParser  from 'body-parser';
import cors        from 'cors';
import express,
       { Router }  from 'express';
import fileUpload, 
       { Options } from 'express-fileupload';
import WebService  from '../protocols/webService';

function megaBytesToBytes(value) {
    return value * 1024 * 1024;
}

const fileSizeLimitMB = 5;
const fileSizeLimit = megaBytesToBytes(fileSizeLimitMB);

const options: Options = {
    limits: {
        fileSize: fileSizeLimit,
    },
    abortOnLimit    : true,
    responseOnLimit : `File size limit (${fileSizeLimitMB} MB) has been reached`,
    createParentPath: true,
    useTempFiles    : false, //if 'true' the file will be written to tempFileDir instead of in-memory.
    tempFileDir     : './tmp/',
    debug           : false,
}

class ExpressWebService implements WebService {
    private readonly _app;
    private _port;
    
    constructor(router: Router) {
        this._app = express();
        this._app.use(fileUpload(options));
        this._app.use(cors());
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use('/', router);
    }
    get app() {
        return this._app;
    }

    start(port: number) {
        this._port = port || 3000;

        return this._app.listen(this._port, () => {
            console.log(`App is listening on port ${this._port}`)
            this._app.emit('started', {status: 'started'})
        });
    }
}

export default ExpressWebService;