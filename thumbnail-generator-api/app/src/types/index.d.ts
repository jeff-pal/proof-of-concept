export type Resolution = { width: number, height: number };

export type File = {
    name: string,
    contentType: string,
    extension: string,
    buffer: Buffer,
};

export type AwsCredentials = {
    accessKeyId: string,
    secretAccessKey: string,
}