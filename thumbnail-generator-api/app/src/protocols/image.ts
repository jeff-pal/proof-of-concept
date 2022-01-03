import types from '../types';

export default interface Image {
    resize(file: Buffer, size: types.Resolution): Promise<Buffer | Error>;
}