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

export interface HttpResponse {
    [x: string]: any;
    statusCode: number,
    body?: any,
}

export interface HttpRequest {
    [x: string]: any;
    body?: any,
}