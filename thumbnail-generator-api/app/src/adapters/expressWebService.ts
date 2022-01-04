import { 
    HttpRequest,
    HttpResponse,
} from '../types';

import WebService from '../protocols/webService';

const imageSizes = [
    {width: 400, height: 300},
    {width: 160, height: 120},
    {width: 120, height: 120},
]

const fileOptions = function(fileSizeLimitMB: number): Options {
    return {
        limits: {
            fileSize: fileSizeLimitMB * 1024 * 1024,
        },
        abortOnLimit    : true,
        responseOnLimit : `File size limit (${fileSizeLimitMB} MB) has been reached`,
        createParentPath: true,
        useTempFiles    : false, //if 'true' the file will be written to tempFileDir instead of in-memory.
        tempFileDir     : './tmp/',
        debug           : true,
    }
}

function invalidFileExtension(fileExtension: String) {
    return (
        !fileExtension || 
        (
            fileExtension !== 'jpeg' &&
            fileExtension !== 'jpg' &&
            fileExtension !== 'png'
        )
    );
}

function getFileExtension(file: UploadedFile): String {
    let fileExtension: RegExpMatchArray | String = file.mimetype.match(/\/([a-z]{3,})$/);
    return (fileExtension ? fileExtension[1] : null);
}

import Image from './imageV1';
import Storage from './awsS3';

const storage = new Storage();
const image = new Image();

async function storeMultipleFiles(files) {
    const imageLinks = [];

    for(const file of files) {
        const link = await storage.upload(file);
        imageLinks.push(link);
    }
    return imageLinks;
}

function formatImageFileName(fileName, extension, dimension) {
    return `${fileName}-${dimension.width}-${dimension.height}.${extension}`;
}

async function resizeImageToMultipleSizes(imageDimensions, sourceFile) {
    let resizedImages = [];
    for(const imageDimension of imageDimensions) {
        const imageBuffer =  await image.resize(sourceFile.data, imageDimension) as Buffer;

        const fileNameWithoutExtension = sourceFile?.name?.match(/(.+?)(\.[^.]*$|$)/)?.[1];
        const fileName = formatImageFileName(
            fileNameWithoutExtension,
            sourceFile.extension,
            imageDimension
            )

        const file = {
            name: fileName,
            extension: sourceFile.extension,
            contentType: sourceFile.mimetype,
            buffer: imageBuffer,
        }
        resizedImages.push(file);
    }
    return resizedImages;
}

require('dotenv').config();

import bodyParser       from 'body-parser';
import cors             from 'cors';
import express          from 'express';
import fileUpload,
    { UploadedFile, Options }    from 'express-fileupload';

async function handleImage(request: HttpRequest, response: HttpResponse) {
    try {
        if (!request.files) {
            return response.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const files         = request.files;
            const sourceFile    = files.image_to_be_resized as UploadedFile;
            const fileExtension = getFileExtension(sourceFile);
            
            if (invalidFileExtension(fileExtension)) {
                response.statusMessage = "File type invalid.";
                return response.status(400).send();
            }
    
            const file = { ...sourceFile, extension: fileExtension }
            
            const resizedImages = await resizeImageToMultipleSizes(imageSizes, file);
            const imageLinks = await storeMultipleFiles(resizedImages);

            return response.send(imageLinks);
            
        }
    } catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
}

class ExpressWebService implements WebService {
    private readonly _app;
    private _port;
    
    constructor() {
        this._app = express();
        this._app.use(fileUpload(fileOptions(5)));
        this._app.use(cors());
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.post('/resize-image', handleImage);
    }
    get app() {
        return this._app;
    }

    start(port: number) {
        this._port = port || 3000;
        this._app.listen(this._port, () =>
            console.log(`App is listening on port ${port}`)
        );
    }
}

export default new ExpressWebService();