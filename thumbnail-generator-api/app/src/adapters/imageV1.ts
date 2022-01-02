import Image from '../protocols/image';

export default class ImageV1 implements Image {
    resize(file: Buffer): Buffer | Error {
        if(!(file instanceof Buffer)) {
            return new Error('Invalid file format. The file is not a Buffer.');
        }
        if(file.length <= 0) {
            return new Error('The file buffer is empty');
        }

        return file;
    }
}