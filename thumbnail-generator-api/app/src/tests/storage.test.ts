import S3 from '../adapters/awsS3';

const s3InstanceMock = {
    upload: jest.fn(() => ({
        promise: jest.fn(() => ({
            Location: 'url'
        }))
    })),
}

jest.mock('aws-sdk', () => {
    return {
        config: { update: jest.fn() },
        S3: jest.fn(() => s3InstanceMock) 
    };
});

jest.mock('../adapters/processEnv', () => {
    return {
        bucket: null,
        credentials: null,
        region: null,
        acl: null,
    };
});

//sut factory
function makeSystemUnderTest() {
    return new S3();
}

describe('Test Storage', () => {
    test('Should return a string', async () => {
        const systemUnderTest = makeSystemUnderTest();
        const buffer = Buffer.from('test')
        const file = {
            name: 'test.png',
            extension: 'png',
            contentType: 'image/png',
            buffer,
        }

        const link = await systemUnderTest.upload(file);

        expect(typeof link).toBe('string');
    })

    test('Should return an Error if the file buffer is empty.', async () => {
        const systemUnderTest = makeSystemUnderTest();
        const buffer = Buffer.alloc(0)
        const file = {
            name: 'test.png',
            extension: 'png',
            contentType: 'image/png',
            buffer,
        }
        const link = await systemUnderTest.upload(file);
        expect(link).toEqual(new Error('The file buffer is empty'));
    })
    
    test("Should return an Error if the file buffer is not a Buffer instance of.", async () => {
        const systemUnderTest = makeSystemUnderTest();
        const file = {
            name: 'test.png',
            extension: 'png',
            contentType: 'image/png',
            buffer: null,
        }
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const link = await systemUnderTest.upload(file);

        expect(link).toEqual(new Error('Invalid file format. The file is not a Buffer.'));
    })
});