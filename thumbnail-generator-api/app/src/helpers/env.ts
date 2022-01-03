require('dotenv').config();

class Env {
    protected readonly _bucket;

    constructor() {
        this._bucket = process.env.BUCKET;
    }

    get bucket() {
        return this._bucket;
    }

    get credentials() {
        return {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    }

    get region() {
        return process.env.REGION;
    }

    get acl() {
        return process.env.ACL;
    }
}

export default new Env();