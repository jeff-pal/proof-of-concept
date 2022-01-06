import Image     from '../protocols/image';
import resizeImage, 
    { 
        File,
        Options 
    } from 'aws-lambda-resize-img';

export default class ImageBuffer implements Image {
    async resize(file: File, dimension: Options): Promise<Buffer | Error> {
        const buffer = file?.buffer || file?.data;
        
        if(!(buffer instanceof Buffer)) {
            return new Error('Invalid file format. The file is not a Buffer.');
        }
        if(!(buffer.length > 0)) {
            return new Error('The file buffer is empty');
        }
        if(!dimension?.width || !dimension?.height) {
            return new Error('Invalid image dimension.');
        }
        const resizedImage = await resizeImage(file, dimension);
        return resizedImage;
    }
}