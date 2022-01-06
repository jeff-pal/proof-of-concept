import { File, Options} from 'aws-lambda-resize-img';

export default interface Image {
    resize(file: File, size: Options): Promise<Buffer | Error>;
}