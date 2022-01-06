import AWS_SDK  from 'aws-sdk';
import Storage  from '../protocols/storage';
import env      from './processEnv';
import { File } from 'aws-lambda-resize-img';

export default class StorageS3 implements Storage{
    private readonly s3: AWS_SDK.S3;

    constructor() {
        if(!env.get('IS_LAMBDA')) {
            AWS_SDK.config.update({
                credentials: env.credentials,
                region: env.region,
            })
        }
        this.s3 = new AWS_SDK.S3();
    }

    async upload(file: File): Promise<string | Error> {
        if(!(file.buffer instanceof Buffer)) {
            return new Error('Invalid file format. The file should be a Buffer.');
        }
        if(!(file.buffer.length > 0)) {
            return new Error('The file buffer is empty');
        }
        const params = {
            Bucket: env.bucket,
            Key: file.name,
            Body: file.buffer,
            ContentType: file.contentType,
            ACL: env.acl,
        };       
        const response = await this.s3.upload(params).promise();
        return response.Location;
    }
}