require('dotenv').config();

import Env from '../protocols/env';
import types from '../types';
import isAwsCredentials from '../helpers/isAwsCredentials';

class ProcessEnv implements Env {
    private readonly _bucket;
    private readonly _credentials;
    private readonly _acl;
    private readonly _region;

    constructor(env?) {
        env = env || process.env;
        this._bucket = env.BUCKET;
        this._acl = env.ACL;
        this._region = env.REGION;
        this._credentials = {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        };
    }

    get bucket() {
        if((typeof this._bucket) !== 'string') {
            throw new Error('Invalid Bucket value')
        }
        return this._bucket;
    }

    get credentials() {
        if(!isAwsCredentials(this._credentials)) {
            throw new Error('Invalid Credentials value');
        }
        return this._credentials;
    }

    get region() {
        if((typeof this._region) !== 'string') {
            throw new Error('Invalid Region value')
        }
        return this._region;
    }

    get acl() {
        if((typeof this._acl) !== 'string') {
            throw new Error('Invalid ACL value')
        }
        return this._acl;
    }
}

export default new ProcessEnv;
export { ProcessEnv };