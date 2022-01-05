import { UploadedFile } from "express-fileupload";
import {
        HttpRequest,
        HttpResponse 
       }                from "../types";
import Image            from './imageBuffer';
import Storage          from './awsS3';

const storage = new Storage();
const image = new Image();

const imageSizes = [
    { width: 400, height: 300 },
    { width: 160, height: 120 },
    { width: 120, height: 120 },
]
const acceptedFileTypes = [
    'jpeg',
    'png',
]


class ResizeToThreeDimensionsController {
    getFileExtension(mimetype: string): string | Error {
        if(typeof mimetype !== 'string') {
            return new Error('Invalid mimetype input. It should be a string.')
        }
        let fileExtension: RegExpMatchArray | string = mimetype.match(/\/([a-z]{3,})$/);
        return (fileExtension ? fileExtension[1] : new Error("Invalid mimetype format. It should be as 'filetype/extension'."));
    }

    isAcceptedFileExtension(fileExtension: string) {
        if(typeof fileExtension !== 'string') {
            return new Error('Invalid file extension input. It should be a string.')
        }
        return acceptedFileTypes.includes(fileExtension.toLocaleLowerCase());
    }

    formatImageFileName(fileName, extension, dimension) {
        return `${fileName}-${dimension.width}-${dimension.height}.${extension}`;
    }
    
    async resizeImageToMultipleSizes(imageDimensions, sourceFile) {
        let resizedImages = [];
        for(const imageDimension of imageDimensions) {
            const imageBuffer =  await image.resize(sourceFile.data, imageDimension) as Buffer;
    
            const fileNameWithoutExtension = sourceFile?.name?.match(/(.+?)(\.[^.]*$|$)/)?.[1];
            const fileName = this.formatImageFileName(
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

    async storeMultipleFiles(files) {
        const imageLinks = [];
    
        for(const file of files) {
            const link = await storage.upload(file);
            imageLinks.push(link);
        }
        return imageLinks;
    }

    async handle(request: HttpRequest, response: HttpResponse) {
        try {
            if(!request || !response) {
                throw new Error("Undefined request or response object");
            }
            if (!request.files) {
                response.status(400).send({
                    message: 'No files found'
                });
                return new Error('No files found');
            } else {
                const files                        = request.files;
                const sourceFile                   = files.image_to_be_resized as UploadedFile;
                const fileExtension                = this.getFileExtension(sourceFile.mimetype);
                const isInvalidFileExtensionFormat = fileExtension instanceof Error;
                const isNotAcceptedFileExtension   = !this.isAcceptedFileExtension(fileExtension as string)

                if (isInvalidFileExtensionFormat || isNotAcceptedFileExtension) {
                    response.statusMessage = "File type is invalid";
                    response.status(400).send();
                    return new Error('File type invalid')
                }
                const file          = { ...sourceFile, extension: fileExtension }
                const resizedImages = await this.resizeImageToMultipleSizes(imageSizes, file);
                const imageLinks    = await this.storeMultipleFiles(resizedImages);
    
                return response.send(imageLinks);
                
            }
        } catch (err) {
            return new Error(err);
        }
    }
}

export default new ResizeToThreeDimensionsController();