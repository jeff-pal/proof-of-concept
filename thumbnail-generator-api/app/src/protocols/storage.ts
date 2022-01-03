import types from '../types';

export default interface Storage {
    upload(file: types.File): Promise<String | Error>;
}