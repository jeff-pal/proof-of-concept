import types from '../types';

export default interface Env {
    readonly bucket: string;
    readonly credentials: types.AwsCredentials;
    readonly region: string;
    readonly acl: string;
}