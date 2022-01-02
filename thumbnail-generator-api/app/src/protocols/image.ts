import imageTypes from '../types/imageTypes';

export default interface Image {
    resize(file: Buffer, size: imageTypes.Resolution): Buffer | Error;
}