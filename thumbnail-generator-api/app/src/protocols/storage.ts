import { File } from 'aws-lambda-resize-img';

export default interface Storage {
    upload(file: File): Promise<string | Error>;
}