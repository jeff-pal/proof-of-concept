import { ProcessEnv } from '../helpers/processEnv';
import isAwsCredentials from '../helpers/isAwsCredentials';

const values = {
    AWS_ACCESS_KEY_ID: 'access-key',
    AWS_SECRET_ACCESS_KEY: 'secret-key',
    REGION: 'region',
    BUCKET: 'bucket',
    ACL: 'acl',
}


jest.mock('dotenv')

describe('Test Env', () => {
    test("Should return bucket(string)", () => {
        const env = new ProcessEnv(values);
        expect(typeof env.bucket).toBe('string');
    })

    test("Should return region(string) string", () => {
        const env = new ProcessEnv(values);
        expect(typeof env.region).toBe('string');
    })

    test("Should return credentials", () => {
        const env = new ProcessEnv(values);
        const credentials = env.credentials;
        expect(isAwsCredentials(credentials)).toBe(true);
    })

    test("Should return acl(string)", () => {
        const env = new ProcessEnv(values);
        expect(typeof env.acl).toBe('string');
    })
    
    test("Should return 'Error Invalid Bucket value'", () => {
        const vars = {...values, BUCKET: null}
        const env = new ProcessEnv(vars);

        expect(() => {
            env.bucket;
        }).toThrowError(new Error('Invalid Bucket value'));
    })

    test("Should return 'Error Invalid Credentials value'", () => {
        const vars = {
            ...values, 
            AWS_ACCESS_KEY_ID: null,
            AWS_SECRET_KEY_KEY: null,
        }
        const env = new ProcessEnv(vars);

        expect(() => {
            env.credentials;
        }).toThrowError(new Error('Invalid Credentials value'));
    })

    test("Should return 'Error Invalid Region value'", () => {
        const vars = {...values, REGION: null}
        const env = new ProcessEnv(vars);

        expect(() => {
            env.region;
        }).toThrowError(new Error('Invalid Region value'));
    })

    test("Should return 'Error Invalid ACL value'", () => {
        const vars = {...values, ACL: null}
        const env = new ProcessEnv(vars);

        expect(() => {
            env.acl;
        }).toThrowError(new Error('Invalid ACL value'));
    })
})