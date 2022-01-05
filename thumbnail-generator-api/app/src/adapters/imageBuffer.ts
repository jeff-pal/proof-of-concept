import Image     from '../protocols/image';
import types     from '../types';
import resizeImg from 'resize-image-buffer';

export default class ImageBuffer implements Image {
    async resize(file: Buffer, size: types.Resolution): Promise<Buffer | Error> {
        if(!(file instanceof Buffer)) {
            return new Error('Invalid file format. The file is not a Buffer.');
        }
        if(!(file.length > 0)) {
            return new Error('The file buffer is empty');
        }
        if(!size?.width || !size?.height) {
            return new Error('Invalid image resolution.');
        }
        const resizedImage = await resizeImg(file, size);
        return resizedImage;
    }
}