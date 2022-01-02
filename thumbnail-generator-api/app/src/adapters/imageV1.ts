import Image from '../protocols/image';
import imageTypes from '../types/imageTypes';

export default class ImageV1 implements Image {
    private resizer: Function;

    constructor(resizer: Function) {
        this.resizer = resizer;
    }

    resize(file: Buffer, size: imageTypes.Resolution): Buffer | Error {
        if(!(file instanceof Buffer)) {
            return new Error('Invalid file format. The file is not a Buffer.');
        }
        if(file.length <= 0) {
            return new Error('The file buffer is empty');
        }
        if(!size?.width || !size?.height) {
            return new Error('Invalid image resolution.');
        }

        const resizedImage = this.resizer(file, size);
        return resizedImage;
    }
}