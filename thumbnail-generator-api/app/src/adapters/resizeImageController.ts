import { UploadedFile } from "express-fileupload";
import {
        HttpRequest,
        HttpResponse 
       }                from "../types";
import Image            from './imageV1';
import Storage          from './awsS3';

const imageSizes = [
    { width: 400, height: 300 },
    { width: 160, height: 120 },
    { width: 120, height: 120 },
]

const storage = new Storage();
const image = new Image();

function getFileExtension(file: UploadedFile): String {
    let fileExtension: RegExpMatchArray | String = file.mimetype.match(/\/([a-z]{3,})$/);
    return (fileExtension ? fileExtension[1] : null);
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

async function storeMultipleFiles(files) {
    const imageLinks = [];

    for(const file of files) {
        const link = await storage.upload(file);
        imageLinks.push(link);
    }
    return imageLinks;
}

async function resizeImageController(request: HttpRequest, response: HttpResponse) {
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

export default resizeImageController;