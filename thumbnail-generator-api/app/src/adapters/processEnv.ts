require('dotenv').config();

import Env from '../protocols/env';
import isAwsCredentials from '../helpers/isAwsCredentials';

class ProcessEnv implements Env {
    private readonly _bucket;
    private readonly _credentials;
    private readonly _acl;
    private readonly _region;
    private readonly env;

    constructor(env?) {
        this.env = env || process.env;
        this._bucket      = this.env.BUCKET;
        this._acl         = this.env.ACL;
        this._region      = this.env.REGION;
        this._credentials = {
            accessKeyId: this.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: this.env.AWS_SECRET_ACCESS_KEY,
        };
    }

    get(key) {
        return this.env[key];
    }

    set(key, value) {
        this.env[key] = value;
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