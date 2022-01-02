import Storage from './protocols/storage';

export default class StorageS3 implements Storage{
    store(file: Buffer): String | Error {
        if(!(file instanceof Buffer)) {
            return new Error('Invalid file format. The file is not a Buffer.');
        }
        if(file.length <= 0) {
            return new Error('The file buffer is empty');
        }

        return 'link';
    }
}